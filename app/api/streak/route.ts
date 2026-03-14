import { NextResponse } from "next/server"
import { studyDates } from "../../lib/data"

export async function GET() {

  const totalDays = studyDates.length
  const lastStudied = studyDates[studyDates.length - 1] || ""

  return NextResponse.json({
    streak: totalDays,
    totalDays: totalDays,
    lastStudied: lastStudied
  })
}