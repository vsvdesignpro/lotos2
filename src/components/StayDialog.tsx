"use client";

import { PublicImage as Image } from "@/components/PublicImage";
import {
  ArrowRight,
  Bathtub,
  Bed,
  Car,
  Coffee,
  ForkKnife,
  HouseLine,
  PawPrint,
  Ruler,
  Shower,
  Sparkle,
  SwimmingPool,
  Tree,
  Users,
  Waves,
  X,
} from "@phosphor-icons/react";
import { useId, useRef, useState } from "react";
import { TextReveal } from "@/components/TextReveal";

type StayDialogProps = {
  title: string;
  description: string;
  facts: Array<{ icon: string; text: string }>;
  imageSrc: string;
  imageAlt: string;
  triggerLabel: string;
  closeLabel: string;
};

const factIcons = {
  area: Ruler,
  bath: Bathtub,
  bed: Bed,
  car: Car,
  drinks: Coffee,
  food: ForkKnife,
  guests: Users,
  house: HouseLine,
  pet: PawPrint,
  pool: SwimmingPool,
  shower: Shower,
  spa: Sparkle,
  territory: Tree,
  wellness: Waves,
} as const;

export function StayDialog(props: StayDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const isDense = props.facts.length > 7;

  function openDialog() {
    setIsOpen(true);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button className="detail-trigger" type="button" onClick={openDialog}>
        {props.triggerLabel}<ArrowRight aria-hidden size={18} />
      </button>
      <dialog ref={dialogRef} className={`stay-dialog${isDense ? " stay-dialog--dense" : ""}`} aria-labelledby={titleId} onClick={(event) => {
        if (event.target === dialogRef.current) closeDialog();
      }} onClose={() => setIsOpen(false)}>
        <div className="dialog-panel">
          <button className="dialog-close" type="button" aria-label={props.closeLabel} onClick={closeDialog}>
            <X aria-hidden size={22} />
          </button>
          <div className="dialog-image"><Image src={props.imageSrc} alt={props.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
          <div className="dialog-copy">
            <TextReveal as="h2" id={titleId} text={props.title} active={isOpen} />
            <div className="dialog-facts">
              {props.facts.map((fact) => {
                const Icon = factIcons[fact.icon as keyof typeof factIcons] ?? HouseLine;
                return <span key={fact.text}><Icon aria-hidden size={18} /><TextReveal text={fact.text} active={isOpen} /></span>;
              })}
            </div>
            <TextReveal as="p" text={props.description} active={isOpen} />
          </div>
        </div>
      </dialog>
    </>
  );
}
