"use client"

import { motion } from "framer-motion"
import { events } from "../../data/data"

export default function Events() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg border-4 border-blue-600"
          >
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.name}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2 text-black">{event.name}</h2>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500 mb-4">Date: {event.date}</p>
            <a
              href={event.link}
              className="inline-block bg-yellow-400 text-blue-600 px-4 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

