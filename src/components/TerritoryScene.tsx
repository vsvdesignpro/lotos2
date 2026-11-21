"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { TextReveal } from "@/components/TextReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TerritoryCopy = {
  title: string;
  titleLines: string[];
  body: string;
  hotel: string;
  chalet: string;
  villa: string;
  mapLabel: string;
  legendLabel: string;
  hotelMapLabel: string;
  chaletMapLabel: string;
  villaMapLabel: string;
  restaurants: string;
  wellness: string;
  park: string;
  helipad: string;
  restaurantsMapLabel: string;
  wellnessMapLabel: string;
  parkMapLabel: string;
  helipadMapLabel: string;
};

const hotelBuildings = [
  [112, 134], [180, 120], [249, 142], [318, 118], [387, 148],
  [146, 218], [220, 233], [296, 210], [370, 238], [449, 208],
];
const chalets = [[552, 118], [620, 150], [574, 224], [650, 254]];
const villas = [[520, 340], [606, 365], [690, 338], [748, 390]];

export function TerritoryScene({ copy }: { copy: TerritoryCopy }) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mapFrame = scope.current?.querySelector<HTMLElement>(".map-frame");
    if (!mapFrame) return;
    const updateMapVisibility = (trigger: ScrollTrigger) => {
      gsap.set(mapFrame, { autoAlpha: trigger.scroll() >= trigger.start ? 1 : 0 });
    };
    gsap.set(mapFrame, { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: scope.current,
      start: "top top",
      end: "bottom top",
      onUpdate: updateMapVisibility,
      onRefresh: updateMapVisibility,
    });
    if (reduce) {
      gsap.set("[data-building]", { opacity: 1, scale: 1 });
      return;
    }
    ScrollTrigger.create({
      id: "territory-pin",
      trigger: scope.current,
      start: "top top",
      end: "bottom top",
      pin: ".territory-sticky",
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: "territory-map",
        trigger: scope.current,
        start: "top top",
        end: () => `+=${window.innerWidth <= 760 ? 85 : 135}%`,
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    });
    timeline
      .from(".map-route", { strokeDashoffset: 760, ease: "none" }, 0)
      .from("[data-building='hotel']", { opacity: 0, scale: 0.72, transformOrigin: "center", stagger: 0.05, ease: "power2.out" }, 0.12)
      .from("[data-building='chalet']", { opacity: 0, scale: 0.72, transformOrigin: "center", stagger: 0.08, ease: "power2.out" }, 0.48)
      .from("[data-building='villa']", { opacity: 0, scale: 0.72, transformOrigin: "center", stagger: 0.08, ease: "power2.out" }, 0.72)
      .from(".map-label", { opacity: 0, y: 12, stagger: 0.08 }, 0.42);
  }, { scope });

  return (
    <section ref={scope} id="territory" className="territory-scene" aria-labelledby="territory-title">
      <div className="territory-sticky page-grid">
        <div className="territory-copy">
          <TextReveal as="h2" id="territory-title" text={copy.title} lines={copy.titleLines} />
          <TextReveal as="p" text={copy.body} />
          <ul className="map-legend" aria-label={copy.legendLabel}>
            <li><span className="legend-swatch hotel" /><TextReveal text={copy.hotel} /></li>
            <li><span className="legend-swatch chalet" /><TextReveal text={copy.chalet} /></li>
            <li><span className="legend-swatch villa" /><TextReveal text={copy.villa} /></li>
            <li><span className="legend-swatch restaurants" /><TextReveal text={copy.restaurants} /></li>
            <li><span className="legend-swatch wellness" /><TextReveal text={copy.wellness} /></li>
            <li><span className="legend-swatch park" /><TextReveal text={copy.park} /></li>
            <li><span className="legend-swatch helipad" /><TextReveal text={copy.helipad} /></li>
          </ul>
        </div>
        <div className="map-frame">
          <svg className="territory-map" viewBox="0 0 860 560" role="img" aria-label={copy.mapLabel}>
            <path className="contour" d="M29 455C155 385 204 420 300 354C398 287 429 310 519 265C633 207 703 230 833 129" />
            <path className="contour contour-faint" d="M-9 515C142 434 256 480 369 390C497 287 604 329 872 174" />
            <path className="map-route" pathLength="760" d="M80 442C137 385 171 328 222 315C289 298 362 328 415 281C469 231 479 151 544 128C615 104 668 184 658 253C646 330 712 354 786 407" />
            <g className="building-group">
              {hotelBuildings.map(([x, y], index) => (
                <g key={`h-${index}`} data-building="hotel" transform={`translate(${x} ${y})`}>
                  <rect className="building hotel-building" x="-27" y="-9" width="54" height="18" rx="1" />
                  <path className="roof" d="M-29-9 0-18 29-9" />
                </g>
              ))}
              {chalets.map(([x, y], index) => (
                <g key={`c-${index}`} data-building="chalet" transform={`translate(${x} ${y})`}>
                  <rect className="building chalet-building" x="-17" y="-13" width="34" height="26" rx="1" />
                  <path className="roof" d="M-20-13 0-26 20-13" />
                </g>
              ))}
              {villas.map(([x, y], index) => (
                <g key={`v-${index}`} data-building="villa" transform={`translate(${x} ${y})`}>
                  <rect className="building villa-building" x="-25" y="-14" width="50" height="28" rx="1" />
                  <path className="roof" d="M-28-14 0-25 28-14" />
                </g>
              ))}
              <g className="infrastructure restaurants" transform="translate(382 330)">
                <circle r="20" /><path d="M-8-9v18M-3-9v18M-8-2h5M7-9v18M7-9c8 4 8 11 0 12" />
              </g>
              <g className="infrastructure wellness" transform="translate(494 430)">
                <circle r="22" /><path d="M-12 2c6-10 18-10 24 0M-12 9c6-10 18-10 24 0" />
              </g>
              <g className="infrastructure park" transform="translate(270 430)">
                <circle r="23" /><path d="M0-14v28M0-6l-10 9M0 0l11 8" />
              </g>
              <g className="infrastructure helipad" transform="translate(455 286)">
                <circle r="21" /><text y="1">H</text>
              </g>
            </g>
            <g className="map-label" transform="translate(109 72)"><text>{copy.hotelMapLabel.toUpperCase()}</text><path d="M0 10v37" /></g>
            <g className="map-label" transform="translate(540 65)"><text>{copy.chaletMapLabel.toUpperCase()}</text><path d="M0 10v32" /></g>
            <g className="map-label" transform="translate(682 457)"><text>{copy.villaMapLabel.toUpperCase()}</text><path d="M0-9v-35" /></g>
            <g className="map-label" transform="translate(344 375)"><text>{copy.restaurantsMapLabel.toUpperCase()}</text><path d="M38-12v-24" /></g>
            <g className="map-label" transform="translate(462 495)"><text>{copy.wellnessMapLabel.toUpperCase()}</text><path d="M31-12v-27" /></g>
            <g className="map-label" transform="translate(220 493)"><text>{copy.parkMapLabel.toUpperCase()}</text><path d="M19-12v-28" /></g>
            <g className="map-label" transform="translate(420 250)"><text>{copy.helipadMapLabel.toUpperCase()}</text><path d="M34 10v16" /></g>
          </svg>
        </div>
      </div>
    </section>
  );
}
