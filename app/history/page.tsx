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
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10">

      <h1 className="text-4xl font-bold text-white mb-8">
        📚 Study History
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 w-[400px]">

        {dates.length === 0 ? (
          <div className="text-center text-gray-500">
            📭 No study history yet
          </div>
        ) : (
          <ul className="space-y-4">
            {dates.map((date, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <span className="font-medium">{date}</span>
                <span className="text-green-500 font-semibold">✔ Studied</span>
              </li>
            ))}
          </ul>
        )}

      </div>

      <Link
        href="/"
        className="mt-6 bg-white text-purple-600 px-6 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        ← Back to Dashboard
      </Link>

    </main>
  )
}