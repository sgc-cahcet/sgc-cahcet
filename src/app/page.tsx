"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { ChevronRight, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { announcements, achievements } from "../data/data"
import Image from "next/image"
import Link from "next/link"
import WeeklyUpdates from "@/components/WeeklyUpdates"
import HeroSection from "@/components/HeroSection"

interface Achievement {
  heading: string
  description: string
  image: string
  link: string
}

interface Announcement {
  title: string;
  content: string;
  image: string;
  link?: string;
  linkText?: string;
}

const Home: React.FC = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
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

  // NEW: tracks viewport width so the achievements carousel can apply
  // mobile-only scale/opacity/peek styling without affecting desktop.
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
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

  // UPDATED: now centers the actual target card (measured via offsetLeft)
  // instead of assuming an even edge-to-edge slice of the container. This
  // is required for the "active card always centered" peek effect to work,
  // since the container now has left/right padding on mobile.
  const scrollToAchievement = (index: number) => {
    if (achievementsRef.current && window.innerWidth < 768) {
      const container = achievementsRef.current
      const card = container.children[index] as HTMLElement | undefined
      if (!card) return
      const scrollPosition =
        card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  // NEW: keeps currentAchievementIndex (and therefore the dots + card
  // scale/opacity) in sync when the user swipes manually instead of using
  // the arrows or dots.
  const handleAchievementScroll = () => {
    if (!achievementsRef.current || window.innerWidth >= 768) return
    const container = achievementsRef.current
    const firstCard = container.firstElementChild as HTMLElement | null
    if (!firstCard) return
    const cardWidth = firstCard.offsetWidth
    const gap = 16 // matches space-x-4 (1rem)
    const index = Math.round(container.scrollLeft / (cardWidth + gap))
    setCurrentAchievementIndex((prev) => (prev !== index ? index : prev))
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
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Fixed-height container — all cards stack inside here */}
          <div className="relative overflow-hidden rounded-xl border-2 border-black dark:border-gray-600 min-h-[280px] md:min-h-[280px]">
            {announcements.map((announcement: Announcement, index: number) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex flex-col justify-between"
                animate={{
                  opacity: currentAnnouncement === index ? 1 : 0,
                  scale: currentAnnouncement === index ? 1 : 0.98,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                style={{
                  pointerEvents: currentAnnouncement === index ? "auto" : "none",
                }}
              >
                {/* Background Image */}
                <Image
                  src={announcement.image}
                  alt={announcement.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="absolute inset-0 object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/75" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col max-w-3xl">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3 font-poppins">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed">
                      {announcement.content}
                    </p>
                  </div>

                  {announcement.link && (
                    <Link
                      href={announcement.link}
                      className="inline-flex items-center mt-auto pt-6 text-yellow-300 hover:text-yellow-200 font-semibold text-base md:text-lg transition-colors"
                    >
                      {announcement.linkText || "View Details"}
                      <ExternalLink className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between mt-3 md:mt-4">
            <motion.button
              onClick={() => handleAnnouncementNavigation("prev")}
              className="bg-black dark:bg-white text-white dark:text-black p-1 md:p-2 rounded-lg border-2 border-black dark:border-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>

            <div className="flex space-x-2">
              {announcements.map((_: Announcement, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentAnnouncement(index);
                    startAnnouncementTimer();
                  }}
                  className={`h-2 w-2 md:h-3 md:w-3 rounded-full border border-black dark:border-white ${currentAnnouncement === index
                    ? "bg-blue-500 dark:bg-purple-500"
                    : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => handleAnnouncementNavigation("next")}
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
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>

        <div
          ref={achievementsRef}
          onScroll={handleAchievementScroll}
          className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 md:items-stretch flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 gap-4 px-[5%] md:px-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {achievements.map((achievement: Achievement, index: number) => {
            const distance = Math.abs(index - currentAchievementIndex)
            const mobileScale = distance === 0 ? 1 : distance === 1 ? 0.96 : 0.92
            const mobileOpacity = distance === 0 ? 1 : distance === 1 ? 0.85 : 0.65

            return (
              <motion.div
                key={achievement.heading}
                variants={cardVariants}
                initial="initial"
                animate={isMobile ? { scale: mobileScale, opacity: mobileOpacity } : "animate"}
                whileHover="hover"
                custom={index}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-xl border-2 border-black dark:border-gray-600 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] flex flex-col flex-shrink-0 w-[90%] max-w-[360px] md:w-auto snap-center"
              >
                {/* Image */}
                <div className="relative w-full h-44 md:h-52 mb-4 overflow-hidden rounded-lg border-2 border-black dark:border-gray-600 flex-shrink-0">
                  <Image
                    loading={index < 3 ? "eager" : "lazy"}
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.heading}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </div>

                {/* Text content — grows to fill available space */}
                <div className="flex flex-col flex-1 min-h-0">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 font-poppins text-black dark:text-white leading-snug line-clamp-4">
                    {achievement.heading}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4 mb-4">
                    {achievement.description}
                  </p>

                  {/* Button pinned to bottom */}
                  {achievement.link && (
                    <Link
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base hover:underline underline-offset-2 group"
                    >
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile navigation controls */}
        <div className="flex md:hidden justify-between mt-4">
          <motion.button
            onClick={() => handleAchievementNavigation("prev")}
            className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg border-2 border-black dark:border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>

          <div className="flex space-x-1 items-center">
            {achievements.map((_: Achievement, index: number) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentAchievementIndex(index);
                  scrollToAchievement(index);
                  startAchievementTimer();
                }}
                className={`h-2 rounded-full border border-black dark:border-white transition-all duration-300 ease-out ${currentAchievementIndex === index
                  ? "w-6 bg-green-500 dark:bg-green-400"
                  : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => handleAchievementNavigation("next")}
            className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg border-2 border-black dark:border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </section>

      {/* Weekly Updates Section */}
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
          <WeeklyUpdates />
        </div>
      </section>

      {/* Navigation Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
        {[
          { name: "About", icon: "🔍", color: "bg-blue-100 dark:bg-gray-900" },
          { name: "Team", icon: "👥", color: "bg-green-100 dark:bg-gray-900" },
          { name: "Events", icon: "🎉", color: "bg-purple-100 dark:bg-gray-900" }
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
            <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 font-poppins text-black dark:text-white">{item.name}</h3>
            <p className="mb-4 md:mb-6 text-gray-700 dark:text-gray-400 text-base md:text-lg">Learn more about our {item.name.toLowerCase()}.</p>
            <Link
              href={`/${item.name.toLowerCase()}`}
              className="inline-flex items-center bg-white dark:bg-gray-900 text-black dark:text-white py-2 md:py-3 px-4 md:px-5 rounded-lg text-base md:text-lg font-medium border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(59,130,246,1)] dark:shadow-[3px_3px_0px_0px_rgba(147,51,234,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
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