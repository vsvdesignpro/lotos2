import Image, { type ImageProps } from "next/image";

export function PublicImage({ src, ...props }: ImageProps) {
  return <Image src={typeof src === "string" && src.startsWith("/") ? `/lotos2${src}` : src} {...props} />;
}
