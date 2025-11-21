import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export function getIcon(name, size = 32, className = "") {
  const IconComponent = Icons[name];

  if (!IconComponent) return null;

  return <IconComponent size={size} className={cn("", className)} />;
}
