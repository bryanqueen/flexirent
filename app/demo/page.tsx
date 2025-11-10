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
                className="relative h-[50vh] w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                {/* Noise background circles */}
                {/* <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 noise-bg rounded-full opacity-60 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 noise-bg rounded-full opacity-60 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 noise-bg rounded-full opacity-40 blur-3xl" />
                </div> */}

                {/* Image overlay on noise background */}
                <motion.div
                    className="relative h-full w-full z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.610, 0.355, 1.000] }}
                >
                    <Image
                        src="/demo-1.png"
                        alt="Start your rent journey"
                        fill
                        className="object-contain"
                    />
                    {/* Fallback gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 -z-10" />
                </motion.div>
            </motion.div>

            {/* Bottom half - Text and Button on white */}
            <div className="flex-1 relative flex flex-col px-6 bg-white pt-12">
                <div className="max-w-2xl mx-auto text-center flex-1 flex flex-col justify-between pb-8">
                    {/* Text */}
                    <motion.h1
                        className="font-serif text-4xl lg:text-6xl font-bold text-foreground leading-tight"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Start making monthly commitments towards your next rent
                    </motion.h1>

                    {/* Button - pushed to bottom */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-2xl px-12 py-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform w-full"
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
