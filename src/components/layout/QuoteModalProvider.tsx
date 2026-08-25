import { createContext, useContext, useState, type ReactNode } from "react";
import { QuoteModal } from "@/components/layout/QuoteModal";

interface QuoteModalContextValue {
  openQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal: () => setOpen(true) }}>
      {children}
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  return ctx;
}
