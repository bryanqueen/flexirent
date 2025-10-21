"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" },
//   { code: "+1", country: "USA/Canada" },
//   { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+27", country: "South Africa" },
  { code: "+254", country: "Kenya" },
  { code: "+256", country: "Uganda" },
  { code: "+233", country: "Ghana" },
  { code: "+212", country: "Morocco" },
  { code: "+20", country: "Egypt" },
]

interface CountryCodeSelectorProps {
  countryCode: string
  phoneNumber: string
  onCountryCodeChange: (code: string) => void
  onPhoneNumberChange: (number: string) => void
}

export function CountryCodeSelector({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex gap-2">
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-11 px-3 py-2 border border-black rounded-md bg-transparent text-foreground hover:bg-accent/5 transition-colors flex items-center justify-between text-lg"
        >
          <span className="font-medium">{countryCode}</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute w-36 left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {COUNTRY_CODES.map(({ code, country }) => (
              <button
                key={code}
                onClick={() => {
                  onCountryCodeChange(code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors text-sm ${
                  countryCode === code ? "bg-primary/20 font-medium" : ""
                }`}
              >
                <span className="font-medium">{code}</span> {country}
              </button>
            ))}
          </div>
        )}
      </div>

      <Input
        type="tel"
        value={phoneNumber}
        onChange={(e) => onPhoneNumberChange(e.target.value.replace(/\D/g, ""))}
        placeholder="123 456 7890"
        className="text-lg w-full py-5 px-3 border border-black"
      />
    </div>
  )
}
