"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"


export function Hero(){
    const router = useRouter()
    return(
        <section className="noise-bg pb-20 pt-24 px-4 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto lg:px-8 w-full ">
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center h-[80vh]">
            <div className="absolute inset-0 z-0">
              <Image src="/hero-image2.png" alt="hero-img" className="object-cover" priority fill />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/65"></div>
            </div>

            <div className="relative z-10 text-center px-8 sm:px-12 lg:px-20 py-20 sm:py-24 lg:py-32">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 text-balance leading-tight drop-shadow-lg">
                A Flexible way to pay rent, finally possible.
              </h1>

              <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                Tenants pay rent in installments, while their landlords receive their money on time,
                stress-free.
              </p>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-2xl px-12 py-6 rounded-xl transition-all duration-300 shadow-xl cursor-pointer"
                onClick={() => router.push("/survey")}
              >
                Take a Survey
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
}