/**
 * next/image loader for the static export (GitHub Pages has no image optimizer).
 * Serves files from /public as-is, prefixed with the site's base path — next/image
 * doesn't add `basePath` to string `src` values on its own.
 * The `w` query is ignored by the host; it only keeps srcset entries distinct.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
