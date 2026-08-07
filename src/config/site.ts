/**
 * Central static site configuration.
 * No backend — everything here is edited by hand.
 */

// TODO: replace with the real number before launch (digits only, incl. country code).
export const whatsapp = "https://wa.me/XXXXXXXXXXX";

export const site = {
  name: "Griechische Band",
  phone: "+49 000 0000000",
  phoneHref: "tel:+490000000000",
  email: "info@griechischeband.de",
  whatsapp,
  city: "Düsseldorf",
  country: "Deutschland",
  address: "Königsallee 1, 40212 Düsseldorf",
  mapsEmbed:
    "https://www.google.com/maps?q=K%C3%B6nigsallee%201,%2040212%20D%C3%BCsseldorf&output=embed",
  mapsLink: "https://www.google.com/maps?q=K%C3%B6nigsallee+1,+40212+D%C3%BCsseldorf",
} as const;

export const memberKeys = ["m1", "m2", "m3", "m4"] as const;
export const instrumentKeys = [
  "bouzouki",
  "clarinet",
  "lyra",
  "ntaouli",
  "keyboard",
  "microphone",
  "violin",
] as const;

export type MemberKey = (typeof memberKeys)[number];
export type InstrumentKey = (typeof instrumentKeys)[number];
