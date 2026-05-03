import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { env } from "@/config/env";
import { Button } from "@/shared/components/ui/Button";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleButtonConfig = {
  type: "standard";
  theme: "outline" | "filled_blue" | "filled_black";
  size: "large" | "medium" | "small";
  text: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape: "rectangular" | "pill" | "circle" | "square";
  width?: number;
};

type GoogleAccounts = {
  id: {
    initialize: (config: {
      client_id: string;
      callback: (response: GoogleCredentialResponse) => void;
      ux_mode?: "popup";
      auto_select?: boolean;
    }) => void;
    renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void;
    cancel: () => void;
  };
};

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
  }
}

type GoogleSignInButtonProps = {
  onCredential: (idToken: string) => void;
  isLoading?: boolean;
  text?: GoogleButtonConfig["text"];
};

const GOOGLE_SCRIPT_ID = "google-identity-services";

export function GoogleSignInButton({ onCredential, isLoading, text = "signin_with" }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(356);
  const [isScriptReady, setIsScriptReady] = useState(Boolean(window.google?.accounts.id));

  useEffect(() => {
    const updateWidth = () => {
      const width = wrapperRef.current?.clientWidth ?? 356;
      setButtonWidth(Math.max(220, Math.min(356, width)));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!env.googleClientId) return;

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      if (window.google?.accounts.id) return;
      existingScript.addEventListener("load", () => setIsScriptReady(true), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsScriptReady(true);
    script.onerror = () => toast.error("Unable to load Google sign-in");
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!env.googleClientId || !isScriptReady || !buttonRef.current || !window.google?.accounts.id) return;

    buttonRef.current.innerHTML = "";
    window.google.accounts.id.initialize({
      client_id: env.googleClientId,
      callback: (response) => {
        if (!response.credential) {
          toast.error("Google did not return an identity token");
          return;
        }
        onCredential(response.credential);
      },
      ux_mode: "popup",
      auto_select: false,
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      type: "standard",
      theme: "outline",
      size: "large",
      text,
      shape: "rectangular",
      width: buttonWidth,
    });

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [buttonWidth, isScriptReady, onCredential, text]);

  if (!env.googleClientId) {
    return (
      <Button className="w-full" variant="outline" disabled>
        Configure Google client ID
      </Button>
    );
  }

  return (
    <div ref={wrapperRef} className="relative flex min-h-11 w-full justify-center overflow-hidden">
      <div ref={buttonRef} className={isLoading ? "pointer-events-none opacity-60" : ""} />
      {!isScriptReady && (
        <Button className="absolute inset-0 w-full" variant="outline" isLoading>
          Loading Google
        </Button>
      )}
    </div>
  );
}
