"use client"

import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "next-themes"
import Head from 'next/head'

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins" })

// Default SEO configuration
const defaultSEO = {
  title: "Students Guidance Cell",
  description: "SGC organizes diverse events, unveiling hidden talents. Through these initiatives, it nurtures skills, ensuring remarkable career outcomes and aspiring to elevate every student professionalism to new heights.",
  keywords: "SGC, CAHCET, SGC-CAHCET, Student Guidance Cell, CAHCET Student Guidance Cell, C Abdul Hakeem College of Engineering and Technology, CAHCET SGC",
  author: "SGC Team",
  siteUrl: "https://teamsgc.in",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teamsgc.in",
    siteName: "Students Guidance Cell",
    images: [
      {
        url: "https://teamsgc.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SGC Site preview image",
      },
    ],
  },
  twitter: {
    handle: "@sgc-cahcet",
    site: "@sgc-cahcet",
    cardType: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Primary Meta Tags */}
        <title>{defaultSEO.title}</title>
        <meta name="title" content={defaultSEO.title} />
        <meta name="description" content={defaultSEO.description} />
        <meta name="keywords" content={defaultSEO.keywords} />
        <meta name="author" content={defaultSEO.author} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={defaultSEO.openGraph.type} />
        <meta property="og:url" content={defaultSEO.openGraph.url} />
        <meta property="og:title" content={defaultSEO.title} />
        <meta property="og:description" content={defaultSEO.description} />
        <meta property="og:image" content={defaultSEO.openGraph.images[0].url} />
        <meta property="og:site_name" content={defaultSEO.openGraph.siteName} />
        <meta property="og:locale" content={defaultSEO.openGraph.locale} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={defaultSEO.twitter.cardType} />
        <meta name="twitter:site" content={defaultSEO.twitter.site} />
        <meta name="twitter:creator" content={defaultSEO.twitter.handle} />
        <meta name="twitter:title" content={defaultSEO.title} />
        <meta name="twitter:description" content={defaultSEO.description} />
        <meta name="twitter:image" content={defaultSEO.openGraph.images[0].url} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="canonical" href={`${defaultSEO.siteUrl}${pathname}`} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-gradient-to-br from-yellow-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 min-h-screen">
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}