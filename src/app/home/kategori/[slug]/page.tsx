import { getLandingSettings } from '@/lib/promoRepo'
import { getDb } from '@/db'
import { menu, menuPhoto } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import KategoriClient from '@/components/KategoriClient'
import PageTransition from '@/components/PageTransition'
import CategoryShowcase from '@/components/desktop/CategoryShowcase'
import { Great_Vibes, Playfair_Display, Inter } from 'next/font/google'
import { isDesktopRequest } from '@/lib/device'
import { getAllMenus } from '@/lib/promoRepo'
import { toSearchItems, bgCss, getUiLabels, getPageBg, asImageUrl, getLogoUrl } from '@/lib/siteInfo'
export const dynamic = 'force-dynamic'

const scriptFont = Great_Vibes({ weight: '400', subsets: ['latin'] })
const serifFont = Playfair_Display({ weight: ['700', '800'], subsets: ['latin'] })
const sansFont = Inter({ weight: ['400', '600', '700', '800'], subsets: ['latin'] })

const DEFAULT_DESC: Record<string, string> = {
  makanan: 'Rasakan kelezatan hidangan Nusantara yang dimasak dengan cinta dan cita rasa autentik.',
  minuman: 'Segarkan harimu dengan pilihan minuman dari kelapa hingga kopi khas Klapa Manis.',
  paket: 'Pilihan hemat untuk keluarga dan momen kebersamaan.',
}
const DEFAULT_TITLE1: Record<string, string> = {
  makanan: 'Hidangan Nusantara',
  minuman: 'Minuman',
  paket: 'Paket Hemat',
}
const DEFAULT_TITLE2: Record<string, string> = {
  makanan: 'untuk Setiap Momen',
  minuman: 'Segar Setiap Saat',
  paket: 'untuk Kebersamaan',
}

const LABEL: Record<string,string> = { makanan:'Makanan', minuman:'Minuman', paket:'Paket' }

