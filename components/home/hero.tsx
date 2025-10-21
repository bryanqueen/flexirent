"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"


export function Hero() {
    const router = useRouter()
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    // Split text for animated reveal
    const headingText = "A Flexible way to pay rent, finally possible."
    const words = headingText.split(" ")

    return (
        <motion.section 
            ref={containerRef}
            className="noise-bg pb-20 pt-24 px-4 lg:px-8 flex items-center min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto lg:px-8 w-full">
                <div className="relative rounded-3xl overflow-hidden flex items-center justify-center h-[80vh]">
                    <motion.div 
                        className="absolute inset-0 z-0"
                        style={{ y, opacity }}
                    >
                        <Image src="/hero-image2.png" alt="hero-img" className="object-cover" priority fill />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/65"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </motion.div>

                    <div className="relative z-10 text-center px-8 sm:px-12 lg:px-20 py-20 sm:py-24 lg:py-32">
                        <div className="overflow-hidden mb-8">
                            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight">
                                {words.map((word, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="inline-block mr-[0.2em] last:mr-0"
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.1 + idx * 0.1,
                                            ease: [0.215, 0.610, 0.355, 1.000]
                                        }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                        </div>

                        <motion.p 
                            className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed drop-shadow-md"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            Tenants pay rent in installments, while their landlords receive their money on time,
                            stress-free.
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                                duration: 0.5,
                                delay: 1,
                                ease: [0.215, 0.610, 0.355, 1.000]
                            }}
                        >
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-2xl px-12 py-6 rounded-xl transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 transform"
                                onClick={() => router.push("/survey")}
                            >
                                Take a Survey
                            </Button>
                        </motion.div>
                    </div>

                    {/* Reveal overlay animation */}
                    <motion.div
                        className="absolute inset-0 bg-black z-50"
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        transition={{ 
                            duration: 1,
                            ease: [0.645, 0.045, 0.355, 1.000]
                        }}
                        style={{ transformOrigin: 'top' }}
                    />
                </div>
            </div>
        </motion.section>
    )
}