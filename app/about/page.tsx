"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <>
      <Navigation />
      <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image src="/tenants-1.jpg" alt="About hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
        </div>

        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
        >
          <motion.h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 text-balance leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Making Rent Work for Real People
          </motion.h1>
          <motion.p
            className="font-sans text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The story behind Flexirent: How we're enabling monthly rent payments for stress-free renewals in Nigeria.
          </motion.p>
        </motion.div>
      </section>

      {/* Problem Section */}
      <motion.section
        id="problem"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="font-serif text-4xl sm:text-5xl font-bold text-foreground text-balance"
              variants={staggerItem}
            >
              Every year, millions of Nigerians confront the same daunting reality:
            </motion.h2>
            <motion.p className="font-sans text-2xl text-foreground font-semibold italic" variants={staggerItem}>
              "How do I stay disciplined enough to save consistently for a full year's rent?"
            </motion.p>
            <motion.div className="space-y-6 text-lg text-muted-foreground leading-relaxed" variants={staggerContainer}>
              <motion.p variants={staggerItem}>
                Even with good intentions to save, life gets in the way—unexpected expenses, distractions, or simply the lack of structure. The result? Last-minute scrambles, stress, and relocations.
              </motion.p>
              <motion.p variants={staggerItem}>
                For landlords, it breeds delays, defaults, and the constant fear of vacancies or unreliable renewals.
              </motion.p>
              <motion.p className="text-xl text-foreground font-semibold pt-4" variants={staggerItem}>
                Housing should be a foundation for stability, not a source of endless stress. It deserves to be simple, reliable, and equitable.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Turning Point Section */}
      <motion.section
        id="turning-point"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/10 to-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground" variants={staggerItem}>
                Our Turning Point
              </motion.h2>
              <motion.p className="font-sans text-lg text-muted-foreground leading-relaxed" variants={staggerItem}>
                Flexirent was born from a single, unwavering conviction:
              </motion.p>
              <motion.p className="font-serif text-2xl text-foreground font-semibold italic" variants={staggerItem}>
                "What if rent aligned with how we actually live—paid monthly, handled seamlessly, and built on mutual trust?"
              </motion.p>
              <motion.div
                className="space-y-4 text-lg text-muted-foreground leading-relaxed"
                variants={staggerContainer}
              >
                <motion.p variants={staggerItem}>
                  That's exactly what we created: a platform that lets tenants split their next year's rent into monthly payments, while securing full, on-time disbursements for landlords.
                </motion.p>
                <motion.p variants={staggerItem}>
                  Tenants contribute monthly toward their next year's rent, stress-free. Landlords receive the full amount upfront, with zero risk of defaults or delays.
                </motion.p>
                <motion.p className="text-xl text-foreground font-semibold pt-4" variants={staggerItem}>
                  No loans. No gambles. Just fairness for all.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden "
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/tenants-3.png" alt="Team collaboration" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Real Impact Section */}
      <motion.section
        id="real-impact"
        className="py-24 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-serif text-4xl sm:text-5xl font-bold text-foreground text-center mb-16 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Real Lives, Real Change
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[ 
              {
                title: "Young Professional in Lagos",
                description: "Pays monthly toward next year's rent, avoiding the scramble for lump sums and building financial discipline.",
                image: "/impact-1.jpg",
              },
              {
                title: "Landlord in Abuja",
                description: "Gets full rent disbursed automatically at renewal—no more chasing payments or worrying about vacancies.",
                image: "/impact-2.jpg",
              },
              {
                title: "Family in Port Harcourt",
                description: "Splits rent into monthly chunks, turning renewal season from a crisis into a seamless process.",
                image: "/impact-3.jpg",
              },
            ].map((item, idx) => (
              <motion.div key={idx} className="group" variants={staggerItem}>
                <motion.div
                  className="relative h-64 rounded-xl overflow-hidden mb-6 "
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="font-sans text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-sans text-lg text-muted-foreground">This is the promise of Flexirent</p>
            <p className="font-serif text-3xl font-bold text-foreground">
              Stability. Empowerment. A fairer future for housing.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        id="mission-vision"
        className="py-24 px-4 sm:px-6 lg:px-8 noise-bg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="bg-white rounded-2xl p-12 shadow-lg border border-border" variants={staggerItem}>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                To enable stress-free rent renewals by allowing tenants to split next year's rent into monthly payments, while providing landlords with secure, timely disbursements.
              </p>
            </motion.div>

            <motion.div className="bg-white rounded-2xl p-12 shadow-lg border border-border" variants={staggerItem}>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Our Vision</h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                A Nigeria where monthly rent is the standard—scaling this model across Africa to end housing insecurity.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Closing Statement Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/sunset-palms.jpg" alt="Closing" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80"></div>
        </div>

        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="space-y-8">
            <motion.p
              className="font-sans text-xl text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Rent shouldn't shatter dreams or strain families
            </motion.p>
            <motion.h2
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              It should support them.
            </motion.h2>
            <motion.p
              className="font-sans text-xl text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              At Flexirent, we're committed to that vision. Join us in building it.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-24 px-4 sm:px-6 lg:px-8 noise-bg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="bg-white rounded-2xl p-12 shadow-lg border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Discover how Flexirent can transform your rental journey
            </h2>
            <Link href="/survey">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-lg px-12 py-4 rounded-xl transition-all duration-300 shadow-lg"
              >
                Take the Survey
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

        <Footer />
      </div>
    </>
  )
}