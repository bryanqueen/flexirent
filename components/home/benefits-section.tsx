"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const tenantBenefits = [
  {
    title: "Smooth, predictable monthly payments",
    description: "Break down your annual rent into manageable monthly installments.",
    image: "/tenants-1.jpg",
  },
  {
    title: "Less financial pressure and more savings control",
    description: "Keep your cash flow healthy while securing your dream home.",
    image: "/tenants-2.jpg",
  },
  {
    title: "Instant digital receipts and payment history",
    description: "Track all your payments with detailed records and receipts.",
    image: "/tenants-3.png",
  },
]

const landlordBenefits = [
  {
    title: "Guaranteed rent disbursement",
    description: "Receive your full rent payment upfront or on your preferred schedule.",
    image: "/landlord-1.jpg",
  },
  {
    title: "Zero chase for late payments",
    description: "No more following up on overdue rent or dealing with payment delays.",
    image: "/landlord-2.jpeg",
  },
  {
    title: "Happier, longer-staying tenants",
    description: "Reduce tenant turnover with flexible payment options.",
    image: "/landlord-3.jpeg",
  },
]

export function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<"tenants" | "landlords">("tenants")
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeBenefits = activeTab === "tenants" ? tenantBenefits : landlordBenefits

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBenefits.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeBenefits.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 noise-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">Benefits</h2>
          <p className="font-sans text-xl text-muted-foreground max-w-3xl mx-auto">
            Designed to make rent payments work for everyone
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white rounded-xl p-2 mb-8 border border-border max-w-md mx-auto">
          <button
            onClick={() => {
              setActiveTab("tenants")
              setCurrentIndex(0)
            }}
            className={`flex-1 py-3 px-6 rounded-lg font-sans font-medium transition-all duration-300 ${
              activeTab === "tenants" ? "bg-card text-foreground" : "text-muted-foreground"
            }`}
          >
            For Tenants
          </button>
          <button
            onClick={() => {
              setActiveTab("landlords")
              setCurrentIndex(0)
            }}
            className={`flex-1 py-3 px-6 rounded-lg font-sans font-medium transition-all duration-300 ${
              activeTab === "landlords" ? "bg-card text-foreground" : "text-muted-foreground"
            }`}
          >
            For Landlords
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Carousel Cards */}
          <div className="relative overflow-hidden mb-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {activeBenefits.map((benefit, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-border h-[500px] lg:h-[600px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${benefit.image}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />
                    <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
                      <h4 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-4 text-balance">
                        {benefit.title}
                      </h4>
                      <p className="font-sans text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full w-12 h-12 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 bg-transparent"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex gap-2">
              {activeBenefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-foreground" : "w-2 bg-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full w-12 h-12 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 bg-transparent"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
