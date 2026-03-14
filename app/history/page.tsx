"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function HistoryPage() {

  const [dates, setDates] = useState<string[]>([])

  const loadHistory = async () => {
    const res = await fetch("/api/history")
    const data = await res.json()
    setDates(data.history)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-12">

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
        📚 Study History
      </h1>

      {dates.length === 0 ? (
        <p className="text-white text-lg">No study history yet</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">

          {dates.map((date, index) => (
            <li
              key={index}
              className="bg-white p-5 rounded-xl shadow-lg text-center"
            >
              <span className="text-blue-600 font-semibold text-lg">
                {date}
              </span>
            </li>
          ))}

        </ul>
      )}

      <Link
        href="/"
        className="mt-10 bg-white text-purple-600 px-6 py-3 rounded-lg shadow hover:scale-105 transition"
      >
        ← Back to Dashboard
      </Link>

    </main>
  )
}