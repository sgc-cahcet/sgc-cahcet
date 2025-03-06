"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { ChevronRight, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { announcements, achievements } from "../data/data"
import Image from "next/image"
import Link from "next/link"
import BlogSection from "@/components/Blog-post"
import HeroSection from "@/components/HeroSection" // Import the new hero section component

interface Achievement {
  heading: string
  description: string
  image: string
  link: string
}

interface Announcement {
  title: string
  content: string
  link?: string 
}

const Home: React.FC = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const announcementTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    
    startAnnouncementTimer()
    
    return () => {
      if (announcementTimerRef.current) {
        clearInterval(announcementTimerRef.current)
      }
    }
  }, [])

  const startAnnouncementTimer = () => {
    if (announcementTimerRef.current) {
      clearInterval(announcementTimerRef.current)
    }
    
    announcementTimerRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
      }
    }, 6000)
  }

  const handleAnnouncementNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentAnnouncement((prev) => 
        prev === 0 ? announcements.length - 1 : prev - 1
      )
    } else {
      setCurrentAnnouncement((prev) => 
        (prev + 1) % announcements.length
      )
    }
    
    // Reset timer when manually navigating
    startAnnouncementTimer()
  }

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* New Hero Section Component */}
      <HeroSection />

      {/* Important Announcements Section */}
      <section className="p-8 rounded-2xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <h2 className="text-4xl font-bold mb-6 font-poppins text-black dark:text-white relative inline-block">
          Important Announcements
          <motion.div 
            className="absolute -bottom-2 left-0 h-2 bg-yellow-400 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>
        
        <div className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-yellow-100 dark:bg-blue-900 p-6 rounded-xl border-2 border-black dark:border-gray-600 min-h-[180px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-3 font-poppins">{announcements[currentAnnouncement].title}</h3>
                <p className="text-lg">{announcements[currentAnnouncement].content}</p>
              </div>
              
              {announcements[currentAnnouncement].link && (
                <Link 
                  href={announcements[currentAnnouncement].link} 
                  className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 font-medium text-lg hover:underline"
                >
                  Learn more <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation controls */}
          <div className="flex justify-between mt-4">
            <motion.button
              onClick={() => handleAnnouncementNavigation('prev')}
              className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-lg border-2 border-black dark:border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="h-6 w-6" />
            </motion.button>
            
            <div className="flex space-x-2">
              {announcements.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentAnnouncement(index)
                    startAnnouncementTimer()
                  }}
                  className={`h-3 w-3 rounded-full border border-black dark:border-white ${
                    currentAnnouncement === index 
                      ? 'bg-blue-500 dark:bg-purple-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
            
            <motion.button
              onClick={() => handleAnnouncementNavigation('next')}
              className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-lg border-2 border-black dark:border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="p-8 rounded-2xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <h2 className="text-4xl font-bold mb-8 font-poppins text-black dark:text-white relative inline-block">
          Our Achievements
          <motion.div 
            className="absolute -bottom-2 left-0 h-2 bg-green-400 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement: Achievement, index: number) => (
            <motion.div
              key={achievement.heading}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-black dark:border-gray-600 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transform transition-all duration-300"
            >
              <div className="relative w-full h-52 mb-4 overflow-hidden rounded-lg border-2 border-black dark:border-gray-600">
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.heading}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-3 font-poppins">{achievement.heading}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{achievement.description}</p>
              <Link 
                href={achievement.link} 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Learn more <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Section with neo-brutalist styling */}
      <section className="p-8 rounded-2xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <h2 className="text-4xl font-bold mb-8 font-poppins text-black dark:text-white relative inline-block">
          Latest Updates
          <motion.div 
            className="absolute -bottom-2 left-0 h-2 bg-pink-400 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>
        <BlogSection />
      </section>

      {/* Navigation Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { name: "About", icon: "🔍", color: "bg-blue-100 dark:bg-white" },
          { name: "Team", icon: "👥", color: "bg-green-100 dark:bg-white" },
          { name: "Events", icon: "🎉", color: "bg-purple-100 dark:bg-white" }
        ].map((item, index) => (
          <motion.div
            key={item.name}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={index}
            className={`${item.color} p-8 rounded-2xl border-4 border-black dark:border-gray-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transform transition-all duration-300`}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-3xl font-bold mb-3 font-poppins text-black">{item.name}</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-500 text-lg">Learn more about our {item.name.toLowerCase()}.</p>
            <Link 
              href={`/${item.name.toLowerCase()}`}
              className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black py-3 px-5 rounded-lg text-lg font-medium border-2 border-black shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] dark:shadow-[3px_3px_0px_0px_rgba(147,51,234,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              <motion.span whileHover={{ x: 5 }} className="inline-flex items-center">
                Explore {item.name} <ChevronRight className="ml-1" />
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Home;