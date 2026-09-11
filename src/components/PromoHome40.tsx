'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CategoryNav from './CategoryNav'

type Banner = { id:number,imageUrl:string,title:string|null }

const DIRS = ['left','right','top','bottom'] as const
type Dir = typeof DIRS[number]

function pickDir(setting: string, prev?: Dir): Dir {
  if(setting==='kiri') return 'left'
  if(setting==='kanan') return 'right'
  if(setting==='atas') return 'top'
  if(setting==='bawah') return 'bottom'
  if(setting==='kiri-kanan') return Math.random()<0.5?'left':'right'
  if(setting==='atas-bawah') return Math.random()<0.5?'top':'bottom'
  let d: Dir
  do { d = DIRS[Math.floor(Math.random()*DIRS.length)] } while(prev && DIRS.length>1 && d===prev)
  return d
}

export default function PromoHome40({ banners, galleryTransition='acak', galleryInterval='3000', bgColor='#FAF7F2' }: { banners: Banner[], galleryTransition?: string, galleryInterval?: string, bgColor?: string }){
  const router = useRouter()
  const [idx,setIdx]=useState(0)
  const [dir,setDir]=useState<Dir>('left')
  const [tab,setTab]=useState('')
  const interval = Math.max(1000, Number(galleryInterval)||3000)

  const go = (next: number, forcedDir?: Dir) => {
    const d = forcedDir || pickDir(galleryTransition, dir)
    setDir(d)
    setIdx(next)
  }

  useEffect(()=>{
    if(banners.length<=1) return
    const t=setInterval(()=> go((idx+1)%banners.length), interval)
    return ()=>clearInterval(t)
  },[banners.length, idx, interval, galleryTransition])

  const enterClass: Record<Dir,string> = {
    left: 'translate-x-full',
    right: '-translate-x-full',
    top: 'translate-y-full',
    bottom: '-translate-y-full',
  }

  const navigate = (v: string) => {
    setTab(v.toLowerCase())
    if(v.toLowerCase()==='gallery') router.push('/home/gallery')
    else if(v.toLowerCase()==='contact us') router.push('/home/contact')
    else router.push(`/home/kategori/${v.toLowerCase()}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 space-y-4">
      {/* Gallery slider */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden bg-stone-100 border border-[#EEE8D8] relative" style={{boxShadow: '0 10px 28px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)'}}>
        {banners.length>0 ? (
          <div className="w-full h-full relative overflow-hidden">
            {banners.map((b,i)=>(
              <img
                key={b.id}
                src={b.imageUrl}
                alt={b.title||'Gallery'}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${i===idx ? 'translate-x-0 translate-y-0' : i < idx ? '-translate-x-full' : enterClass[dir]}`}
                style={{ zIndex: i===idx ? 1 : 0 }}
              />
            ))}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-10">
              {banners.map((_,i)=>(
                <button key={i} onClick={()=>go(i)} className={`h-1.5 md:h-2 rounded-full transition-all ${i===idx?'w-5 md:w-8 bg-white':'w-1.5 md:w-2 bg-white/60'}`} />
              ))}
            </div>
            {banners.length>1 && (
              <>
                <button onClick={()=>go((idx-1+banners.length)%banners.length, galleryTransition==='acak'? pickDir('acak') : undefined)} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 md:w-10 md:h-10 grid place-items-center z-10 text-lg md:text-xl transition-colors">{'‹'}</button>
                <button onClick={()=>go((idx+1)%banners.length, galleryTransition==='acak'? pickDir('acak') : undefined)} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 md:w-10 md:h-10 grid place-items-center z-10 text-lg md:text-xl transition-colors">{'›'}</button>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-full grid place-items-center text-stone-400 text-sm p-4 text-center">Gallery slider — tambah beberapa foto di /home/setting/gallery</div>
        )}
      </div>

      {/* Category nav */}
      <div className="flex justify-center pt-3 pb-2">
        <CategoryNav active={tab} onSelect={navigate} bgColor={bgColor} />
      </div>
    </div>
  )
}
