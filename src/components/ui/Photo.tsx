import Image from "next/image";
import { clsx } from "clsx";
import { pexelsPhoto, photos, type PhotoKey } from "@/lib/media";

/**
 * Wraps next/image for a Pexels photo key. Always has alt text. Use `fill`
 * inside a sized, relatively positioned parent.
 */
export function Photo({
  id,
  className,
  sizes = "100vw",
  priority = false,
  width = 1600,
  decorative = false,
}: {
  id: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  decorative?: boolean;
}) {
  const p = photos[id];
  return (
    <Image
      src={pexelsPhoto(p.id, width)}
      alt={decorative ? "" : p.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={clsx("object-cover", className)}
    />
  );
}
