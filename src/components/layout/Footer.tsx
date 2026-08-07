import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { useI18n } from "@/i18n/I18nProvider";
import { languageLabels, languages } from "@/i18n/translations";
import { site } from "@/config/site";
import logoNegative from "@/assets/logo-negative.png";

function Marquee() {
  const text = "GRIECHISCHEBAND.DE";
  const items = Array.from({ length: 12 }).map((_, i) => (
    <span key={i} className="flex items-center gap-6 px-6">
      <span className="whitespace-nowrap">{text}</span>
      <span className="text-white/40" aria-hidden="true">—</span>
    </span>
  ));

  return (
    <div className="relative overflow-hidden rounded-t-[2.5rem] bg-[var(--red)] py-3.5">
      <div
        className="flex whitespace-nowrap text-sm font-bold tracking-[0.18em] text-white uppercase"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        {items}
        {items}
      </div>
    </div>
  );
}

export function Footer() {
  const { t, lang, setLang } = useI18n();

  return (
    <footer className="mt-10 overflow-hidden rounded-t-[2.5rem] bg-black text-white md:mt-14">
      <Marquee />

      <div className="container-lux grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logoNegative}
            alt={`${site.name} Logo`}
            className="h-20 w-auto"
            width={1000}
            height={500}
            loading="lazy"
          />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--red)]">{t.footer.quickLinks}</h3>
          <ul className="mt-6 space-y-3 text-sm text-white/60">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="transition-colors hover:text-white">
                {t.nav.gallery}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--red)]">{t.footer.contact}</h3>
          <ul className="mt-6 space-y-3 text-sm text-white/60">
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-[var(--red)]">{t.footer.language}</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {languages.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  className={`transition-colors hover:text-white ${
                    l === lang ? "text-[var(--red)]" : "text-white/60"
                  }`}
                >
                  {languageLabels[l]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lux flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <a
            href="https://bleibsichtbar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-medium tracking-wider text-[var(--red)] uppercase transition-colors hover:text-white"
            style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            DESIGN BY BLEIBSICHTBAR.COM
          </a>
        </div>
      </div>
    </footer>
  );
}