export default async function KategoriPage({ params }: { params: { slug: string } }){
  const slug = params.slug.toLowerCase()
  const kategori = LABEL[slug] || slug
  const settings = await getLandingSettings().catch(()=> ({} as Record<string,string>))
  const heroImage = settings['promo_landing.hero_image'] || ''
  const heroTitle = settings['promo_landing.hero_title'] || ''
  const heroSubtitle = settings['promo_landing.hero_subtitle'] || ''

  const cardShow = settings['promo_landing.menu_card_show'] !== '0'
  const overlay = Number(settings['promo_landing.menu_card_overlay']||0.45)
  const bgColor = settings['promo_landing.bg_color'] || '#FAF7F2'
  const rawCardBg = settings['promo_landing.menu_card_bg'] || '#FFFFFF'
  const hexToRgba = (hex:string, a:number)=>{ const h=hex.replace('#',''); const r=parseInt(h.length===3?h[0]+h[0]:h.slice(0,2),16); const g=parseInt(h.length===3?h[1]+h[1]:h.slice(2,4),16); const b=parseInt(h.length===3?h[2]+h[2]:h.slice(4,6),16); return `rgba(${r},${g},${b},${a})` }
  const cardBg = rawCardBg.startsWith('#') ? hexToRgba(rawCardBg, overlay) : rawCardBg.includes('rgba') ? rawCardBg.replace(/rgba\(([^,]+,[^,]+,[^,]+,)[^)]+\)/, `rgba($1${overlay})`) : rawCardBg
  const cardShadow = settings['promo_landing.menu_card_shadow'] || '0 20px 40px rgba(0,0,0,0.35),0 8px 16px rgba(30,49,36,0.25)'
  const titleShadow = settings['promo_landing.title_shadow'] || '0 3px 12px rgba(0,0,0,0.9)'
  const descShadow = settings['promo_landing.desc_shadow'] || '0 2px 8px rgba(0,0,0,0.8)'
  const isWhiteCard = rawCardBg.toLowerCase().includes('255,255,255') || rawCardBg.toLowerCase() === '#ffffff' || rawCardBg.toLowerCase() === '#fff' || rawCardBg.toLowerCase() === 'white'
  const namaColor = settings['promo_landing.menuCardTextColor'] || (isWhiteCard ? '#1E3124' : '#ffffff')
  const descColor = settings['promo_landing.menuDescColor'] || (isWhiteCard ? 'rgba(30,49,36,0.7)' : 'rgba(255,255,255,0.9)')
  const db = getDb()
  const items = await db.select().from(menu).where(eq(menu.kategori, kategori)).orderBy(asc(menu.urutan)).catch(()=>[])

  const itemsWithPhotos = await Promise.all(items.map(async (it) => {
    const photos = await db.select().from(menuPhoto).where(eq(menuPhoto.menuId, it.id)).orderBy(asc(menuPhoto.urutan)).catch(()=>[])
    return { ...it, photos: photos.map(p => p.imageUrl) }
  }))

  if (isDesktopRequest()) {
    const dishes = itemsWithPhotos.map((it: any) => ({
      id: it.id, nama: it.nama, deskripsi: it.deskripsi, harga: it.harga,
      diskon: it.diskon, photoUrl: it.photoUrl, desktopPhotoUrl: it.desktopPhotoUrl || null, photos: it.photos || [],
    }))
    const allMenus = await getAllMenus().catch(() => [])
    const wa = settings['promo_landing.whatsapp'] || ''
    const desc = settings[`desktop.desc_${slug}`] || DEFAULT_DESC[slug] || `Jelajahi pilihan ${kategori.toLowerCase()} terbaik dari dapur kami.`
    return (
      <PageTransition>
      <CategoryShowcase
        brandTitle={settings['site.title'] || 'Klapa Manis'}
        brandSub={settings['desktop.home_brand_sub'] || 'RUMAH MAKAN'}
        brandTagline={settings['desktop.home_tagline'] || 'Rasa Nusantara, Hangatnya Kebersamaan.'}
        active={slug === 'makanan' || slug === 'minuman' || slug === 'paket' ? (slug as any) : 'home'}
        bg={bgCss(getPageBg(settings, slug).left, '#FAF6EE')}
        eyebrow={`MENU ${kategori.toUpperCase()}`}
        title1={settings[`desktop.title1_${slug}`] || DEFAULT_TITLE1[slug] || ''}
        title2={settings[`desktop.title2_${slug}`] || DEFAULT_TITLE2[slug] || ''}
        titleFallback={kategori}
        description={desc}
        items={dishes}
        location={settings['contact_us.address'] || 'Gronggong, Cirebon'}
        signature={settings['desktop.home_signature'] || 'Lebih dari Sekadar Makan'}
        scriptFont={scriptFont.className}
        searchItems={toSearchItems(allMenus as any)}
        reservasiHref={wa ? `https://wa.me/${wa.replace(/[^0-9]/g, '')}` : ''}
        ui={getUiLabels(settings)}
        fonts={{ serif: serifFont.className, sans: sansFont.className }}
        coverPhotoProp={asImageUrl(getPageBg(settings, slug).right) || undefined}
        logoUrl={getLogoUrl(settings)}
      />
      </PageTransition>
    )
  }

  return (
    <PageTransition>
    <div data-device="mobile" className="w-full min-h-screen overflow-y-auto relative">
      {/* Hero image - top 50% */}
      <section className="absolute top-0 left-0 right-0 h-[50svh] overflow-hidden bg-stone-900">
        {heroImage && <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />}
      </section>

      {/* Background cream - starts at 45%, rounded top */}
      <div className="min-h-[55svh] mt-[45svh] relative z-10 rounded-t-[30px] overflow-hidden" style={{backgroundColor: bgColor, boxShadow: '0 -8px 32px rgba(0,0,0,0.15)'}}>
        {(heroTitle || heroSubtitle) && (
          <div className="max-w-6xl mx-auto px-4 pt-4 pb-2 w-full text-[#1E3124]">
            {heroTitle && <h1 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight">{heroTitle}</h1>}
            {heroSubtitle && <p className="text-xs sm:text-sm text-[#1E3124]/70 italic mt-1">{heroSubtitle}</p>}
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 space-y-3">
          {itemsWithPhotos.length===0 ? (
            <div className="rounded-2xl border border-[#EEE8D8] bg-white p-6 text-center text-[#9A8B7A] text-sm">Belum ada {kategori.toLowerCase()}</div>
          ) : (
            <KategoriClient items={itemsWithPhotos as any} cardBg={cardBg} cardShadow={cardShadow} titleShadow={titleShadow} descShadow={descShadow} isWhiteCard={isWhiteCard} namaColor={namaColor} descColor={descColor} cardShow={cardShow} />
          )}
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
