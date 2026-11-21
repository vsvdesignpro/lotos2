import { PublicImage as Image } from "@/components/PublicImage";

export function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`brand-logo ${className}`.trim()}>
      <Image className="brand-logo-mark" src="/brand/lotos-mark.svg" alt="" width={32} height={32} priority={priority} />
      <Image className="brand-logo-word" src="/brand/lotos-logo.svg" alt="LOTOS" width={164} height={28} priority={priority} />
    </span>
  );
}
