import { NextResponse } from "next/server"
import { studyDates } from "../../lib/data"

export async function POST() {

  const today = new Date().toDateString()

  if (!studyDates.includes(today)) {
    studyDates.push(today)
  }

  return NextResponse.json({ message: "Study recorded" })
}