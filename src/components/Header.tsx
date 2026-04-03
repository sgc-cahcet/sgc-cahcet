"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  
  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only determine theme-dependent values after mounting to avoid hydration mismatch
  const isDarkTheme = mounted && (theme === "dark" || resolvedTheme === "dark");
  const logoSrc = isDarkTheme ? "/logo-white.png" : "/logo.png";

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Team",
      href: "/team",
      submenu: [
        { name: "Current", href: "/team" },
        { name: "Alumni", href: "/team/alumni" },
      ],
    },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
    { name: "Join Us", href: "/join" },
    ]

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 sticky top-0 z-50 neo-brutalism-shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          {/* Use a default logo initially, then the theme-specific one after mounting */}
          {mounted ? (
            <Image src={logoSrc} alt="SGC Logo" width={40} height={40} className="mr-2" />
          ) : (
            <div className="w-10 h-10 mr-2" /> // Placeholder with same dimensions to avoid layout shift
          )}
          <span>SGC</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => setActiveSubmenu(item.name)}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <Link 
                href={item.href} 
                className="hover:text-blue-500 transition-colors duration-200 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span>{item.name}</span>
              </Link>
              {item.submenu && (
                <AnimatePresence>
                  {activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg overflow-hidden neo-brutalism-white dark:neo-brutalism-dark"
                    >
                      {item.submenu.map((subitem) => (
                        <motion.div
                          key={subitem.name}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                          >
                            {subitem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center space-x-3">
          {/* Portal Login Button */}
          <a 
            href="http://portal.teamsgc.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 hover:text-blue-600 dark:hover:text-blue-400 group"
          >
            <span>Member Login</span>
            <ExternalLink className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
          
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          )}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4"
          >
            {/* Portal Login Button for Mobile */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <a
                href="http://portal.teamsgc.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-blue-600 hover:border-blue-700 dark:border-blue-500 dark:hover:border-blue-600"
                onClick={() => setIsOpen(false)}
              >
                <span>Member Login</span>
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
            
            {menuItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 px-4 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block py-2 px-4 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header;