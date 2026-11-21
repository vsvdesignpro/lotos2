"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

type HeaderCopy = {
  residence: string;
  stays: string;
  territory: string;
  menu: string;
  close: string;
  top: string;
  primaryLabel: string;
  mobileLabel: string;
};

const links = [
  ["#residence", "residence"],
  ["#stays", "stays"],
  ["#territory", "territory"],
] as const;

export function SiteHeader({ copy }: { copy: HeaderCopy }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={copy.top}>
        <BrandLogo priority />
      </a>
      <nav className="desktop-nav" aria-label={copy.primaryLabel}>
        {links.map(([href, key]) => <a key={href} href={href}>{copy[key]}</a>)}
      </nav>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? copy.close : copy.menu}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden size={22} /> : <List aria-hidden size={22} />}
      </button>
      <nav id="mobile-navigation" className="mobile-nav" data-open={open} aria-label={copy.mobileLabel}>
        {links.map(([href, key]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{copy[key]}</a>
        ))}
      </nav>
    </header>
  );
}
