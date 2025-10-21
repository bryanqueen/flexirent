"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border ${isOpen ? 'bottom-0' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Flexirent" width={120} height={40} className="h-10 md:12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-serif text-foreground hover:text-2xl transition cursor-pointer">
              Home
            </Link>
            <Link href="/about" className="font-serif hover:text-2xl cursor-pointer">
              About Us
            </Link>
            <Link href="/faq" className="font-serif text-foreground hover:text-2xl transition-colors">
              FAQ
            </Link>
            <Link href="/survey" className=" text-foreground hover:text-primary transition-colors">
              <Button className="bg-primary font-serif text-xl hover:bg-primary/90 text-primary-foreground">
                Take a Survey
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="">
              {isOpen ? <X className="h-10 w-10" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40 top-0 bg-accent grain-bg overflow-hidden h-[80vh] rounded-2xl">
            <div className="flex flex-col gap-10 py-10 px-10 ">
              <Link
                href="/"
                className="text-4xl font-serif font-semibold text-foreground hover:text-primary transition-all duration-300 transform hover:scale-105 stair-animation"
                style={{ animationDelay: "0.1s" }}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-4xl font-serif font-semibold text-foreground hover:text-primary transition-all duration-300 transform hover:scale-105 stair-animation"
                style={{ animationDelay: "0.2s" }}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="text-4xl font-serif font-semibold text-foreground hover:text-primary transition-all duration-300 transform hover:scale-105 stair-animation"
                style={{ animationDelay: "0.3s" }}
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              {/* <Link
                href="/survey"
                className="text-4xl font-serif font-semibold text-foreground hover:text-primary transition-all duration-300 transform hover:scale-105 stair-animation"
                style={{ animationDelay: "0.4s" }}
                onClick={() => setIsOpen(false)}
              >
                Survey
              </Link> */}

              <div className=" stair-animation absolute bottom-0 w-full left-0 " style={{ animationDelay: "0.5s" }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-4xl px-12 py-8 rounded-none w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Take a Survey
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
