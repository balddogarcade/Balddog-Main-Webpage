"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackNavigation } from "@/lib/analytics";

interface TrackedLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  source: string;
  label?: string;
  external?: boolean;
  children: ReactNode;
}

/**
 * Client Link wrapper that emits a `navigation_click` event on click.
 */
export function TrackedLink({
  href,
  source,
  label,
  external = false,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  const destination = typeof href === "string" ? href : href.pathname ?? "";

  return (
    <Link
      href={href}
      onClick={(e) => {
        trackNavigation(destination, source, label, external);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
