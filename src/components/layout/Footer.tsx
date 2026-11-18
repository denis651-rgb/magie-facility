import type { Locale } from "@/i18n/config";
import { publicMessages } from "@/i18n/public-messages";
import { menuLabel, servicePath } from "@/lib/menu-routes";
import Link from "next/link";
import type { CompanySetting, Service } from "@/payload-types";
import type { MenuEntry } from "@/lib/menu-routes";

type Props = {
  locale: Locale;
  company: CompanySetting;
  menu: MenuEntry[];
  services: Service[];
  quoteHref: string;
  legalLinks: { title: string; href: string }[];
};

export function Footer({
  locale,
  company,
  menu,
  services,
  quoteHref,
  legalLinks,
}: Props) {
  const t = publicMessages[locale];
  const name = company.tradeName || "MAGIE Facility Service C&D";
  const social = (company.socialLinks || []).filter((item) => {
    try {
      const url = new URL(item.url);
      return url.protocol === "https:" && !url.username && !url.password;
    } catch {
      return false;
    }
  });
  return (
    <footer className="corporate-footer">
      <div className="about-container corporate-footer__grid">
        <section className="corporate-footer__company">
          <Link href={"/" + locale} aria-label={name}>
            <img
              src="/images/magie-logo.jpg"
              alt={name}
              width={88}
              height={88}
            />
          </Link>
          <p>{company.about || name}</p>
          <address>
            {company.email && (
              <a href={"mailto:" + company.email}>{company.email}</a>
            )}
            {company.phone && (
              <a href={"tel:" + company.phone.replace(/[^+\d]/g, "")}>
                {company.phone}
              </a>
            )}
            {company.address && (
              <span>
                {[company.address, company.postalCode, company.city]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
          </address>
        </section>
        <section>
          <h2>{t.footerCompany}</h2>
          <ul>
            {menu
              .filter((item) => item[locale])
              .map((item) => (
                <li key={item.key}>
                  <Link href={item[locale]!}>{menuLabel(item, locale)}</Link>
                </li>
              ))}
            <li>
              <a href={quoteHref}>{t.quoteShort}</a>
            </li>
          </ul>
        </section>
        <section>
          <h2>{t.services}</h2>
          <ul>
            {services
              .filter((item) => item.title && item.slug)
              .map((item) => (
                <li key={item.id}>
                  <Link href={servicePath(locale, item.slug!)}>
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
        <section>
          <h2>{t.socialNetworks}</h2>
          <ul>
            {social.map((item) => (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.platform} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="about-container corporate-footer__bottom">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        {!!legalLinks.length && (
          <nav aria-label={t.legal}>
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
