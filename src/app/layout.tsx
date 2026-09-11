import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic'

function toFaviconUrl(url: string): string {
  // Cloudinary JPG tidak didukung browser sebagai favicon -> convert ke PNG
  if (url.includes('res.cloudinary.com') && /\.jpe?g(\?|$)/i.test(url)) {
    // inject f_png transformation: /upload/ -> /upload/f_png/
    if (url.includes('/upload/')) return url.replace('/upload/', '/upload/f_png/')
    return url
  }
  return url
}

export async function generateMetadata(): Promise<Metadata> {
  let title = "Menu Book Kompro";
  let description = "Menu Book Kompro";
  let favicon: string | null = null;
  try {
    const { getDb } = await import("@/db");
    const { settings } = await import("@/db/schema");
    const db = getDb();
    const rows = await db.select().from(settings);
    for (const r of rows) {
      if (r.key === "site.title" && r.value) title = r.value;
      if (r.key === "site.description" && r.value) description = r.value;
      if (r.key === "site.favicon_url" && r.value) favicon = r.value;
    }
  } catch {}
  const faviconUrl = favicon ? toFaviconUrl(favicon) : null
  return {
    title,
    description,
    icons: faviconUrl ? { icon: [{ url: faviconUrl, type: 'image/png' }], shortcut: faviconUrl, apple: faviconUrl } : undefined,
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
