import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
              <p className="font-sans text-muted-foreground text-lg">Last updated: January 2025</p>
            </div>

            <div className="bg-card/50 grain-bg rounded-2xl p-8 md:p-12 space-y-8">
              <div className="space-y-4">
                <p className="font-sans text-foreground leading-relaxed">
                  These Terms of Service ("Terms") govern your use of Flexirent's website, applications, and services
                  ("Service"). By accessing or using the Service, you agree to these Terms.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">1. Eligibility</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  You must be at least 18 years old and legally able to enter into binding contracts to use Flexirent.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">2. Services Provided</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  Flexirent enables tenants to pay rent in monthly installments while landlords receive payments
                  according to agreed schedules. Flexirent is not a lender and does not provide credit facilities.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
                <p className="font-sans text-foreground leading-relaxed">You agree to:</p>
                <ul className="font-sans text-foreground leading-relaxed list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current information during registration.</li>
                  <li>Maintain the security of your account credentials.</li>
                  <li>Pay all applicable fees or charges in a timely manner.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">4. Landlord/Tenant Agreements</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  Flexirent facilitates payments but is not a party to rental agreements. Any disputes regarding
                  tenancy, property condition, or lease terms are solely between tenant and landlord.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">5. Fees</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  Flexirent may charge a service fee disclosed during onboarding. We reserve the right to update fees
                  with reasonable notice.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">6. Prohibited Activities</h2>
                <p className="font-sans text-foreground leading-relaxed">You may not:</p>
                <ul className="font-sans text-foreground leading-relaxed list-disc list-inside space-y-2 ml-4">
                  <li>Use the Service for fraudulent, illegal, or abusive purposes.</li>
                  <li>Interfere with platform security or attempt unauthorized access.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">7. Termination</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  We may suspend or terminate accounts that violate these Terms or applicable laws. Users may close
                  their accounts at any time.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  Flexirent is not liable for indirect, incidental, or consequential damages arising from use of the
                  Service, to the maximum extent permitted by law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">9. Governing Law</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  These Terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict of
                  law principles.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-foreground">10. Contact</h2>
                <p className="font-sans text-foreground leading-relaxed">
                  Questions about these Terms may be sent to hello@flexirent.ng.
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
