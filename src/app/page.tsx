"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { announcements, achievements } from "../data/data"
import Image from "next/image"
import Link from "next/link"

interface Achievement {
  heading: string
  description: string
  image: string
  link: string
}

interface Announcement {
  title: string
  content: string
}

const Home: React.FC = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const letterVariants = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    })
  }

  const logoVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: 1,
      rotate: 360,
      transition: {
        duration: 1.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 370,
      transition: {
        duration: 0.3
      }
    }
  }

  const words = "Students Guidance Cell".split(" ")

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rounded-full bg-blue-200 dark:bg-blue-700 mix-blend-multiply dark:mix-blend-color-dodge opacity-20"
              initial={{ x: -100, y: -100 }}
              animate={{
                x: [Math.random() * 1000, Math.random() * 1000],
                y: [Math.random() * 500, Math.random() * 500],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Animated Logo */}
          <motion.div
            className="mb-8 relative"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <div className="relative w-48 h-48 mx-auto">
              <Image
                src="/logo.png"
                alt="SGC Logo"
                fill
                className="object-contain"
                priority
              />
              <motion.div
                className="absolute inset-0 border-4 border-blue-500 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 font-poppins tracking-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: "spring"
            }}
          >
            SGC
          </motion.h1>

          {/* Animated Subtitle */}
          <div className="flex justify-center gap-2 flex-wrap">
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="flex overflow-hidden">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    custom={wordIndex + letterIndex * 0.1}
                    className="text-3xl text-gray-700 dark:text-gray-200 font-poppins inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Announcements Section */}
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

      {/* Achievements Section */}
      <section className="neo-brutalism-white dark:neo-brutalism-dark p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 font-poppins text-black">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement: Achievement, index: number) => (
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
                  priority={index < 3}
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

      {/* Navigation Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {["About", "Team", "Events"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="neo-brutalism-white dark:neo-brutalism-dark p-6 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-2 font-poppins text-black">{item}</h3>
            <p className="mb-4 text-gray-600">Learn more about our {item.toLowerCase()}.</p>
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

export default Home;