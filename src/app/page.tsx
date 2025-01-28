"use client"

import { motion, AnimatePresence } from "framer-motion" // Add AnimatePresence
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { announcements, achievements } from "../data/data"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)
  const [mounted, setMounted] = useState(false) // Add mounted state

  useEffect(() => {
    setMounted(true) // Set mounted to true when component mounts
    
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Don't render until mounted
  if (!mounted) {
    return null // Or a loading skeleton
  }

  return (
    <div className="space-y-12">
      {/* Logo section remains the same */}
      <section className="text-center">
        <motion.h1
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-poppins"
        >
          SGC
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-600 dark:text-gray-300 font-poppins"
        >
          Students Guidance Cell
        </motion.p>
      </section>

      {/* Wrap announcement slider in AnimatePresence
      <div className="overflow-hidden py-4 bg-blue-100 dark:bg-blue-900 neo-brutalism-shadow">
        <AnimatePresence>
          <motion.div
            key="announcement-scroll"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
            className="whitespace-nowrap"
          >
            {announcements.map((announcement, index) => (
              <span key={index} className="inline-block mx-8 text-xl font-semibold text-blue-600 dark:text-blue-300">
                {announcement.title}: {announcement.content}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div> */}

      {/* Wrap important announcements in AnimatePresence */}
      <section className="neo-brutalism-white dark:neo-brutalism-dark p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 font-poppins text-black">Important Announcements</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncement}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-yellow-100 dark:bg-blue-400 p-4 rounded-md"
          >
            <h3 className="text-xl font-semibold mb-2 font-poppins">{announcements[currentAnnouncement].title}</h3>
            <p>{announcements[currentAnnouncement].content}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Add loading state for images */}
      <section className="neo-brutalism-white dark:neo-brutalism-dark p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 font-poppins text-black">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.heading}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <div className="relative w-full h-48">
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.heading}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3} // Prioritize loading first 3 images
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 mt-4 font-poppins">{achievement.heading}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{achievement.description}</p>
              <Link href={achievement.link} className="text-blue-600 dark:text-blue-400 hover:underline">
                Learn more
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Navigation section remains mostly the same */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
        {["About", "Team", "Events"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="neo-brutalism-white dark:neo-brutalism-dark p-6 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-2 font-poppins">{item}</h3>
            <p className="mb-4">Learn more about our {item.toLowerCase()}.</p>
            <Link 
              href={`/${item.toLowerCase()}`}
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <motion.span whileHover={{ x: 5 }} className="inline-flex items-center">
                Explore <ChevronRight className="ml-1" />
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}