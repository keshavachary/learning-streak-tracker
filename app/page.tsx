"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {

  const [data, setData] = useState({
    streak: 0,
    totalDays: 0,
    lastStudied: ""
  })

  const loadData = async () => {
    const res = await fetch("/api/streak")
    const result = await res.json()
    setData(result)
  }

  useEffect(() => {
    loadData()
  }, [])

  const markStudied = async () => {
    const res = await fetch("/api/study", {
      method: "POST"
    })

    if (res.ok) {
      await loadData()
      window.location.href = "/history"
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-6 py-12">

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
        📚 Daily Learning Streak Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">

        <div className="bg-white text-black p-8 rounded-xl shadow-xl text-center">
          <p className="text-gray-500 text-lg">🔥 Current Streak</p>
          <h2 className="text-4xl font-bold">{data.streak}</h2>
          <p className="text-gray-400">days</p>
        </div>

        <div className="bg-white text-black p-8 rounded-xl shadow-xl text-center">
          <p className="text-gray-500 text-lg">📊 Total Study Days</p>
          <h2 className="text-4xl font-bold">{data.totalDays}</h2>
          <p className="text-gray-400">days</p>
        </div>

        <div className="bg-white text-black p-8 rounded-xl shadow-xl text-center">
          <p className="text-gray-500 text-lg">📅 Last Studied</p>
          <h2 className="text-xl font-semibold">
            {data.lastStudied || "Not yet"}
          </h2>
        </div>

      </div>

      <button
        onClick={markStudied}
        className="mt-12 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg transition"
      >
        I Studied Today 🚀
      </button>

      <Link
        href="/history"
        className="mt-6 underline text-lg hover:text-gray-200"
      >
        View Study History
      </Link>

    </main>
  )
}