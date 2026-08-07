import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <Reveal className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-4xl leading-[1.08] font-semibold text-balance text-foreground sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
      <div className={`hairline mt-8 ${isCenter ? "mx-auto max-w-40" : "max-w-40"}`} />
    </Reveal>
  );
}
