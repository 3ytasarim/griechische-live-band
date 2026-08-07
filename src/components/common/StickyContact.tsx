import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { site } from "@/config/site";
import { useI18n } from "@/i18n/I18nProvider";

export function StickyContact() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-1/2 right-0 z-50 flex -translate-y-1/2 flex-col items-end gap-2"
    >
      <motion.a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center gap-2 overflow-hidden rounded-l-2xl bg-[#25D366] py-3 pr-5 pl-4 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20"
      >
        <span className="absolute inset-0 -z-10 translate-x-[-100%] bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
        <motion.span
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
        </motion.span>
        <span className="hidden sm:inline">WhatsApp</span>
      </motion.a>

      <motion.div
        whileHover={{ x: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-l-2xl bg-primary shadow-lg shadow-primary/20"
      >
        <span className="absolute inset-0 -z-10 translate-x-[-100%] bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
        <Link
          to="/contact"
          className="flex items-center gap-2 py-3 pr-5 pl-4 text-sm font-semibold text-primary-foreground"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          >
            <CalendarCheck className="h-5 w-5 shrink-0" />
          </motion.span>
          <span className="hidden sm:inline">{t.hero.cta}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
