import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "arcade";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-pure-white text-pure-black font-display font-bold uppercase tracking-wider hover:bg-silver-gray shadow-md",
      secondary:
        "bg-graphite text-pure-white border border-steel hover:bg-steel/30 hover:border-silver-gray/40",
      outline:
        "border border-charcoal bg-carbon text-silver-gray hover:text-pure-white hover:bg-graphite hover:border-steel",
      ghost:
        "text-silver-gray hover:text-pure-white hover:bg-graphite",
      arcade:
        "bg-arcade-magenta text-pure-white font-display font-bold tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(255,42,133,0.45)] border border-arcade-magenta/80",
    };

    const sizeStyles = {
      default: "h-11 px-5 py-2.5",
      sm: "h-9 px-3.5 text-xs",
      lg: "h-13 px-7 text-base font-semibold",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
