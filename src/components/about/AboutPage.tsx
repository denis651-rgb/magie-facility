import type { Locale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";
import { contactSegments } from "@/lib/menu-routes";
import AboutMotion from "./AboutMotion";
import ValueIcon from "./ValueIcon";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, Page } from "@/payload-types";
import { publicMenu } from "@/lib/public-pages";
import { publicServices } from "@/lib/public-services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import "./about.css";

type Props = { page: Page; locale: Locale };

export default async function AboutPage({ page, locale }: Props) {
  const t = publicMessages[locale];
  const payload = await getPayload({ config });
  const [company, settings, menu, services, legal] = await Promise.all([
    payload.findGlobal({
      slug: "company-settings",
      locale,
      fallbackLocale: false,
      overrideAccess: true,
      depth: 0,
    }),
    payload.findGlobal({
      slug: "site-settings",
      locale,
      fallbackLocale: false,
      overrideAccess: true,
      depth: 0,
    }),
    publicMenu(),
    publicServices(locale),
    payload.find({
      collection: "pages",
      locale,
      fallbackLocale: false,
      overrideAccess: true,
      draft: false,
      depth: 0,
      limit: 20,
      where: {
        and: [
          { _status: { equals: "published" } },
          {
            or: [
              {
                slug: {
                  in: [
                    "privacidad",
                    "aviso-legal",
                    "politica-de-privacidad",
                    "datenschutz",
                    "impressum",
                    "confidentialite",
                    "mentions-legales",
                    "politique-de-confidentialite",
                    "privacy",
                    "informativa-sulla-privacy",
                    "note-legali",
                  ],
                },
              },
            ],
          },
        ],
      },
    }),
  ]);
  const about = page.about;
  const name = company.tradeName || "MAGIE Facility Service C&D";
  const phone = (
    company.whatsapp ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    ""
  ).replace(/\D/g, "");
  const validPhone = /^[1-9]\d{6,14}$/.test(phone);
  const message = settings.whatsappDefaultMessage || t.quoteMessage;
  const contact = "/" + locale + "/" + contactSegments[locale];
  const quoteHref = validPhone ? buildWhatsAppUrl(phone, message) : contact;
  const button = about?.buttonLabel || t.quoteShort;
  const imageSrc = (image: Media | number) =>
    "/media/paginas/" +
    page.id +
    "?media=" +
    (typeof image === "object" ? image.id : image);
  const first = about?.firstImage || page.heroImage;
  const second = about?.secondImage;
  const photo = (image: Media | number, secondary = false) => (
    <Image
      src={imageSrc(image)}
      alt={typeof image === "object" ? image.alt : ""}
      width={640}
      height={800}
      sizes="(max-width: 767px) 48vw, 25vw"
      className={secondary ? "about-photo about-photo--second" : "about-photo"}
      unoptimized
      data-reveal={secondary ? "up" : "down"}
    />
  );
  return (
    <AboutMotion key={page.id + "-" + locale}>
      <main className="about-page" lang={locale}>
        <section className="about-banner" aria-labelledby="about-title">
          {page.heroImage && (
            <Image
              src={imageSrc(page.heroImage)}
              alt=""
              fill
              priority
              sizes="100vw"
              className="about-banner__image"
              unoptimized
            />
          )}
          <div className="about-banner__shade" />
          <div className="about-container about-banner__content">
            <p>{name}</p>
            <h1 id="about-title" data-reveal="up">
              {about?.bannerTitle || t.about}
            </h1>
            {about?.bannerSubtitle && (
              <div className="about-banner__subtitle" data-reveal="up">
                {about.bannerSubtitle}
              </div>
            )}
          </div>
        </section>

        <section
          className="about-container about-intro"
          aria-labelledby="about-intro-title"
        >
          <div className="about-intro__copy" data-reveal="left">
            <p className="about-eyebrow">{t.about}</p>
            <h2 id="about-intro-title">{about?.introTitle || t.who}</h2>
            {about?.introText ? (
              <p className="about-prose">{about.introText}</p>
            ) : page.content ? (
              <div className="about-prose">
                <RichText
                  data={page.content}
                  converters={({ defaultConverters }) => ({
                    ...defaultConverters,
                    heading: ({ node, nodesToJSX }) => (
                      <h3>{nodesToJSX({ nodes: node.children })}</h3>
                    ),
                  })}
                />
              </div>
            ) : (
              company.about && <p className="about-prose">{company.about}</p>
            )}
            <a
              className="about-button"
              href={quoteHref}
              target={validPhone ? "_blank" : undefined}
              rel={validPhone ? "noopener noreferrer" : undefined}
            >
              {button}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          {(first || second) && (
            <div
              className={
                "about-photos" + (!second ? " about-photos--single" : "")
              }
            >
              {first && photo(first)}
              {second && photo(second, true)}
            </div>
          )}
        </section>

        {!!about?.values?.length && (
          <section
            className="about-values"
            aria-labelledby="about-values-title"
          >
            <div className="about-container">
              <p className="about-eyebrow">{name}</p>
              <h2 id="about-values-title" data-reveal="up">
                {about.valuesTitle || t.values}
              </h2>
              <ul>
                {about.values.map((value) => (
                  <li key={value.id || value.label} data-reveal="right">
                    <span className="about-value-mark" aria-hidden="true">
                      <ValueIcon label={value.label} />
                    </span>
                    <h3>{value.label}</h3>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section
          className="about-purpose"
          aria-labelledby="about-purpose-title"
        >
          <div className="about-container">
            <p className="about-eyebrow">{name}</p>
            <h2 id="about-purpose-title" data-reveal="up">
              {about?.purposeTitle || t.purpose}
            </h2>
            {!about?.approved && (
              <p className="about-review-note">{t.provisional}</p>
            )}
            <div className="about-purpose__grid">
              <section data-reveal="up">
                <span className="about-purpose__mark" aria-hidden="true">
                  <ValueIcon label="mission" />
                </span>
                <h3>{about?.missionTitle || t.mission}</h3>
                {about?.mission && <p>{about.mission}</p>}
              </section>
              <section data-reveal="up">
                <span className="about-purpose__mark" aria-hidden="true">
                  <ValueIcon label="vision" />
                </span>
                <h3>{about?.visionTitle || t.vision}</h3>
                {about?.vision && <p>{about.vision}</p>}
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer
        locale={locale}
        company={company}
        menu={menu}
        services={services}
        quoteHref={quoteHref}
        legalLinks={legal.docs
          .filter((item) => item.title && item.slug)
          .map((item) => ({
            title: item.title!,
            href: "/" + locale + "/paginas/" + encodeURIComponent(item.slug!),
          }))}
      />
      {validPhone && (
        <WhatsAppButton
          phone={phone}
          message={message}
          label={settings.whatsappGreeting || t.widgetHello}
          welcomeText={settings.whatsappWelcome || t.widgetWelcome}
          locale={locale}
          className="about-floating-whatsapp"
        />
      )}
    </AboutMotion>
  );
}
