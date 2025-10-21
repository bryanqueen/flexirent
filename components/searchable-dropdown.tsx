"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"

interface SearchableDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchableDropdown({ options, value, onChange, placeholder = "Search..." }: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

  // Keep internal search term in sync with the selected value from parent.
  // This ensures the input shows the selected value when closed, and
  // allows immediate typing to be visible because the input is always controlled.
  useEffect(() => {
    setSearchTerm(value || "")
  }, [value])

  // Focus the input when the dropdown is first rendered so immediate typing works
  useEffect(() => {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
    // only on mount
  }, [])

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
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="text-lg p-4 pr-10 cursor-text"
        />
        <ChevronDown
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
            // If opening via chevron, focus input so users can type immediately.
            if (!isOpen) {
              setTimeout(() => inputRef.current?.focus(), 0)
            }
          }}
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                  setSearchTerm("")
                }}
                className={`w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors ${
                  value === option ? "bg-primary/20 font-medium" : ""
                }`}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-muted-foreground text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
