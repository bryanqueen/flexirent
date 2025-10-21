import { type NextRequest, NextResponse } from "next/server"
import { validateSurveyData, formatSurveyDataForAirtable } from "@/lib/survey-utils"

// Airtable configuration
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Survey Responses"
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY

export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_BASE_ID || !AIRTABLE_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Airtable configuration missing. Please add AIRTABLE_BASE_ID and AIRTABLE_API_KEY environment variables.",
        },
        { status: 500 },
      )
    }

    const surveyData = await request.json()

    const validation = validateSurveyData(surveyData)
    if (!validation.isValid) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }

    // Transform survey data for Airtable
    const airtableRecord = formatSurveyDataForAirtable(surveyData)
    console.log(airtableRecord)

    // Send to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableRecord),
      },
    )

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text()
      console.error("Airtable API error:", errorData)
      return NextResponse.json({ error: "Failed to save to Airtable. Please try again." }, { status: 500 })
    }

    const result = await airtableResponse.json()

    return NextResponse.json({
      success: true,
      message: "Survey submitted successfully",
      recordId: result.id,
    })
  } catch (error) {
    console.error("Survey submission error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again." }, { status: 500 })
  }
}
