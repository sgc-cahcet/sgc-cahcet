"use client"

import { motion } from "framer-motion"
import { events } from "../../data/events_data"

interface Event {
  name: string
  description: string
  date: string
  image?: string
  link: string
}

const Events = () => {
  // Function to safely parse dates
  const parseDate = (dateString: string): Date | null => {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date
    }
    return null
  }

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString: string): string => {
    try {
      const date = parseDate(dateString)
      if (!date) return dateString
      
      return date.toISOString().split('T')[0]
    } catch (error) {
      console.error(`Error formatting date: ${dateString}`, error)
      return dateString
    }
  }

  // Sort events in reverse chronological order (newest first)
  const latestEvents = [...events].sort((a: Event, b: Event) => {
    try {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      
      if (!dateA || !dateB) return 0
      return dateB.getTime() - dateA.getTime()  // Changed the order here
    } catch (error) {
      console.error('Error sorting dates:', error)
      return 0
    }
  })

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {latestEvents.map((event: Event, index: number) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border-2 border-black dark:border-gray-700"
          >
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.name}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{event.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Date: {formatDate(event.date)}
            </p>
            <a
              href={event.link}
              className="inline-block bg-yellow-400 text-blue-600 dark:text-blue-800 px-4 py-2 rounded-md font-bold hover:bg-yellow-500 transition-colors"
            >
              Learn More
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Events;