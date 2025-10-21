import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
              <p className="font-sans text-muted-foreground text-lg">Last updated: January 2025</p>
            </div>

            <div className="bg-card/50 grain-bg rounded-2xl p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <p className="font-sans text-foreground leading-relaxed">
                  Flexirent ("we," "our," or "us") values your privacy and is committed to protecting your personal
                  information. This Privacy Policy explains how we collect, use, and safeguard your data when you use
                  our website, mobile applications, and related services (collectively, the "Service").
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">1. Information We Collect</h2>
                <p className="font-sans text-foreground leading-relaxed">We may collect:</p>
                <ul className="font-sans text-foreground leading-relaxed list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Personal details:</strong> name, email, WhatsApp number, phone number, and payment
                    information.
                  </li>
                  <li>
                    <strong>Rental data:</strong> property address, rent amount, payment frequency.
                  </li>
                  <li>
                    <strong>Technical data:</strong> browser type, device information, IP address, cookies, and
                    analytics data.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                <p className="font-sans text-foreground leading-relaxed">We use your data to:</p>
                <ul className="font-sans text-foreground leading-relaxed list-disc list-inside space-y-2 ml-4">
                  <li>Provide and operate the Flexirent platform.</li>
                  <li>Process rent payments and maintain accurate records.</li>
                  <li>Communicate important updates, promotions, and support messages.</li>
                  <li>Improve our products, security, and user experience.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">3. Sharing of Information</h2>
                <p className="font-sans text-foreground leading-relaxed">We may share data with:</p>
                <ul className="font-sans text-foreground leading-relaxed list-disc list-inside space-y-2 ml-4">
                  <li>Payment processors and financial partners to complete transactions.</li>
                  <li>Service providers (e.g., hosting, analytics) who help us operate the platform.</li>
                  <li>Law enforcement if required by law or to protect rights and safety.</li>
                </ul>
                <p className="font-sans text-foreground leading-relaxed">We do not sell your personal information.</p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">4. Data Security</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  We use industry-standard encryption and secure servers to protect your data. However, no system is
                  completely secure, and we cannot guarantee absolute protection.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">5. Your Rights</h2>
                <p className="font-sans text-foreground leading-relaxed">Depending on your jurisdiction, you may:</p>
                <ul className="font-sans text-foreground leading-relaxed list-disc list-inside space-y-2 ml-4">
                  <li>Access, update, or delete your personal data.</li>
                  <li>Withdraw consent for certain processing.</li>
                  <li>Request a copy of your data.</li>
                </ul>
                <p className="font-sans text-foreground leading-relaxed">
                  Contact us at hello@flexirent.ng to exercise these rights.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">6. Data Retention</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  We retain information only as long as necessary for business purposes or as required by law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">7. Children's Privacy</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  Flexirent is not intended for users under 18. We do not knowingly collect information from minors.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">8. Changes to This Policy</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  We may update this Privacy Policy occasionally. Updates will be posted on this page with the "Last
                  updated" date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
