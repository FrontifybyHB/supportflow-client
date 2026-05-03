import { useEffect, useState, type PropsWithChildren } from "react";
import { Toaster as HotToaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { refreshToken } from "@/api/auth";
import { clearSession, setSession } from "@/features/auth/store/authSlice";
import { clearAccessToken, setAccessToken } from "@/api/config";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { useAppDispatch } from "@/lib/redux/hooks";
import { store } from "@/lib/redux/store";
import { GlobalApiErrorModal } from "@/shared/components/ui/GlobalApiErrorModal";
import { initializeTheme } from "@/shared/components/ui/theme";

const publicPaths = [
  "/",
  "/customer",
  "/login",
  "/login/workspace",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/verify-reset-code",
  "/reset-password",
  "/demo",
  "/403",
];

function isPublicPath(path: string) {
  return publicPaths.some((publicPath) => path === publicPath || (publicPath !== "/" && path.startsWith(`${publicPath}/`)));
}

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <Provider store={store}>
      <QueryProvider>
        <AuthBootstrap>
          {children}
          <GlobalApiErrorModal />
          <Toaster richColors closeButton position="top-right" />
          <HotToaster position="top-right" />
        </AuthBootstrap>
      </QueryProvider>
    </Provider>
  );
}

function AuthBootstrap({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(() => isPublicPath(window.location.pathname));

  useEffect(() => {
    let isMounted = true;
    const path = window.location.pathname;
    const shouldRestoreSession = !isPublicPath(path);

    if (!shouldRestoreSession) {
      clearAccessToken();
      dispatch(clearSession());
      return () => {
        isMounted = false;
      };
    }

    refreshToken()
      .then((session) => {
        if (!isMounted) return;
        setAccessToken(session.accessToken);
        dispatch(setSession(session));
      })
      .catch(() => {
        if (!isMounted) return;
        clearAccessToken();
        dispatch(clearSession());
      })
      .finally(() => {
        if (isMounted) setIsReady(true);
      });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (!isReady) return null;

  return <>{children}</>;
}
