import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Cake, Droplet, Heart, PartyPopper, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

type CategoryKey = "wedding" | "baptism" | "birthday" | "other";

const categoryIcons: Record<CategoryKey, typeof Heart> = {
  wedding: Heart,
  baptism: Droplet,
  birthday: Cake,
  other: PartyPopper,
};

const categoryKeys: CategoryKey[] = ["wedding", "baptism", "birthday", "other"];

export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const { t } = useI18n();
  const m = t.quoteModal;
  const [selected, setSelected] = useState<CategoryKey[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const reset = setTimeout(() => {
        setSelected([]);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSent(false);
      }, 300);
      return () => clearTimeout(reset);
    }
  }, [open]);

  const toggleCategory = (key: CategoryKey) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryLabels = selected.map((key) => m.categories[key]).join(", ") || "-";
    const subject = `${m.eyebrow}: ${categoryLabels}`;
    const body = [
      `${categoryLabels}`,
      `${name} · ${email}${phone ? ` · ${phone}` : ""}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setTimeout(onClose, 2200);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f18] p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={m.close}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--red)]/15 text-[var(--red)]">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-3xl text-white">{m.successTitle}</h3>
                <p className="mt-3 max-w-xs text-sm text-white/70">{m.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <span className="eyebrow">// {m.eyebrow}</span>
                <h3 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{m.subtitle}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {categoryKeys.map((key) => {
                    const Icon = categoryIcons[key];
                    const isActive = selected.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleCategory(key)}
                        className={cn(
                          "flex flex-col items-center gap-2.5 rounded-xl border px-3 py-5 text-center transition-colors duration-300",
                          isActive
                            ? "border-[var(--red)] bg-[var(--red)]/10"
                            : "border-white/10 bg-white/5 hover:border-white/25",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300",
                            isActive
                              ? "bg-[var(--red)] text-white"
                              : "bg-[var(--red)]/15 text-[var(--red)]",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {m.categories[key]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={m.namePlaceholder}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--red)]/60 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={m.emailPlaceholder}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--red)]/60 focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={m.phonePlaceholder}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--red)]/60 focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={m.messagePlaceholder}
                    className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[var(--red)]/60 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--red)] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-red)]"
                >
                  {m.submit}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="mt-4 text-center text-xs text-white/40">{m.footnote}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
