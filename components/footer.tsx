import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-accent/20 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grain-effect opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-6">
            <p className="font-serif text-muted-foreground font-semibold text-lg leading-relaxed max-w-md">
              Revolutionizing rent payments in Nigeria. Pay monthly while your landlord receives on time.
            </p>
            {/* <div className="flex space-x-4">
              <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center hover:bg-accent/50 transition-colors cursor-pointer">
                <span className="text-sm font-medium">TW</span>
              </div>
              <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center hover:bg-accent/50 transition-colors cursor-pointer">
                <span className="text-sm font-medium">IG</span>
              </div>
              <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center hover:bg-accent/50 transition-colors cursor-pointer">
                <span className="text-sm font-medium">LI</span>
              </div>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-sans text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="font-sans text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/faq" className="font-sans text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link href="/survey" className="font-sans text-muted-foreground hover:text-primary transition-colors">
                Survey
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-foreground">Get in Touch</h3>
            <div className="space-y-4">
              <p className="font-sans text-muted-foreground">hello@flexirent.ng</p>
              <p className="font-sans text-muted-foreground">+2347032073459</p>
              <p className="font-sans text-muted-foreground">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              <p className="font-sans text-muted-foreground text-sm">
                © {new Date().getFullYear()} Flexirent. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="font-sans text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="font-sans text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16 pt-12 border-t border-border/30 -mb-16 pb-0">
          <div className="opacity-60 transition-opacity duration-500 w-full">
            <Image
              src="/logo(footer).png"
              alt="Flexirent"
              width={800}
              height={800}
              className="w-full scale-100"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
