"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { ChevronRight, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { announcements, achievements } from "../data/data"
import Image from "next/image"
import Link from "next/link"
import BlogSection from "@/components/Blog-post"
import HeroSection from "@/components/HeroSection"

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
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState<number>(0)
  const announcementTimerRef = useRef<NodeJS.Timeout | null>(null)
  const achievementTimerRef = useRef<NodeJS.Timeout | null>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    startAnnouncementTimer()
    startAchievementTimer()
    
    return () => {
      if (announcementTimerRef.current) {
        clearInterval(announcementTimerRef.current)
      }
      if (achievementTimerRef.current) {
        clearInterval(achievementTimerRef.current)
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

  const startAchievementTimer = () => {
    if (achievementTimerRef.current) {
      clearInterval(achievementTimerRef.current)
    }
    
    achievementTimerRef.current = setInterval(() => {
      if (!isHovering && window.innerWidth < 768) {
        setCurrentAchievementIndex((prev) => {
          const nextIndex = (prev + 1) % achievements.length
          scrollToAchievement(nextIndex)
          return nextIndex
        })
      }
    }, 5000)
  }

  const scrollToAchievement = (index: number) => {
    if (achievementsRef.current && window.innerWidth < 768) {
      const scrollPosition = index * (achievementsRef.current.scrollWidth / achievements.length)
      achievementsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
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

  const handleAchievementNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentAchievementIndex((prev) => {
        const newIndex = prev === 0 ? achievements.length - 1 : prev - 1
        scrollToAchievement(newIndex)
        return newIndex
      })
    } else {
      setCurrentAchievementIndex((prev) => {
        const newIndex = (prev + 1) % achievements.length
        scrollToAchievement(newIndex)
        return newIndex
      })
    }
    
    // Reset timer when manually navigating
    startAchievementTimer()
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
    <div className="space-y-8 md:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* New Hero Section Component */}
      <HeroSection />

      {/* Important Announcements Section */}
      <section className="p-4 md:p-8 rounded-2xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-poppins text-black dark:text-white relative inline-block">
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
              className="bg-yellow-100 dark:bg-blue-900 p-4 md:p-6 rounded-xl border-2 border-black dark:border-gray-600 min-h-[160px] md:min-h-[180px] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 font-poppins">{announcements[currentAnnouncement].title}</h3>
                <p className="text-base md:text-lg line-clamp-4 md:line-clamp-none">{announcements[currentAnnouncement].content}</p>
              </div>
              
              {announcements[currentAnnouncement].link && (
                <Link 
                  href={announcements[currentAnnouncement].link} 
                  className="inline-flex items-center mt-3 md:mt-4 text-blue-600 dark:text-blue-400 font-medium text-base md:text-lg hover:underline"
                >
                  Learn more <ExternalLink className="ml-1 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation controls */}
          <div className="flex justify-between mt-3 md:mt-4">
            <motion.button
              onClick={() => handleAnnouncementNavigation('prev')}
              className="bg-black dark:bg-white text-white dark:text-black p-1 md:p-2 rounded-lg border-2 border-black dark:border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
            
            <div className="flex space-x-2">
              {announcements.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentAnnouncement(index)
                    startAnnouncementTimer()
                  }}
                  className={`h-2 w-2 md:h-3 md:w-3 rounded-full border border-black dark:border-white ${
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
              className="bg-black dark:bg-white text-white dark:text-black p-1 md:p-2 rounded-lg border-2 border-black dark:border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="p-4 md:p-8 rounded-2xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 font-poppins text-black dark:text-white relative inline-block">
          Our Achievements
          <motion.div 
            className="absolute -bottom-2 left-0 h-2 bg-green-400 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>
        
        {/* Mobile scroll controls */}   
      <div 
          ref={achievementsRef}
          className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 space-x-4 md:space-x-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {achievements.map((achievement: Achievement, index: number) => (
            <motion.div
              key={achievement.heading}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={index}
              className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border-2 border-black dark:border-gray-600 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transform transition-all duration-300 flex-shrink-0 w-80 md:w-auto snap-center"
            >
              <div className="relative w-full h-40 md:h-52 mb-3 md:mb-4 overflow-hidden rounded-lg border-2 border-black dark:border-gray-600">
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.heading}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 font-poppins">{achievement.heading}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3 md:mb-4 text-sm md:text-base line-clamp-3 md:line-clamp-none">{achievement.description}</p>
              <Link 
                href={achievement.link} 
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base hover:underline"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex md:hidden justify-between mb-4">
          <motion.button
            onClick={() => handleAchievementNavigation('prev')}
            className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg border-2 border-black dark:border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          
          <div className="flex space-x-1">
            {achievements.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentAchievementIndex(index)
                  scrollToAchievement(index)
                  startAchievementTimer()
                }}
                className={`h-2 w-2 rounded-full border border-black dark:border-white ${
                  currentAchievementIndex === index 
                    ? 'bg-green-500 dark:bg-green-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={() => handleAchievementNavigation('next')}
            className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg border-2 border-black dark:border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </section>

      {/* Blog Section with neo-brutalist styling */}
      <section className="p-4 md:p-8 rounded-2xl border-4 border-black dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 font-poppins text-black dark:text-white relative inline-block">
          Latest Updates
          <motion.div 
            className="absolute -bottom-2 left-0 h-2 bg-pink-400 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>
        <div className="overflow-hidden">
          <BlogSection />
        </div>
      </section>

      {/* Navigation Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
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
            className={`${item.color} p-4 md:p-8 rounded-2xl border-4 border-black dark:border-gray-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transform transition-all duration-300`}
          >
            <div className="text-3xl md:text-4xl mb-2 md:mb-4">{item.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 font-poppins text-black">{item.name}</h3>
            <p className="mb-4 md:mb-6 text-gray-700 dark:text-gray-500 text-base md:text-lg">Learn more about our {item.name.toLowerCase()}.</p>
            <Link 
              href={`/${item.name.toLowerCase()}`}
              className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black py-2 md:py-3 px-4 md:px-5 rounded-lg text-base md:text-lg font-medium border-2 border-black shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] dark:shadow-[3px_3px_0px_0px_rgba(147,51,234,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
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