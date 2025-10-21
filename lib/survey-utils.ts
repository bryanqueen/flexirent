// Validate only the fields for the current step
export function validateStepData(data: any, stepKey: string, role: string | null): SurveyValidation {
  const errors: FieldError[] = [];
  // Map stepKey to field name(s) for each role
  const stepFieldMap: Record<string, Record<string, string[]>> = {
    tenant: {
      location: ["tenantLocation"],
      frequency: ["rentFrequency"],
      amount: ["rentAmount"],
      pain: ["painLevel"],
      interest: ["tenantInterest"],
      contact: ["email", "whatsapp"],
      closing: [],
    },
    landlord: {
      location: ["landlordLocation"],
      units: ["unitsManaged"],
      rent: ["averageRent"],
      practice: ["currentPaymentPractice"],
      challenges: ["challenges"],
      interest: ["landlordInterest"],
      contact: ["email", "whatsapp"],
      closing: [],
    },
    both: {
      residence: ["bothResidenceLocation"],
      // property: ["bothPropertyLocation"],
      frequency: ["bothRentFrequency"],
      challenges: ["bothChallenges"],
      interest: ["bothInterest"],
      contact: ["email", "whatsapp"],
      closing: [],
    },
    other: {
      type: ["roleDescription"],
      location: ["businessLocation"],
      challenge: ["biggestChallenge"],
      interest: ["otherInterest"],
      contact: ["email", "whatsapp"],
      closing: [],
    },
  };

  // Special steps for all flows
  if (stepKey === "role") {
    if (!data.role) errors.push({ field: "role", message: "Role selection is required" });
    return { isValid: errors.length === 0, errors };
  }
  if (stepKey === "name") {
    if (!data.name) errors.push({ field: "name", message: "Name is required" });
    return { isValid: errors.length === 0, errors };
  }

  // Validate fields for the current step
  const roleKey = (role || "").toLowerCase();
  const stepFields = stepFieldMap[roleKey]?.[stepKey] || [];
  for (const field of stepFields) {
    // Use same logic as validateSurveyData for each field
    if (field === "email") {
      if (!data.email) errors.push({ field: "email", message: "Email is required" });
      else if (!validateEmail(data.email)) errors.push({ field: "email", message: "Please enter a valid email address" });
    } else if (field === "whatsapp") {
      if (!data.whatsapp) errors.push({ field: "whatsapp", message: "WhatsApp number is required" });
      else if (!validateWhatsApp(data.whatsapp)) errors.push({ field: "whatsapp", message: "Please enter a valid Nigerian phone number" });
    } else if (!data[field]) {
      // Generic required field
      errors.push({ field, message: "This field is required" });
    }
  }
  return { isValid: errors.length === 0, errors };
}
export interface FieldError {
  field?: string
  message: string
}

