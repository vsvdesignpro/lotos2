import { PublicImage as Image } from "@/components/PublicImage";

import { ArrowDown, ArrowRight, HouseLine, PawPrint, Ruler } from "@phosphor-icons/react/dist/ssr";
import copy from "@/content/copy.ru.json";
import { BrandLogo } from "@/components/BrandLogo";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { StackedPanels } from "@/components/StackedPanels";
import { StayDialog } from "@/components/StayDialog";
import { TerritoryScene } from "@/components/TerritoryScene";
import { TextReveal } from "@/components/TextReveal";

export default function Home() {
  const surroundingsColumns = Array.from({ length: 6 }, (_, columnIndex) =>
    copy.surroundings.places.slice(columnIndex * 6, columnIndex * 6 + 6),
  );

  return (
    <main id="top">
      <SiteHeader copy={copy.navigation} />
      <StackedPanels />

      <aside className="educational-banner page-grid" aria-label={copy.educational.label}>
        <p>{copy.educational.short}</p>
      </aside>

      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/hero.jfif" alt={copy.media.heroAlt} fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content page-grid">
          <div className="hero-title-block">
            <TextReveal as="h1" id="hero-title" text={copy.hero.title} lines={copy.hero.lines} eager />
            <TextReveal as="p" text={copy.hero.description} eager />
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href="#stays">{copy.hero.primary}<ArrowRight aria-hidden size={18} /></a>
            <a className="text-link" href="#residence">{copy.hero.secondary}</a>
          </div>
          <a className="scroll-cue" href="#facts"><ArrowDown aria-hidden size={18} />{copy.hero.scroll}</a>
        </div>
      </section>

      <section id="facts" className="facts page-grid" aria-label={copy.factsLabel}>
        {copy.facts.map((fact) => (
          <Reveal key={fact.label} className="fact">
            <TextReveal as="strong" text={fact.value} /><TextReveal as="span" text={fact.label} />
          </Reveal>
        ))}
      </section>

      <section id="residence" className="about page-grid section-space" aria-labelledby="about-title">
        <Reveal className="about-heading"><TextReveal as="h2" id="about-title" text={copy.about.title} /></Reveal>
        <Reveal className="about-copy" delay={90}><TextReveal as="p" text={copy.about.body} /></Reveal>
        <Reveal className="about-transfer" delay={120}><TextReveal as="p" text={copy.about.transfer} /></Reveal>
        <Reveal className="about-image" delay={140}>
          <Image src="/images/residence-concept.png" alt={copy.media.residenceAlt} fill sizes="(max-width: 760px) 100vw, 62vw" />
        </Reveal>
      </section>

      <section id="stays" className="stays overlap-panel section-space" aria-labelledby="stays-title">
        <div className="section-head page-grid">
          <Reveal><TextReveal as="h2" id="stays-title" text={copy.stays.title} /></Reveal>
          <Reveal delay={90}><TextReveal as="p" text={copy.stays.intro} /></Reveal>
        </div>
        <div className="room-composition page-grid">
          <Reveal className="room-image">
            <div className="room-image-media">
              <Image src="/images/room-concept.png" alt={copy.media.roomAlt} fill sizes="(max-width: 760px) 100vw, 58vw" />
            </div>
          </Reveal>
          <div className="room-list">
            {copy.stays.rooms.map((room, index) => (
              <Reveal key={room.name} className="room-row" delay={index * 70}>
                <div className="room-name"><TextReveal as="h3" text={room.name} /></div>
                <div className="room-meta"><span><Ruler aria-hidden size={17} />{room.area}</span></div>
                <TextReveal as="p" text={room.summary} />
                <div className="card-actions">
                  <StayDialog
                    title={room.name}
                    description={room.summary}
                    facts={room.facts}
                    imageSrc={room.image}
                    imageAlt={room.imageAlt}
                    triggerLabel={copy.stays.details}
                    closeLabel={copy.stays.close}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="houses overlap-panel section-space page-grid" aria-labelledby="houses-title">
        <div className="houses-intro">
          <Reveal><TextReveal as="h2" id="houses-title" text={copy.houses.title} lines={copy.houses.titleLines} /></Reveal>
          <Reveal delay={90}><TextReveal as="p" text={copy.houses.intro} /></Reveal>
        </div>
        <div className="house-feature-image">
          <Image src="/images/work-concept.png" alt={copy.media.workAlt} fill sizes="(max-width: 760px) 100vw, 58vw" />
        </div>
        <div className="house-grid">
          {copy.houses.items.map((item, index) => (
            <article className="house-card" key={item.name}>
              <div className="house-card-image">
                <Image src={item.exterior} alt={item.exteriorAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 25vw" />
              </div>
              <TextReveal as="h3" text={item.name} />
              <div className="house-tags"><span><HouseLine aria-hidden size={16} /><TextReveal text={copy.houses.privacy} /></span><span><PawPrint aria-hidden size={16} /><TextReveal text={copy.houses.pet} /></span></div>
              <div className="card-actions">
                <StayDialog
                  title={item.name}
                  description={item.type === copy.houses.chalet ? copy.houses.chaletDescription : copy.houses.villaDescription}
                  facts={item.type === copy.houses.chalet ? copy.houses.chaletFacts : copy.houses.villaFacts}
                  imageSrc={item.interior}
                  imageAlt={item.interiorAlt}
                  triggerLabel={copy.stays.details}
                  closeLabel={copy.stays.close}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="weekdays section-space page-grid" aria-labelledby="weekdays-title">
        <Reveal className="weekdays-title"><TextReveal as="h2" id="weekdays-title" text={copy.weekdays.title} /></Reveal>
        <Reveal className="weekdays-image" delay={70}>
          <Image src="/images/editorial/weekdays-work.webp" alt={copy.media.weekdaysAlt} fill sizes="(max-width: 720px) 100vw, 48vw" />
        </Reveal>
        <Reveal className="weekdays-copy" delay={80}><TextReveal as="p" text={copy.weekdays.body} /></Reveal>
        <ul className="weekdays-points">
          {copy.weekdays.points.map((point) => <TextReveal as="li" key={point} text={point} />)}
        </ul>
      </section>

      <TerritoryScene copy={copy.territory} />

      <section className="gold-card overlap-panel section-space page-grid" aria-labelledby="gold-title">
        <Reveal className="gold-visual"><Image src="/images/loyalty-cards-approved.png" alt={copy.media.loyaltyAlt} fill sizes="(max-width: 720px) 100vw, 48vw" /></Reveal>
        <Reveal className="gold-copy">
          <TextReveal as="h2" id="gold-title" text={copy.gold.title} />
          <TextReveal as="p" text={copy.gold.body} />
          <TextReveal as="p" className="gold-note" text={copy.gold.note} />
          <details id="loyalty-terms" className="loyalty-terms">
            <summary>{copy.gold.termsTitle}</summary>
            <ul>{copy.gold.terms.map((term) => <li key={term}>{term}</li>)}</ul>
          </details>
        </Reveal>
      </section>

      <section className="surroundings section-space page-grid" aria-labelledby="surroundings-title">
        <Reveal className="surroundings-heading">
          <TextReveal as="h2" id="surroundings-title" text={copy.surroundings.title} lines={copy.surroundings.titleLines} />
        </Reveal>
        <Reveal className="surroundings-copy" delay={80}>
          <TextReveal as="p" text={copy.surroundings.body} />
          <TextReveal as="span" text={copy.surroundings.location} />
        </Reveal>
        <div className="surroundings-places">
          {surroundingsColumns.map((places, columnIndex) => (
            <ul key={columnIndex}>
              {places.map((place) => <TextReveal as="li" key={place} text={place} />)}
            </ul>
          ))}
        </div>
        <Reveal className="surroundings-image" delay={100}><Image src="/images/surroundings-river-concept.webp" alt={copy.media.surroundingsAlt} fill sizes="(max-width: 720px) 400vw, 60vw" /></Reveal>
      </section>

      <footer className="footer">
        <div className="footer-image">
          <Image src="/images/footer-mountains-concept.webp" alt={copy.media.footerAlt} fill sizes="(max-width: 760px) 600vw, 100vw" />
          <div className="footer-shade" />
          <div className="footer-title page-grid">
            <TextReveal as="h2" text={copy.footer.title} lines={copy.footer.titleLines} />
            <TextReveal as="p" className="footer-farewell" text={copy.footer.farewell} />
          </div>
        </div>
        <div className="footer-bottom page-grid">
          <BrandLogo className="footer-logo" />
          <div className="footer-column footer-primary">
            <TextReveal as="p" text={copy.footer.description} />
            <p className="educational-disclaimer">{copy.educational.disclaimer}</p>
          </div>
          <div className="footer-column footer-legal">
            <span>{copy.footer.rights}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
