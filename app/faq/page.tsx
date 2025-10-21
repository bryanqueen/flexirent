import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. Whether you're a tenant curious about monthly payments or a landlord
              wondering how payouts work, this quick FAQ covers the essentials.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-lg border border-border">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-b border-border pb-4">
                <AccordionTrigger className="font-serif text-xl font-semibold text-foreground hover:text-primary text-left">
                  How does Flexirent work?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-lg text-muted-foreground leading-relaxed pt-4">
                  Tenants sign up, connect a payment method, and choose a monthly plan. Flexirent securely collects
                  monthly payments and passes rent to the landlord on the agreed schedule.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border pb-4">
                <AccordionTrigger className="font-serif text-xl font-semibold text-foreground hover:text-primary text-left">
                  Do you give loans to tenants?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-lg text-muted-foreground leading-relaxed pt-4">
                  No. Flexirent is not a lending service. We simply provide a safe system for monthly rent collection
                  and timely landlord payouts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-border pb-4">
                <AccordionTrigger className="font-serif text-xl font-semibold text-foreground hover:text-primary text-left">
                  How do landlords get their money if tenants pay monthly?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-lg text-muted-foreground leading-relaxed pt-4">
                  Landlords can choose to receive rent monthly or as a single upfront payment funded from tenant
                  installments already collected.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-border pb-4">
                <AccordionTrigger className="font-serif text-xl font-semibold text-foreground hover:text-primary text-left">
                  What happens if a tenant misses a payment?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-lg text-muted-foreground leading-relaxed pt-4">
                  Flexirent automatically issues reminders and offers a brief grace period. Persistent missed payments
                  trigger the terms of the rental agreement between tenant and landlord.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-border pb-4">
                <AccordionTrigger className="font-serif text-xl font-semibold text-foreground hover:text-primary text-left">
                  Is my money safe?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-lg text-muted-foreground leading-relaxed pt-4">
                  Yes. All payments are handled through regulated payment partners and held in secure escrow accounts
                  until disbursed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="pb-4">
                <AccordionTrigger className="font-serif text-xl font-semibold text-foreground hover:text-primary text-left">
                  What does it cost?
                </AccordionTrigger>
                <AccordionContent className="font-sans text-lg text-muted-foreground leading-relaxed pt-4">
                  Flexirent charges a small service fee (typically a percentage of the rent) which can be shared between
                  tenant and landlord or covered by one party—details are agreed during onboarding.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="noise-bg rounded-3xl p-12 border border-border">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Still have questions?</h2>
              <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're here to help. Get in touch with our team for personalized answers.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-lg px-8 py-3 rounded-xl transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
