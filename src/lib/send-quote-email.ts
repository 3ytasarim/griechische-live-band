import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export interface QuoteRequestPayload {
  categories: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
}

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | undefined;

function getTransporter() {
  if (!cachedTransporter) {
    const user = process.env["SMTP_USER"];
    const pass = process.env["SMTP_PASS"];
    if (!user || !pass) {
      throw new Error("SMTP_USER/SMTP_PASS are not configured on the server");
    }
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

export const sendQuoteEmail = createServerFn({ method: "POST" })
  .validator((data: QuoteRequestPayload) => data)
  .handler(async ({ data }) => {
    const to = process.env["QUOTE_TO_EMAIL"];
    if (!to) throw new Error("QUOTE_TO_EMAIL is not configured on the server");

    const categoryLabel = data.categories.join(", ") || "-";
    const subject = `Neue Anfrage: ${categoryLabel}`;
    const text = [
      `Kategorie: ${categoryLabel}`,
      `Name: ${data.name}`,
      `E-Mail: ${data.email}`,
      data.phone ? `Telefon: ${data.phone}` : undefined,
      "",
      data.message || "(keine Nachricht)",
    ]
      .filter(Boolean)
      .join("\n");

    await getTransporter().sendMail({
      from: `"Empnefsi Live Webseite" <${process.env["SMTP_USER"]}>`,
      to,
      replyTo: data.email,
      subject,
      text,
    });

    return { ok: true as const };
  });
