import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Instrument_Sans } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Loading } from "@/components/loading"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: '400'
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Flexirent - Monthly Rent, Finally Possible",
  description:
    "Flexirent lets Nigerian tenants pay rent in simple monthly installments—while landlords still receive their money on time, stress-free.",
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${instrumentSerif.variable} ${instrumentSans.variable} antialiased`}>
        <Suspense fallback={<Loading/>}>
          {children}
          {/* <Analytics /> */}
        </Suspense>
      </body>
    </html>
  )
}
