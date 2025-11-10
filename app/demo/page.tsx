"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function DemoPage() {
    const router = useRouter()

    return (
        <div className="h-screen bg-white relative overflow-hidden flex flex-col">
            {/* Top half - Image with noise background */}
            <motion.div
                className="relative h-[60vh] w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {/* Noise background circles */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 noise-bg rounded-full opacity-60 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 noise-bg rounded-full opacity-60 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 noise-bg rounded-full opacity-40 blur-3xl" />
                </div>

                {/* Image overlay on noise background */}
                <motion.div
                    className="relative h-full w-full z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
                >
                    <Image
                        src="/demo-visual.jpg"
                        alt="Start your rent journey"
                        fill
                        className="object-contain p-12"
                    />
                    {/* Fallback gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 -z-10" />
                </motion.div>
            </motion.div>

            {/* Bottom half - Text and Button on white */}
            <div className="h-[40vh] relative flex items-center justify-center px-6 bg-white">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    {/* Text */}
                    <motion.h1
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Start making monthly commitments towards your next rent
                    </motion.h1>

                    {/* Button */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-2xl px-12 py-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                            onClick={() => router.push("/survey")}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
