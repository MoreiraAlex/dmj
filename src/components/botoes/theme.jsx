"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunMoonIcon } from "lucide-react";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant="ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <SunMoonIcon className="size-8" />
    </Button>
  );
}
