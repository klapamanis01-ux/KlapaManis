import { getLandingSettings, getAllMenus } from '@/lib/promoRepo'
import ContactUs from '@/components/ContactUs'
import PageTransition from '@/components/PageTransition'
import ContactLight from '@/components/desktop/ContactLight'
import { Playfair_Display, Inter } from 'next/font/google'
import { isDesktopRequest } from '@/lib/device'
import { toSearchItems, bgCss, getUiLabels, getPageBg } from '@/lib/siteInfo'
export const dynamic = 'force-dynamic'

const serifFont = Playfair_Display({ weight: ['700', '800'], subsets: ['latin'] })
const sansFont = Inter({ weight: ['400', '600', '700', '800'], subsets: ['latin'] })

export default async function ContactPage(){
  const settings = await getLandingSettings().catch(()=> ({} as Record<string,string>))
  const heroImage = settings['promo_landing.hero_image'] || ''
  const heroTitle = settings['promo_landing.hero_title'] || ''
  const heroSubtitle = settings['promo_landing.hero_subtitle'] || ''
  const bgColor = settings['promo_landing.bg_color'] || '#FAF7F2'
  const whatsapp = settings['promo_landing.whatsapp'] || ''
  const instagram = settings['promo_landing.instagram'] || ''
  const tiktok = settings['promo_landing.tiktok'] || ''
  const title = settings['contact_us.title'] || ''
  const subtitle = settings['contact_us.subtitle'] || ''
  const whatsappDisplay = settings['promo_landing.whatsapp_display'] || settings['contact_us.whatsapp_display'] || ''
  const instagramDisplay = settings['promo_landing.instagram_display'] || settings['contact_us.instagram_display'] || ''
  const tiktokDisplay = settings['promo_landing.tiktok_display'] || settings['contact_us.tiktok_display'] || ''

  if (isDesktopRequest()) {
    const mapsUrl = settings['contact_us.maps_url'] || ''
    const address = settings['contact_us.address'] || ''
    const hours = settings['contact_us.hours'] || ''
    const allMenus = await getAllMenus().catch(() => [])
    return (
      <PageTransition>
      <ContactLight
        brandTitle={settings['site.title'] || 'Klapa Manis'}
        brandSub={settings['desktop.home_brand_sub'] || 'RUMAH MAKAN'}
        brandTagline={settings['desktop.home_tagline'] || 'Rasa Nusantara, Hangatnya Kebersamaan.'}
        bg={bgCss(getPageBg(settings, 'contact').left, '#FAF6EE')}
        eyebrow={settings['desktop.eyebrow_contact'] || 'HUBUNGI KAMI'}
        title1={settings['desktop.title1_contact'] || ''}
        title2={settings['desktop.title2_contact'] || ''}
        titleFallback={title || 'Hubungi Kami'}
        contact={{ whatsapp, instagram, tiktok, title: title || undefined, subtitle: subtitle || undefined, whatsappDisplay, instagramDisplay, tiktokDisplay }}
        mapsUrl={mapsUrl}
        address={address}
        hours={hours}
        location={address || 'Gronggong, Cirebon'}
        searchItems={toSearchItems(allMenus as any)}
        reservasiHref={whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}` : ''}
        ui={getUiLabels(settings)}
        fonts={{ serif: serifFont.className, sans: sansFont.className }}
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
          <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-4 pb-2 w-full text-[#1E3124]">
            {heroTitle && <h1 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight">{heroTitle}</h1>}
            {heroSubtitle && <p className="text-xs sm:text-sm text-[#1E3124]/70 italic mt-1">{heroSubtitle}</p>}
          </div>
        )}
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-3">
          <ContactUs settings={{ whatsapp, instagram, tiktok, title: title||undefined, subtitle: subtitle||undefined, whatsappDisplay, instagramDisplay, tiktokDisplay }} />
        </div>
      </div>
    </div>
    </PageTransition>
  )
}
