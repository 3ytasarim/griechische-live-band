import live1 from "@/assets/live-1.jpg";
import live2 from "@/assets/live-2.jpg";
import live3 from "@/assets/live-3.jpg";
import live4 from "@/assets/live-4.jpg";
import live5 from "@/assets/live-5.jpg";
import giannis from "@/assets/giannis-bouzouki.jpg";
import giorgosLyra from "@/assets/giorgos-lyra-live.jpg";
import giorgosKeys from "@/assets/giorgos-keyboards.jpg";
import bandKomplett from "@/assets/band-komplett.jpg";
import bandKomplett3 from "@/assets/band-komplett-3.jpg";
import bandKomplett3_2 from "@/assets/band-komplett-3-2.jpg";
import liveBouzouki from "@/assets/live-bouzouki.jpg";
import liveSaenger from "@/assets/live-saenger.jpg";
import liveSaenger3 from "@/assets/live-saenger3.jpg";
import liveKeyboards from "@/assets/live-keyboards.jpg";
import pavlos from "@/assets/pavlos-klarino.jpg";
import heroBgVideo from "@/assets/hero-bg-teaser.mp4";
import heroBgPoster from "@/assets/hero-bg-teaser-poster.jpg";
import vasilisGesang from "@/assets/vasilis-gesang.jpg";
import type { Translation } from "@/i18n/translations";

export interface Photo {
  src: string;
  width: number;
  height: number;
  captionKey: keyof Translation["gallery"]["photos"];
}

export const heroBgVideoSrc = heroBgVideo;
export const heroBgPosterSrc = heroBgPoster;
export const aboutPhoto = { src: bandKomplett3_2, width: 1360, height: 1920 };

export const photos: Photo[] = [
  { src: live1, width: 1620, height: 1080, captionKey: "p1" },
  { src: giannis, width: 1281, height: 1920, captionKey: "p2" },
  { src: live3, width: 1080, height: 1620, captionKey: "p3" },
  { src: giorgosLyra, width: 1920, height: 1280, captionKey: "p4" },
  { src: live4, width: 1620, height: 1080, captionKey: "p5" },
  { src: giorgosKeys, width: 1280, height: 1920, captionKey: "p6" },
  { src: live2, width: 1620, height: 1080, captionKey: "p7" },
  { src: live5, width: 1620, height: 1080, captionKey: "p8" },
  { src: bandKomplett, width: 1517, height: 1083, captionKey: "p9" },
  { src: liveBouzouki, width: 1280, height: 1920, captionKey: "p10" },
  { src: liveSaenger3, width: 1280, height: 1920, captionKey: "p11" },
  { src: pavlos, width: 1456, height: 1920, captionKey: "p12" },
  { src: bandKomplett3, width: 1372, height: 1920, captionKey: "p13" },
  { src: liveKeyboards, width: 1620, height: 1080, captionKey: "p14" },
  { src: liveSaenger, width: 1080, height: 1620, captionKey: "p15" },
];

export const memberPhotos: Record<"m1" | "m2" | "m3" | "m4" | "m5", string> = {
  m1: giorgosLyra,
  m2: giannis,
  m3: pavlos,
  m4: giorgosKeys,
  m5: vasilisGesang,
};
