import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Globe, Check, Home, Image, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { languageLabels, languages, type Language } from "@/i18n/translations";
import { site } from "@/config/site";
import logoDark from "@/assets/logo-dark.png";
import { btnGold } from "@/lib/ui";
import { NavBar as TubelightNavBar } from "@/components/ui/tubelight-navbar";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  const tubelightItems = [
    { name: t.nav.home, url: "/", icon: Home },
    { name: t.nav.gallery, url: "/gallery", icon: Image },
    { name: t.nav.contact, url: "/contact", icon: Phone },
  ];

  const pick = (l: Language) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-white transition-all duration-500 ${
        scrolled ? "py-3 shadow-sm" : "py-5"
      }`}
    >
      <div className="container-lux relative flex items-center justify-between gap-6">
        <TubelightNavBar
          items={tubelightItems}
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        />
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex items-center rounded-xl bg-white px-2 py-1 transition-transform group-hover:scale-[1.03]">
            <img
              src={logoDark}
              alt={`${site.name} Logo`}
              className="h-12 w-auto sm:h-14"
              width={1920}
              height={973}
            />
          </span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-label={t.nav.language}
              className="flex items-center gap-2 rounded-full border border-gray-400/40 px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase text-gray-700 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Globe className="h-4 w-4" />
              {lang}
            </button>
            <AnimatePresence>
              {langOpen ? (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-3 w-44 overflow-hidden rounded-md border border-gray-200 bg-white py-2 shadow-lg"
                >
                  {languages.map((l) => (
                    <li key={l}>
                      <button
                        type="button"
                        onClick={() => pick(l)}
                        className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary"
                      >
                        {languageLabels[l]}
                        {l === lang ? <Check className="h-4 w-4 text-primary" /> : null}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </div>
          <LiquidMetalButton label={t.nav.cta} tone="red" onClick={() => navigate({ to: "/contact" })} />
        </div>

        <button
          type="button"
          className="text-gray-800 lg:hidden"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="container-lux mt-4 rounded-lg border border-gray-200 bg-white py-8 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl font-semibold text-gray-900 transition-colors data-[status=active]:text-primary"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-wrap gap-3">
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${
                    l === lang
                      ? "border-primary text-primary"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link to="/contact" onClick={() => setOpen(false)} className={`${btnGold} mt-8 w-full`}>
              {t.nav.cta}
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