export interface SurveyValidation {
  isValid: boolean
  errors: FieldError[]
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateWhatsApp(phone: string): boolean {
  // Basic validation for Nigerian phone numbers
  const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/
  return phoneRegex.test(phone.replace(/\s+/g, ""))
}

export function validateSurveyData(data: any): SurveyValidation {
  const errors: FieldError[] = []

  // Required fields
  if (!data.role) {
    errors.push({ field: "role", message: "Role selection is required" })
  }

  if (!data.name) {
    errors.push({ field: "name", message: "Name is required" })
  }

  if (!data.email) {
    errors.push({ field: "email", message: "Email is required" })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" })
  }

  if (!data.whatsapp) {
    errors.push({ field: "whatsapp", message: "WhatsApp number is required" })
  } else if (!validateWhatsApp(data.whatsapp)) {
    errors.push({ field: "whatsapp", message: "Please enter a valid Nigerian phone number" })
  }

  // Role-specific validations
  if (data.role === "tenant") {
    if (!data.tenantLocation) errors.push({ field: "tenantLocation", message: "Location is required" })
    if (!data.rentFrequency) errors.push({ field: "rentFrequency", message: "Rent frequency is required" })
    if (!data.tenantInterest) errors.push({ field: "tenantInterest", message: "Interest level is required" })
  }

  if (data.role === "landlord") {
    if (!data.landlordLocation) errors.push({ field: "landlordLocation", message: "Property location is required" })
    if (!data.unitsManaged) errors.push({ field: "unitsManaged", message: "Number of units is required" })
    if (!data.landlordInterest) errors.push({ field: "landlordInterest", message: "Interest level is required" })
  }

  if (data.role === "both") {
    if (!data.bothResidenceLocation) errors.push({ field: "bothResidenceLocation", message: "Residence location is required" })
    
    if (!data.bothInterest) errors.push({ field: "bothInterest", message: "Interest level is required" })
  }

  if (data.role === "other") {
    if (!data.roleDescription) errors.push({ field: "roleDescription", message: "Role description is required" })
    if (!data.businessLocation) errors.push({ field: "businessLocation", message: "Business location is required" })
    if (!data.otherInterest) errors.push({ field: "otherInterest", message: "Interest level is required" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function formatSurveyDataForAirtable(data: any) {
  const formatSelectField = (value: any): string | null => {
    return value && typeof value === "string" && value.trim() !== "" ? value : null
  }

  // unified fields
  const role = (data.role || "").toLowerCase()
  let location = ""
  let challenge = ""
  let interest = ""
  let rentFrequency: string | null = null
  let rentAmount: number | null = null
  let painLevel: number | null = null

  // collect role-specific values
  if (role === "tenant") {
    location = data.tenantLocation || ""
    rentFrequency = data.rentFrequency ? data.rentFrequency : null
    rentAmount = parseMoneyToNumber(data.rentAmount)
    painLevel = typeof data.painLevel === "number" ? data.painLevel : (data.painLevel ? Number(data.painLevel) : null)
    interest = data.tenantInterest || ""
  } else if (role === "landlord") {
    location = data.landlordLocation || ""
    challenge = data.challenges || ""
    interest = data.landlordInterest || ""
    rentFrequency = data.currentPaymentPractice ? data.currentPaymentPractice : null
    rentAmount = parseMoneyToNumber(data.averageRent)
  } else if (role === "both") {
    location = data.bothResidenceLocation || ""
    challenge = data.bothChallenges || ""
    interest = data.bothInterest || ""
    rentFrequency = data.bothRentFrequency ? data.bothRentFrequency : null
  } else if (role === "other") {
    location = data.businessLocation || ""
    challenge = data.biggestChallenge || ""
    interest = data.otherInterest || ""
    rentFrequency = null
  }

  // build unified record
  const fields: Record<string, any> = {
    Name: data.name || "",
    Role: mapRoleToAirtable(role),
    Location: location,
    RentFrequency: rentFrequency,
    RentAmount: rentAmount,
      PainLevel: painLevel,
    Challenge: challenge,
    InterestLevel: interest,
    Email: data.email || "",
    WhatsApp: data.whatsapp || "",
  }

  return { fields }
}


// Map internal role values to Airtable's expected options
function mapRoleToAirtable(role: string | undefined | null): string {
  if (!role) return ""
  switch (role.toLowerCase()) {
    case "tenant": return "Tenant"
    case "landlord": return "Landlord"
    case "both": return "Both"
    case "other": return "Other"
    default: return role
  }
}

// Helper to parse string to number or null
function parseIntOrNull(value: string | undefined | null): number | null {
  if (!value || typeof value !== 'string') return null
  const n = parseInt(value.replace(/\D/g, ''), 10)
  return isNaN(n) ? null : n
}


export function formatMoney(value: string | undefined | null): string {
  if (!value || typeof value !== 'string') return ""
  const numericValue = value.replace(/\D/g, "")
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function parseMoney(value: string): string {
  return value.replace(/,/g, "")
}
// Helper to parse money string to number or null
function parseMoneyToNumber(value: string | undefined | null): number | null {
  if (!value || typeof value !== 'string') return null
  const numeric = value.replace(/,/g, '').replace(/\D/g, '')
  if (!numeric) return null
  return Number(numeric)
}