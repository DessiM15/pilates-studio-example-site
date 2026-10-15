import { clsx } from "clsx";
import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className,
  as: Tag = "div",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  wide?: boolean;
}) {
  return (
    <Tag className={clsx("mx-auto w-full px-5 sm:px-8 lg:px-12", wide ? "max-w-[1600px]" : "max-w-7xl", className)}>
      {children}
    </Tag>
  );
}
