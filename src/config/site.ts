/**
 * Central static site configuration.
 * No backend — everything here is edited by hand.
 */

export const whatsapp = "https://wa.me/4917675071215";

export const site = {
  name: "Griechische Band",
  phone: "+49 176 75071215",
  phoneHref: "tel:+4917675071215",
  email: "EmpnefsiLive@hotmail.com",
  whatsapp,
  instagram: "https://instagram.com/Empnefsi_Live_Official",
  facebook: "https://www.facebook.com/EmpnefsiLive",
  city: "Düsseldorf",
  country: "Deutschland",
  address: "Königsallee 1, 40212 Düsseldorf",
  mapsEmbed:
    "https://www.google.com/maps?q=K%C3%B6nigsallee%201,%2040212%20D%C3%BCsseldorf&output=embed",
  mapsLink: "https://www.google.com/maps?q=K%C3%B6nigsallee+1,+40212+D%C3%BCsseldorf",
} as const;

export const memberKeys = ["m1", "m2", "m3", "m4", "m5"] as const;
export const instrumentStripKeys = [
  "bouzouki",
  "clarinet",
  "lyra",
  "ntaouli",
  "keyboard",
  "microphone",
] as const;

export type MemberKey = (typeof memberKeys)[number];
export type InstrumentStripKey = (typeof instrumentStripKeys)[number];
