import bouzouki from "@/assets/icon-bouzouki.png";
import clarinet from "@/assets/icon-clarinet.png";
import drum from "@/assets/icon-drum-kit.png";
import kemenche from "@/assets/icon-kemenche.png";
import keyboard from "@/assets/icon-keyboard.png";
import microphone from "@/assets/icon-microphone.png";
import violin from "@/assets/icon-violin.png";
import { cn } from "@/lib/utils";

export type InstrumentIconName =
  | "bouzouki"
  | "clarinet"
  | "lyra"
  | "ntaouli"
  | "keyboard"
  | "microphone"
  | "violin";

export const instrumentIconUrls: Record<InstrumentIconName, string> = {
  bouzouki: bouzouki,
  clarinet: clarinet,
  lyra: kemenche,
  ntaouli: drum,
  keyboard: keyboard,
  microphone: microphone,
  violin: violin,
};

/**
 * Renders a line-art instrument icon as a CSS mask so it inherits `currentColor`
 * and can be themed with design tokens.
 */
export function InstrumentIcon({
  name,
  className,
}: {
  name: InstrumentIconName;
  className?: string;
}) {
  const url = instrumentIconUrls[name];
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
