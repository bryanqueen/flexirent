"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchableDropdown } from "@/components/searchable-dropdown"
import { CountryCodeSelector } from "@/components/country-code-selector"
import { formatMoney, parseMoney, validateStepData, validateWhatsApp } from "@/lib/survey-utils"
import Image from "next/image"

type UserRole = "tenant" | "landlord" | "both" | "other"

interface SurveyData {
  role: UserRole | null
  name?: string
  // Tenant fields
  tenantLocation?: string
  rentFrequency?: string
  rentAmount?: string
  painLevel?: number
  tenantInterest?: string
  // Landlord fields
  landlordLocation?: string
  unitsManaged?: string
  averageRent?: string
  currentPaymentPractice?: string
  challenges?: string
  landlordInterest?: string
  // Both fields
  bothResidenceLocation?: string
  bothPropertyLocation?: string
  bothRentFrequency?: string
  bothChallenges?: string
  bothInterest?: string
  // Other fields
  roleDescription?: string
  biggestChallenge?: string
  otherInterest?: string
  // Contact info (mandatory for all)
  email: string
  whatsapp: string
  countryCode?: string
}

function ErrorBanner({ errors, message, onDismiss }: { errors?: string[]; message?: string | null; onDismiss?: () => void }) {
  const items = errors && errors.length > 0 ? errors : message ? [message] : []
  if (!items || items.length === 0) return null

  return (
    <div className="border-l-4 border-red-500 bg-red-50 text-red-900 p-4 rounded-md">
      <div className="flex justify-between items-start">
        <div>
          <strong className="block">There {items.length > 1 ? "are" : "is"} problem{items.length > 1 ? "s" : ""} with your submission:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
            {items.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </div>
        <div>
          <button
            onClick={() => onDismiss && onDismiss()}
            aria-label="Dismiss error"
            className="ml-4 text-sm text-red-700 hover:text-red-900"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT (Abuja)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serverErrors, setServerErrors] = useState<string[] | null>(null)
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    role: null,
    email: "",
    whatsapp: "",
    countryCode: "+234",
  })

  const updateSurveyData = (field: keyof SurveyData, value: any) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

    // Step-level validation before advancing
    const handleContinue = (stepKey: string) => {
      setServerErrors(null)
      setServerErrorMessage(null)
      // Validate only the current step
      const role = surveyData.role
      const validation = validateStepData(surveyData, stepKey, role)
      if (!validation.isValid) {
        // Build field error map
        const fmap: Record<string, string> = {}
        for (const d of validation.errors) {
          if (d && d.field) fmap[d.field] = d.message || String(d.message || "Error")
        }
        setFieldErrors(fmap)
        return // block navigation
      }
      setFieldErrors(null)
      setCurrentStep((prev) => prev + 1)
    }

  const submitSurvey = async () => {
    setIsSubmitting(true)
    // clear previous server errors
    setServerErrors(null)
    setServerErrorMessage(null)

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            ...surveyData,
            whatsapp: surveyData.whatsapp
              ? `${surveyData.countryCode}${parseMoney(surveyData.whatsapp)}`
              : "",
          }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        // try to extract structured error details from the API
        let errorData: any
        try {
          errorData = await response.json()
        } catch (e) {
          // fallback to text
          const text = await response.text()
          setServerErrorMessage(text || "Failed to submit survey")
          return
        }

        // If the API returned validation details, show them explicitly
        if (errorData && Array.isArray(errorData.details) && errorData.details.length > 0) {
          // details are expected to be array of { field?, message }
          const details: any[] = errorData.details
          const messages = details.map((d) => (d && d.message ? String(d.message) : String(d)))
          setServerErrors(messages)

          // Build field error map and focus the first errored step if possible
          const fmap: Record<string, string> = {}
          for (const d of details) {
            if (d && d.field) fmap[d.field] = d.message || String(d.message || "Error")
          }
          if (Object.keys(fmap).length > 0) {
            setFieldErrors(fmap)
            // determine step index from field
            const firstField = Object.keys(fmap)[0]
            const stepIndex = mapFieldToStepIndex(firstField, surveyData.role)
            if (stepIndex !== null) setCurrentStep(stepIndex)
          }
        } else if (errorData && errorData.error) {
          setServerErrorMessage(String(errorData.error))
        } else {
          setServerErrorMessage("Failed to submit survey. Please try again.")
        }
      }
    } catch (error) {
      console.error("Survey submission error:", error)
      setServerErrorMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 grain-effect opacity-20"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="bg-card backdrop-blur-sm border-border/50 max-w-2xl w-full">
            <CardContent className="p-12 text-center space-y-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
              </motion.div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl font-bold text-foreground">Survey Submitted Successfully!</h1>
                <p className="font-sans text-xl text-muted-foreground leading-relaxed">
                  Thank you for your input. We'll be in touch soon with updates on
                  Flexirent's launch.
                </p>
              </div>

              <Button onClick={() => (window.location.href = "/about")} size="lg" className="px-12 py-6 text-lg font-medium">
                Learn more
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onNext={nextStep} />
      case 1:
        return (
          <RoleSelection surveyData={surveyData} updateData={updateSurveyData} onNext={nextStep} onPrev={prevStep} />
        )
      case 2:
        return <NameStep surveyData={surveyData} updateData={updateSurveyData} onNext={nextStep} onPrev={prevStep} />
      default:
        return renderFlowSteps()
    }
  }

  const renderFlowSteps = () => {
    const { role } = surveyData

    if (role === "tenant") {
      return renderTenantFlow()
    } else if (role === "landlord") {
      return renderLandlordFlow()
    } else if (role === "both") {
      return renderBothFlow()
    } else if (role === "other") {
      return renderOtherFlow()
    }

    return null
  }

  const renderTenantFlow = () => {
    const tenantSteps = [
      { key: "location", title: "Where do you currently rent?", type: "location" },
      {
        key: "frequency",
        title: "How do you currently pay rent?",
        type: "radio",
        options: ["Yearly", "Every 6 months", "Monthly", "Other"],
      },
      { key: "amount", title: "Approximate yearly rent for your current home (₦)?", type: "money" },
      { key: "pain", title: "In a scale of 1-5, how financially stressful is it for you to renew your rent?", type: "scale" },
      {
        key: "interest",
        title:
          "Would you consider using a service that lets you effectively split your rent on a monthly basis to ease of the burden of lump sum payments when it's time for renewal?",
        type: "radio",
        options: ["Definitely", "Maybe", "Not interested"],
      },
      { key: "contact", title: "Contact Information", type: "contact" },
      { key: "closing", title: "Thank You!", type: "closing" },
    ]

    const stepIndex = currentStep - 3
    const step = tenantSteps[stepIndex]

    if (!step) return null

    return (
      <StepRenderer
        step={step}
        stepIndex={stepIndex}
        totalSteps={tenantSteps.length}
        surveyData={surveyData}
        updateData={updateSurveyData}
        fieldErrors={fieldErrors}
  onNext={stepIndex === tenantSteps.length - 1 ? submitSurvey : () => handleContinue(step.key)}
        onPrev={prevStep}
        isLastStep={stepIndex === tenantSteps.length - 1}
        isSubmitting={isSubmitting}
      />
    )
  }

  const renderLandlordFlow = () => {
    const landlordSteps = [
      { key: "location", title: "Where is your rental property located?", type: "location" },
      { key: "units", title: "How many units do you manage?", type: "number" },
      { key: "rent", title: "Average yearly rent per unit (₦)?", type: "money" },
      {
        key: "practice",
        title: "How do your tenants typically pay rent?",
        type: "radio",
        options: ["Yearly", "6-month installments", "Monthly", "Other"],
      },
      {
        key: "challenges",
        title: "What is your biggest challenge with rent collection?",
        type: "radio",
        options: ["Late rent Payment", "Tenant default", "Tracking multiple", "Paperwork & reminders", "Other"],
      },
      {
        key: "interest",
        title: "Would you consider a service that collects monthly rent for you just to make sure that you are paid on time when it's time for your tenants to renew their rent?",
        type: "radio",
        options: ["Definitely", "Maybe", "Not interested"],
      },
      { key: "contact", title: "Contact Information", type: "contact" },
      { key: "closing", title: "Thank You!", type: "closing" },
    ]

    const stepIndex = currentStep - 3
    const step = landlordSteps[stepIndex]

    if (!step) return null


    return (
      <StepRenderer
        step={step}
        stepIndex={stepIndex}
        totalSteps={landlordSteps.length}
        surveyData={surveyData}
        updateData={updateSurveyData}
        fieldErrors={fieldErrors}
  onNext={stepIndex === landlordSteps.length - 1 ? submitSurvey : () => handleContinue(step.key)}
        onPrev={prevStep}
        isLastStep={stepIndex === landlordSteps.length - 1}
        isSubmitting={isSubmitting}
      />
    )
  }

  const renderBothFlow = () => {
    const bothSteps = [
      { key: "residence", title: "Where do you currently receive or pay rent?", type: "location" },
      // { key: "property", title: "Where is your rental property located?", type: "location" },
      {
        key: "frequency",
        title: "How do you pay or receive your rent?",
        type: "radio",
        options: ["Yearly", "6 months", "Monthly", "Other"],
      },
      {
        key: "challenges",
        title: "What's your biggest rent-related challenge in both roles?",
        type: "radio",
        options: [
          "Balancing payment schedules",
          "Cash flow planning",
          "Tenant maintenance",
          "Property maintenance",
          "Other",
        ],
      },
      {
        key: "interest",
        title: "Do you think you would be interested in a rent-splitting or monthly rent payment system for Nigeria's rental market?",
        type: "radio",
        options: ["Definitely", "Maybe", "Not interested"],
      },
      { key: "contact", title: "Contact Information", type: "contact" },
      { key: "closing", title: "Thank You!", type: "closing" },
    ]

    const stepIndex = currentStep - 3
    const step = bothSteps[stepIndex]

    if (!step) return null

    if (!step) return null

    return (
      <StepRenderer
        step={step}
        stepIndex={stepIndex}
        totalSteps={bothSteps.length}
        surveyData={surveyData}
        updateData={updateSurveyData}
        fieldErrors={fieldErrors}
  onNext={stepIndex === bothSteps.length - 1 ? submitSurvey : () => handleContinue(step.key)}
        onPrev={prevStep}
        isLastStep={stepIndex === bothSteps.length - 1}
        isSubmitting={isSubmitting}
      />
    )
  }

  const renderOtherFlow = () => {
    const otherSteps = [
      {
        key: "type",
        title: "Which best describes your role?",
        type: "radio",
        options: ["Agent", "Property manager", "Developer", "Real estate investor", "Other"],
      },
      { key: "location", title: "Where does your realty business operate?", type: "location" },
      {
        key: "challenge",
        title: "What's your main challenge in Nigeria's rental market?",
        type: "radio",
        options: [
          "Tenant defaults",
          "Lack of financing options",
          "Finding reliable tenants",
          "Legal processes",
          "Other",
        ],
      },
      {
        key: "interest",
        title: "Do you think you would be interested in a rent-splitting or monthly rent payment system for Nigeria's rental market?",
        type: "radio",
        options: ["Definitely", "Maybe", "Not interested"],
      },
      { key: "contact", title: "Contact Information", type: "contact" },
      { key: "closing", title: "Thank You!", type: "closing" },
    ]

    const stepIndex = currentStep - 3
    const step = otherSteps[stepIndex]

    if (!step) return null


    if (!step) return null

    return (
      <StepRenderer
        step={step}
        stepIndex={stepIndex}
        totalSteps={otherSteps.length}
        surveyData={surveyData}
        updateData={updateSurveyData}
        fieldErrors={fieldErrors}
  onNext={stepIndex === otherSteps.length - 1 ? submitSurvey : () => handleContinue(step.key)}
        onPrev={prevStep}
        isLastStep={stepIndex === otherSteps.length - 1}
        isSubmitting={isSubmitting}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 grain-effect opacity-20"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Show server validation errors or a generic server error above each step */}
              <div className="mb-4">
                {serverErrors && serverErrors.length > 0 && (
                  <ErrorBanner errors={serverErrors} onDismiss={() => setServerErrors(null)} />
                )}

                {serverErrorMessage && (
                  <ErrorBanner message={serverErrorMessage} onDismiss={() => setServerErrorMessage(null)} />
                )}
              </div>

              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Map a validation field name to the absolute step index in the multi-step flow
function mapFieldToStepIndex(field: string, role: UserRole | null): number | null {
  // Steps layout: 0 = welcome, 1 = role selection, 2 = name, then role-specific flows start at 3
  const base = 3

  const tenantOrder = [
    "tenantLocation",
    "rentFrequency",
    "rentAmount",
    "painLevel",
    "tenantInterest",
    "email",
    "whatsapp",
  ]

  const landlordOrder = [
    "landlordLocation",
    "unitsManaged",
    "averageRent",
    "currentPaymentPractice",
    "challenges",
    "landlordInterest",
    "email",
    "whatsapp",
  ]

  const bothOrder = [
    "bothResidenceLocation",
    "bothPropertyLocation",
    "bothRentFrequency",
    "bothChallenges",
    "bothInterest",
    "email",
    "whatsapp",
  ]

  const otherOrder = ["roleDescription", "biggestChallenge", "otherInterest", "email", "whatsapp"]

  const idxOf = (arr: string[]) => {
    const idx = arr.indexOf(field)
    return idx === -1 ? null : base + idx
  }

  if (field === "name") return 2
  if (field === "role") return 1
  if (field === "email" || field === "whatsapp") {
    // contact step is the last step in each flow, so map to the contact step index
    // we map to base + last index of flow
  }

  if (role === "tenant") return idxOf(tenantOrder)
  if (role === "landlord") return idxOf(landlordOrder)
  if (role === "both") return idxOf(bothOrder)
  if (role === "other") return idxOf(otherOrder)

  return null
}

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <Card className="noise-bg backdrop-blur-sm border-border/50">
      <CardContent className="p-12 text-center space-y-8">
        <div className="flex justify-center">
        <Image src="/logo.png" width={120}height={40} alt="Flexirent's Logo" className="h-8 md:h-10 w-auto"/>
        </div>

        <div className="space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Take this quick survey
          </h1>
          <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Answer a few quick questions (2–3 min). Your feedback will be valuable in helping us to better serve you.
          </p>
        </div>

        <Button onClick={onNext} size="lg" className="px-12 py-6 text-lg font-medium">
          Start Survey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}

function RoleSelection({
  surveyData,
  updateData,
  onNext,
  onPrev,
}: {
  surveyData: SurveyData
  updateData: (field: keyof SurveyData, value: any) => void
  onNext: () => void
  onPrev: () => void
}) {
  const roles = [
    { value: "tenant", label: "Tenant", description: "I rent a property" },
    { value: "landlord", label: "Landlord / Property Owner", description: "I own rental properties" },
    { value: "both", label: "Both Tenant & Landlord", description: "I rent and own properties" },
    { value: "other", label: "Other", description: "Property manager, agent, etc." },
  ]

  return (
    <Card className="bg-card backdrop-blur-sm border-border/50">
      <CardContent className="p-12 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl font-bold text-foreground">Which best describes you?</h2>
        </div>

        <div className="grid gap-4">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => updateData("role", role.value as UserRole)}
              className={`p-6 rounded-lg border-2 transition-all text-left hover:border-primary/50 ${
                surveyData.role === role.value ? "border-primary bg-primary/5" : "border-border bg-card/50"
              }`}
            >
              <div className="font-medium text-foreground">{role.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{role.description}</div>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!surveyData.role}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function NameStep({
  surveyData,
  updateData,
  onNext,
  onPrev,
}: {
  surveyData: SurveyData
  updateData: (field: keyof SurveyData, value: any) => void
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <Card className="bg-card backdrop-blur-sm border-border/50">
      <CardContent className="p-12 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl font-bold text-foreground">What's your name?</h2>
          <p className="text-muted-foreground">We'd love to know who we're talking to</p>
        </div>

        <div>
          <Input
            type="text"
            value={surveyData.name || ""}
            onChange={(e) => updateData("name", e.target.value)}
            placeholder="Enter your first name"
            className="text-lg py-6 border border-black"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={onNext} disabled={!surveyData.name}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


function StepRenderer({
  step,
  stepIndex,
  totalSteps,
  surveyData,
  updateData,
  fieldErrors,
  onNext,
  onPrev,
  isLastStep,
  isSubmitting,
}: any) {
  const getFieldKey = () => {
    const { role } = surveyData
    const baseKey = step.key

    if (role === "tenant") {
      const mapping: Record<string, string> = {
        location: "tenantLocation",
        frequency: "rentFrequency",
        amount: "rentAmount",
        pain: "painLevel",
        interest: "tenantInterest",
      }
      return mapping[baseKey] || baseKey
    } else if (role === "landlord") {
      const mapping: Record<string, string> = {
        location: "landlordLocation",
        units: "unitsManaged",
        rent: "averageRent",
        practice: "currentPaymentPractice",
        challenges: "challenges",
        interest: "landlordInterest",
      }
      return mapping[baseKey] || baseKey
    } else if (role === "both") {
      const mapping: Record<string, string> = {
        residence: "bothResidenceLocation",
        property: "bothPropertyLocation",
        frequency: "bothRentFrequency",
        challenges: "bothChallenges",
        interest: "bothInterest",
      }
      return mapping[baseKey] || baseKey
    } else if (role === "other") {
      const mapping: Record<string, string> = {
        description: "roleDescription",
        location: "businessLocation",
        challenge: "biggestChallenge",
        interest: "otherInterest",
      }
      return mapping[baseKey] || baseKey
    }

    return baseKey
  }

  const fieldKey = getFieldKey()
  const currentValue = (surveyData as any)[fieldKey]
  const inlineError = fieldErrors && fieldErrors[fieldKey]

  if (step.type === "closing") {
    return (
      <Card className="bg-card backdrop-blur-sm border-border/50">
        <CardContent className="p-12 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl font-bold text-foreground">Thanks for sharing your experience!</h2>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your input helps bring monthly rent to Nigeria. We'll keep you updated on launch and early access.
            </p>
          </div>

          <Button onClick={onNext} size="lg" className="px-12 py-6 text-lg font-medium" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit & Finish"
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (step.type === "contact") {
    return (
      <Card className="bg-card backdrop-blur-sm border-border/50">
        <CardContent className="p-12 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl font-bold text-foreground">Contact Information</h2>
            <p className="text-muted-foreground">We'll use this to keep you updated on our launch</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
              <Input
                type="email"
                value={surveyData.email}
                onChange={(e) => updateData("email", e.target.value)}
                placeholder="your@email.com"
                className="text-lg py-6 border border-black"
              />
                {fieldErrors && fieldErrors.email && (
                  <p className="text-sm text-red-700 mt-2">{fieldErrors.email}</p>
                )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
              <CountryCodeSelector
                countryCode={surveyData.countryCode || "+234"}
                phoneNumber={surveyData.whatsapp}
                onCountryCodeChange={(code) => updateData("countryCode", code)}
                onPhoneNumberChange={(number) => updateData("whatsapp", number)}
              />
                {fieldErrors && fieldErrors.whatsapp && (
                  <p className="text-sm text-red-700 mt-2">{fieldErrors.whatsapp}</p>
                )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={onNext} 
              disabled={!surveyData.email || (surveyData.whatsapp && !validateWhatsApp(surveyData.whatsapp))}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Step {stepIndex + 1} of {totalSteps}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card backdrop-blur-sm border-border/50">
      <CardContent className="p-12 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-3xl font-bold text-foreground">{step.title}</h2>
        </div>

        <div className="space-y-6">
          {step.type === "location" && (
            <>
              <SearchableDropdown
                options={NIGERIAN_STATES}
                value={currentValue || ""}
                onChange={(value) => updateData(fieldKey, value)}
                placeholder="Search for a state..."
              />
              {inlineError && <p className="text-sm text-red-700 mt-2">{inlineError}</p>}
            </>
          )}

          {step.type === "text" && (
            <>
              <Input
                value={currentValue || ""}
                onChange={(e) => updateData(fieldKey, e.target.value)}
                placeholder="Enter your answer..."
                className="text-lg p-4"
              />
              {inlineError && <p className="text-sm text-red-700 mt-2">{inlineError}</p>}
            </>
          )}

          {step.type === "number" && (
            <>
              <Input
                type="number"
                value={currentValue || ""}
                onChange={(e) => updateData(fieldKey, e.target.value)}
                placeholder="Enter amount..."
                className="text-lg py-6 border border-black"
              />
              {inlineError && <p className="text-sm text-red-700 mt-2">{inlineError}</p>}
            </>
          )}

          {step.type === "money" && (
            <>
              <Input
                type="text"
                value={formatMoney(currentValue || "")}
                onChange={(e) => updateData(fieldKey, parseMoney(e.target.value))}
                placeholder="Enter amount..."
                className="text-lg py-6 border border-black"
              />
              {inlineError && <p className="text-sm text-red-700 mt-2">{inlineError}</p>}
            </>
          )}

          {step.type === "textarea" && (
            <>
              <Textarea
                value={currentValue || ""}
                onChange={(e) => updateData(fieldKey, e.target.value)}
                placeholder="Enter your answer..."
                className="text-lg p-4 min-h-32"
              />
              {inlineError && <p className="text-sm text-red-700 mt-2">{inlineError}</p>}
            </>
          )}

          {step.type === "radio" && (
            <div className="grid gap-3">
              {step.options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => {
                    // Special case: 'type' step in 'other' flow should update roleDescription
                    if (step.key === 'type' && surveyData.role === 'other') {
                      updateData('roleDescription', option)
                    } else {
                      updateData(fieldKey, option)
                    }
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    (step.key === 'type' && surveyData.role === 'other'
                      ? surveyData.roleDescription === option
                      : currentValue === option)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card/50 hover:border-primary/50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {step.type === "scale" && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Not stressful</span>
                <span>Extremely stressful</span>
              </div>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => updateData(fieldKey, num)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      currentValue === num
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={
              // Special case: 'type' step in 'other' flow should check roleDescription
              step.key === 'type' && surveyData.role === 'other'
                ? !surveyData.roleDescription
                : !currentValue
            }
          >
            {isLastStep ? "Submit" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Step {stepIndex + 1} of {totalSteps}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
