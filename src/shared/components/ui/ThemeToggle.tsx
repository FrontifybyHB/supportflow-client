import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem("supportflow-theme");
  return storedTheme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("supportflow-theme", theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      aria-label={`Switch to ${nextTheme} theme`}
      className="h-9 w-9 p-0"
      onClick={() => setTheme(nextTheme)}
      title={`Switch to ${nextTheme} theme`}
      variant="ghost"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
