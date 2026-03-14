"use client"

import { useEffect, useState } from "react"

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
      alert("Study recorded for today ✅")
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        📚 Daily Learning Streak Tracker
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">

        {/* Current Streak */}
        <div className="bg-white text-black p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">🔥 Current Streak</p>
          <h2 className="text-3xl font-bold">{data.streak}</h2>
          <p className="text-gray-400">days</p>
        </div>

        {/* Total Study Days */}
        <div className="bg-white text-black p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">📊 Total Study Days</p>
          <h2 className="text-3xl font-bold">{data.totalDays}</h2>
          <p className="text-gray-400">days</p>
        </div>

        {/* Last Studied */}
        <div className="bg-white text-black p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">📅 Last Studied</p>
          <h2 className="font-semibold text-lg">
            {data.lastStudied || "Not yet"}
          </h2>
        </div>

      </div>

      {/* Button */}
      <button
        onClick={markStudied}
        className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold shadow transition"
      >
        I Studied Today 🚀
      </button>

      {/* History Link */}
      <a
        href="/history"
        className="mt-6 underline text-lg hover:text-gray-200"
      >
        View Study History
      </a>

    </main>
  )
}