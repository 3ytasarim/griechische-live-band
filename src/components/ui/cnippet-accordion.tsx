"use client";

import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

export function Accordion(props: AccordionPrimitive.Root.Props): React.ReactElement {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: AccordionPrimitive.Trigger.Props & { icon?: React.ReactNode }) {
  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring sm:text-lg [&[data-panel-open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        {icon || (
          <ChevronDownIcon className="h-5 w-5 shrink-0 text-primary transition-transform duration-300" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props): React.ReactElement {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm leading-relaxed text-muted-foreground transition-[height] duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-6">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { AccordionPanel as AccordionContent, AccordionPrimitive };

export default Accordion;
