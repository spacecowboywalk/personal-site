import { useEffect, useRef } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import '@/styles/tailwind.css'
import 'focus-visible'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <div className="fixed inset-0 flex justify-center bg-[url(https://e1.pxfuel.com/desktop-wallpaper/653/602/desktop-wallpaper-cowboy-bebop-iphone-x-cowboy-bebop-iphone-thumbnail.jpg)] bg-cover dark:bg-[url(https://images6.alphacoders.com/863/thumb-1920-863542.png)] sm:bg-[url(https://images.hdqwalls.com/download/no-mans-sky-spaceman-4k-lo-2560x1440.jpg)] sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white/10 ring-1 ring-zinc-100 backdrop-blur-sm dark:ring-zinc-300/20 sm:backdrop-blur-xl" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
