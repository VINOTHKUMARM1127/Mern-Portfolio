import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}

export function getImageUrl(source, { width = 800, quality = 80 } = {}) {
  if (!source) return null;
  if (typeof source === "string") return source;
  return urlFor(source).width(width).quality(quality).format("webp").url();
}
