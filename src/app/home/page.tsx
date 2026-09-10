import { getBanners, getLandingSettings } from '@/lib/promoRepo'
import PromoHome40 from '@/components/PromoHome40'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
export const dynamic = 'force-dynamic'

export default async function PromoPage() {
  const [banners, settings] = await Promise.all([
    getBanners().catch(() => []),
    getLandingSettings().catch(() => ({} as Record<string, string>)),
  ])

  const heroImage = settings['promo_landing.hero_image'] || ''
  const heroTitle = settings['promo_landing.hero_title'] || ''
  const heroSubtitle = settings['promo_landing.hero_subtitle'] || ''
  const bgColor = settings['promo_landing.bg_color'] || '#FAF7F2'

  return (
    <PageTransition>
    <div className="flex flex-col h-[100svh] md:h-screen w-full overflow-hidden relative">
      {/* Desktop navbar */}
      <Navbar active="" bgColor={bgColor} />

      {/* Hero image */}
      <section className="absolute top-0 left-0 right-0 h-[50svh] md:h-[60vh] overflow-hidden bg-stone-900">
        {heroImage && <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />}
        {/* Desktop: text overlay on hero */}
        {(heroTitle || heroSubtitle) && (
          <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent items-end">
            <div className="max-w-6xl mx-auto px-6 pb-8 w-full">
              {heroTitle && <h1 className="font-serif text-4xl lg:text-5xl font-semibold leading-tight text-white" style={{textShadow: '0 2px 12px rgba(0,0,0,0.5)'}}>{heroTitle}</h1>}
              {heroSubtitle && <p className="text-sm lg:text-base text-white/80 italic mt-2">{heroSubtitle}</p>}
            </div>
          </div>
        )}
      </section>

      {/* Mobile: cream bg with text inside */}
      <div className="flex-1 flex flex-col mt-[45svh] md:hidden relative z-10 rounded-t-[30px] overflow-hidden" style={{backgroundColor: bgColor, boxShadow: '0 -8px 32px rgba(0,0,0,0.15)'}}>
        {(heroTitle || heroSubtitle) && (
          <div className="max-w-6xl mx-auto px-4 pt-4 pb-2 w-full text-[#1E3124]">
            {heroTitle && <h1 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight">{heroTitle}</h1>}
            {heroSubtitle && <p className="text-xs sm:text-sm text-[#1E3124]/70 italic mt-1">{heroSubtitle}</p>}
          </div>
        )}
        <PromoHome40 banners={banners} galleryTransition={settings['promo_landing.gallery_transition']||'acak'} galleryInterval={settings['promo_landing.gallery_interval']||'3000'} bgColor={bgColor} />
      </div>

      {/* Desktop: content below hero */}
      <div className="hidden md:flex flex-1 flex-col mt-4 relative z-10" style={{backgroundColor: bgColor}}>
        <PromoHome40 banners={banners} galleryTransition={settings['promo_landing.gallery_transition']||'acak'} galleryInterval={settings['promo_landing.gallery_interval']||'3000'} bgColor={bgColor} />
      </div>
    </div>
    </PageTransition>
  )
}
