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
    await fetch("/api/study", {
      method: "POST"
    })

    loadData()
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">

      <h1 className="text-4xl font-bold mb-10">
        Daily Learning Streak Tracker
      </h1>

      <div className="flex gap-6 mb-8">

        <div className="bg-white text-black p-6 rounded-lg shadow w-52 text-center">
          <p className="text-gray-500">Current Streak</p>
          <h2 className="text-3xl font-bold">{data.streak}</h2>
          <p className="text-gray-400">days</p>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow w-52 text-center">
          <p className="text-gray-500">Total Study Days</p>
          <h2 className="text-3xl font-bold">{data.totalDays}</h2>
          <p className="text-gray-400">days</p>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow w-52 text-center">
          <p className="text-gray-500">Last Studied</p>
          <h2 className="font-semibold">
            {data.lastStudied || "Not yet"}
          </h2>
        </div>

      </div>

      <button
        onClick={markStudied}
        className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold shadow"
      >
        I Studied Today
      </button>

      <a
        href="/history"
        className="mt-6 underline text-lg"
      >
        View Study History
      </a>

    </main>
  )
}