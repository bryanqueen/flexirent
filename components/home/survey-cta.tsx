"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export function SurveyCta(){
    const router = useRouter()
    return(
        <section className="py-20 px-4 sm:px-6 lg:px-8 noise-bg">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-16 shadow-lg border border-border">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-8 text-balance">
              Ready to experience stress-free rent?
            </h2>
            <p className="font-sans text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Take a quick survey to see if Flexirent is right for you.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-2xl px-12 py-6 rounded-xl transition-all duration-300"
              onClick={() => router.push("/survey")}
            >
              Take the Survey
            </Button>
          </div>
        </div>
      </section>
    )
}