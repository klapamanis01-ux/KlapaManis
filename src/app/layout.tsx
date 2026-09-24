import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic'

const SITE_URL = "https://www.klapamanis.com";

export async function generateMetadata(): Promise<Metadata> {
  let title = "Menu Book Kompro";
  let description = "Menu Book Kompro";
  let icon: string | null = null;
  let heroImage: string | null = null;
  try {
    const { getDb } = await import("@/db");
    const { settings } = await import("@/db/schema");
    const db = getDb();
    const rows = await db.select().from(settings);
    for (const r of rows) {
      if (r.key === "site.title" && r.value) title = r.value;
      if (r.key === "site.description" && r.value) description = r.value;
      if (r.key === "site.favicon_url" && r.value) icon = r.value;
      if (r.key === "promo_landing.hero_image" && r.value) heroImage = r.value;
    }
  } catch {}
  const favicon = icon || "https://res.cloudinary.com/yjn1kbeb/image/upload/v1789117601/jt04uahjweidihwr3sc3.png";
  const ogImage = heroImage || favicon;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    icons: favicon ? { icon: favicon, shortcut: favicon, apple: favicon } : undefined,
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: SITE_URL + "/home",
      siteName: title,
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
