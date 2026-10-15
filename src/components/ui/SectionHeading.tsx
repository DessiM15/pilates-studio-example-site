import { clsx } from "clsx";
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  light = false,
  align = "left",
  as: Tag = "h2",
  className,
  size = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "h1" | "h2" | "h3";
}) {
  const sizeCls = size === "h1" ? "text-h1" : size === "h3" ? "text-h3" : "text-h2";
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow light={light} className={clsx("mb-6", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className={clsx("font-serif font-light balance", sizeCls, light ? "text-ivory" : "text-charcoal")}>{title}</Tag>
      {lead && <p className={clsx("lead mt-6 pretty", light ? "text-ivory/80" : "text-stone")}>{lead}</p>}
    </div>
  );
}
