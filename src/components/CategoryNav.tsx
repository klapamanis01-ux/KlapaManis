'use client'
const ITEMS: [string, string][] = [
  ['Makanan', 'Makanan'],
  ['Minuman', 'Minuman'],
  ['Paket', 'Paket'],
  ['Gallery', 'Gallery'],
  ['Contact Us', 'Contact Us'],
]

export default function CategoryNav({ active, onSelect, bgColor='#FAF7F2' }: { active: string, onSelect: (v:string)=>void, bgColor?: string }) {
  return (
    <nav className="flex w-full gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none px-1 justify-center items-center" aria-label="Navigasi media promo" style={{ scrollbarWidth: 'none' }}>
      {ITEMS.map(([value, label]) => {
        const isActive = active.toLowerCase() === value.toLowerCase()
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="shrink-0 flex flex-col items-center gap-1 min-w-[56px]"
          >
            {/* Mobile: round 3D buttons */}
            <div
              className={[
                'sm:hidden w-14 h-14 rounded-full flex items-center justify-center border-2 overflow-hidden transition-all duration-150',
                'shadow-[0_6px_0_rgba(0,0,0,0.3),0_8px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_0_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.3),0_3px_8px_rgba(0,0,0,0.2)] active:translate-y-[3px]',
                isActive
                  ? 'bg-[#1E3124] border-[#1E3124] shadow-[0_6px_0_rgba(10,18,12,0.5),0_8px_16px_rgba(0,0,0,0.35)]'
                  : 'border-[#E8E0C8]',
              ].join(' ')}
              style={isActive ? undefined : {background: bgColor}}
            >
              {label === 'Gallery' ? (
                <img src="/icons/Gallery.svg" alt={label} className="w-[30px] h-[30px] object-contain shrink-0" />
              ) : label === 'Contact Us' ? (
                <img src="/icons/ContactUs.svg" alt={label} className="w-[30px] h-[30px] object-contain shrink-0" />
              ) : (
                <img
                  src={`/icons/${label}.png`}
                  alt={label}
                  className={['w-[30px] h-[30px] object-contain shrink-0 transition-all duration-200', isActive ? 'brightness-0 invert' : ''].join(' ')}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
            </div>
            {/* Desktop: combo box buttons */}
            <div
              className={[
                'hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                'shadow-[0_3px_0_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_5px_0_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:shadow-[0_1px_0_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] active:translate-y-[2px]',
                isActive
                  ? 'bg-[#1E3124] border-[#1E3124] text-white'
                  : 'bg-white border-[#E8E0C8] text-[#1E3124] hover:border-[#1E3124]/30',
              ].join(' ')}
            >
              {label === 'Gallery' ? (
                <img src="/icons/Gallery.svg" alt={label} className="w-4 h-4 object-contain shrink-0" />
              ) : label === 'Contact Us' ? (
                <img src="/icons/ContactUs.svg" alt={label} className="w-4 h-4 object-contain shrink-0" />
              ) : (
                <img
                  src={`/icons/${label}.png`}
                  alt={label}
                  className={['w-4 h-4 object-contain shrink-0 transition-all duration-200', isActive ? 'brightness-0 invert' : ''].join(' ')}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <span className="text-sm font-bold whitespace-nowrap">{label}</span>
              <svg className="w-3.5 h-3.5 shrink-0 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        )
      })}
    </nav>
  )
}
