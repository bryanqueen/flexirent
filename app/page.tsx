

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { BenefitsSection } from "@/components/home/benefits-section"
import { Hero } from "@/components/home/hero"
import { SurveyCta } from "@/components/home/survey-cta"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero/>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">How It Works</h2>
            <p className="font-sans text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to transform your rent payment experience
            </p>
          </div>

          <div className="space-y-32">
            <div className="scroll-stack">
              <Card className="bg-background border-2 border-border md:card-creative">
                <CardContent className="">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="">
                      <Image
                        src="/step1.jpg"
                        alt="signup"
                        height={500}
                        width={500}
                        className="w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="animate-slide-in-right">
                      <h3 className="font-serif text-3xl font-semibold text-foreground mb-6">1. Tenants sign up.</h3>
                      <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                        Create an account, connect your preferred payment method, and set your monthly rent schedule.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="scroll-stack">
              <Card className="bg-background border-2 border-border card-creative">
                <CardContent className="">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-in-right lg:order-2">
                      <Image
                        src="/step2.jpg"
                        alt="Happy landlord"
                        height={500}
                        width={500}
                        className="w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="animate-slide-in-left lg:order-1">
                      <h3 className="font-serif text-3xl font-semibold text-foreground mb-6">
                        2. Landlords receive full rent on time.
                      </h3>
                      <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                        We disburse the agreed yearly rent to the landlord on the renewal date in time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="scroll-stack">
              <Card className="bg-background border-2 border-border card-creative">
                <CardContent className="">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-slide-in-left">
                      <Image
                        src="/step3.jpg"
                        alt="signup"
                        height={500}
                        width={500}
                        className="w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="animate-slide-in-right">
                      <h3 className="font-serif text-3xl font-semibold text-foreground mb-6">3. Everyone relaxes.</h3>
                      <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                        No more lump-sum panic. No more late-payment uncertainty.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-parallax-section">
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0 hero-background">
          <Image
            src="/Night_cityscape.jpeg"
            alt="hero-img"
            height={500}
            width={700}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 hero-content">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 text-balance leading-tight max-w-5xl mx-auto">
            Flexirent is building Africa's most reliable rent-payment network.
          </h2>
        </div>
      </section>
      <SurveyCta/>
      <Footer />
    </div>
  )
}
