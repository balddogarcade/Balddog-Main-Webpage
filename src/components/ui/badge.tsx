import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "arcade" | "mono";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-none px-2.5 py-0.5 text-xs font-medium transition-colors select-none";

  const variantStyles = {
    default:
      "bg-pure-white text-pure-black font-display font-bold uppercase tracking-wider text-[11px]",
    outline:
      "border border-charcoal bg-graphite/80 text-silver-gray font-sans",
    secondary:
      "bg-graphite text-silver-gray hover:text-pure-white",
    arcade:
      "border border-arcade-magenta/50 bg-arcade-magenta/15 text-arcade-magenta font-display font-semibold tracking-wide",
    mono:
      "border border-charcoal bg-obsidian/90 text-silver-gray font-mono text-[10px] tracking-wider",
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  );
}
