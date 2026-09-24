import { getBanners, getLandingSettings, getAllMenus } from '@/lib/promoRepo'
import { Great_Vibes, Playfair_Display, Inter } from 'next/font/google'
import PromoHome40 from '@/components/PromoHome40'
import PageTransition from '@/components/PageTransition'
import HomeWelcome from '@/components/desktop/HomeWelcome'
import { isDesktopRequest } from '@/lib/device'
import { toSearchItems, bgCss, getUiLabels, getPageBg, getLogoUrl } from '@/lib/siteInfo'
export const dynamic = 'force-dynamic'

const scriptFont = Great_Vibes({ weight: '400', subsets: ['latin'] })
const serifFont = Playfair_Display({ weight: ['700', '800'], subsets: ['latin'] })
const sansFont = Inter({ weight: ['400', '600', '700', '800'], subsets: ['latin'] })

export default async function PromoPage() {
  const [banners, settings] = await Promise.all([
    getBanners().catch(() => []),
    getLandingSettings().catch(() => ({} as Record<string, string>)),
  ])

  const heroImage = settings['promo_landing.hero_image'] || ''
  const heroTitle = settings['promo_landing.hero_title'] || ''
  const heroSubtitle = settings['promo_landing.hero_subtitle'] || ''
  const bgColor = settings['promo_landing.bg_color'] || '#FAF7F2'

  if (isDesktopRequest()) {
    // Desktop: sambutan editorial (kata-kata + foto diagonal), tanpa menu langsung.
    // Foto kanan: setting desktop.home_image (bisa upload) > gallery > hero.
    const scenic = banners.map((b) => b.imageUrl).filter(Boolean)
    const homePhoto = settings['desktop.home_image'] || scenic[0] || heroImage
    const allMenus = await getAllMenus().catch(() => [])
    const wa = settings['promo_landing.whatsapp'] || ''
    const avatars = (allMenus as any[]).filter((m) => m.desktopPhotoUrl || m.photoUrl).slice(0, 5).map((m) => (m.desktopPhotoUrl || m.photoUrl) as string)
    return (
      <PageTransition>
      <HomeWelcome
        title={settings['site.title'] || 'Klapa Manis'}
        brandSub={settings['desktop.home_brand_sub'] || 'RUMAH MAKAN'}
        tagline={settings['desktop.home_tagline'] || 'Rasa Nusantara, Hangatnya Kebersamaan.'}
        description={heroSubtitle || settings['site.description'] || 'Nikmati hidangan Nusantara dengan cita rasa autentik dan suasana indah Gronggong, Cirebon.'}
        location={settings['contact_us.address'] || 'Gronggong, Cirebon'}
        signature={settings['desktop.home_signature'] || 'Lebih dari Sekadar Makan'}
        note={settings['desktop.home_note'] || 'Pilihan keluarga untuk setiap momen spesial'}
        avatars={avatars}
        photo={homePhoto}
        videoUrl={settings['desktop.home_video_url'] || ''}
        reservasiHref={wa ? `https://wa.me/${wa.replace(/[^0-9]/g, '')}` : ''}
        searchItems={toSearchItems(allMenus as any)}
        scriptFont={scriptFont.className}
        bg={bgCss(getPageBg(settings, 'home').left, '#FAF6EE')}
        ui={getUiLabels(settings)}
        fonts={{ serif: serifFont.className, sans: sansFont.className }}
        logoUrl={getLogoUrl(settings)}
      />
      </PageTransition>
    )
  }

  return (
    <PageTransition>
    {/* Mobile: hero + cream overlap, safe-area bottom */}
    <div data-device="mobile" className="flex flex-col h-[100svh] w-full overflow-hidden relative pb-[env(safe-area-inset-bottom)]">
      <section className="absolute top-0 left-0 right-0 h-[50svh] overflow-hidden bg-stone-900">
        {heroImage && <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />}
      </section>
      <div className="flex-1 flex flex-col mt-[45svh] relative z-10 rounded-t-[30px] overflow-hidden" style={{backgroundColor: bgColor, boxShadow: '0 -8px 32px rgba(0,0,0,0.15)'}}>
        {(heroTitle || heroSubtitle) && (
          <div className="max-w-5xl mx-auto px-4 pt-4 pb-2 w-full text-[#1E3124] shrink-0">
            {heroTitle && <h1 className="font-serif text-2xl font-semibold leading-tight">{heroTitle}</h1>}
            {heroSubtitle && <p className="text-xs text-[#1E3124]/70 italic mt-1">{heroSubtitle}</p>}
          </div>
        )}
        <div className="flex-1 min-h-0 overflow-hidden">
          <PromoHome40 banners={banners} galleryTransition={settings['promo_landing.gallery_transition']||'acak'} galleryInterval={settings['promo_landing.gallery_interval']||'3000'} bgColor={bgColor} />
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
