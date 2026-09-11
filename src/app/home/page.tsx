import { getBanners, getLandingSettings } from '@/lib/promoRepo'
import PromoHome40 from '@/components/PromoHome40'
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
    {/* Mobile: absolute hero + cream overlap (seperti kategori) */}
    <div className="md:hidden w-full min-h-screen overflow-y-auto relative">
      <section className="absolute top-0 left-0 right-0 h-[50svh] overflow-hidden bg-stone-900">
        {heroImage && <img src={heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />}
      </section>
      <div className="min-h-[55svh] mt-[45svh] relative z-10 rounded-t-[30px] overflow-hidden" style={{backgroundColor: bgColor, boxShadow: '0 -8px 32px rgba(0,0,0,0.15)'}}>
        {(heroTitle || heroSubtitle) && (
          <div className="max-w-5xl mx-auto px-4 pt-4 pb-2 w-full text-[#1E3124]">
            {heroTitle && <h1 className="font-serif text-2xl font-semibold leading-tight">{heroTitle}</h1>}
            {heroSubtitle && <p className="text-xs text-[#1E3124]/70 italic mt-1">{heroSubtitle}</p>}
          </div>
        )}
        <PromoHome40 banners={banners} galleryTransition={settings['promo_landing.gallery_transition']||'acak'} galleryInterval={settings['promo_landing.gallery_interval']||'3000'} bgColor={bgColor} />
      </div>
    </div>
    {/* Desktop: hero lebar sama dengan gallery (max-w-5xl), tidak terpotong */}
    <div className="hidden md:block w-full min-h-screen overflow-y-auto" style={{backgroundColor: bgColor}}>
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-4">
        <section className="relative w-full h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-stone-900">
          {heroImage && <img src={heroImage} alt="Hero" className="w-full h-full object-contain" />}
        </section>
        {(heroTitle || heroSubtitle) && (
          <div className="px-2 text-[#1E3124]">
            {heroTitle && <h1 className="font-serif text-4xl font-semibold leading-tight">{heroTitle}</h1>}
            {heroSubtitle && <p className="text-sm text-[#1E3124]/70 italic mt-1">{heroSubtitle}</p>}
          </div>
        )}
        <div className="rounded-2xl overflow-hidden" style={{backgroundColor: bgColor}}>
          <PromoHome40 banners={banners} galleryTransition={settings['promo_landing.gallery_transition']||'acak'} galleryInterval={settings['promo_landing.gallery_interval']||'3000'} bgColor={bgColor} />
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
