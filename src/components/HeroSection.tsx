// Hero Section component for the Home page
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

interface LetterVariant {
    y: number;
    opacity: number;
    transition?: {
        delay: number;
        duration: number;
        type: string;
        stiffness: number;
    };
}

interface LetterVariants {
    initial: LetterVariant;
    animate: (i: number) => LetterVariant;
    [key: string]: any; // Add index signature for compatibility with Variants
}

const letterVariants: LetterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (i: number): LetterVariant => ({
        y: 0,
        opacity: 1,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            type: "spring",
            stiffness: 120
        }
    })
};
  
  const words = "Student Guidance Cell".split(" ");
  
  if (!mounted) return null;
  
  return (
    <section className="relative overflow-hidden rounded-3xl border-4 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] my-8">
      {/* Dynamic background with staggered grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 md:grid-cols-12 md:grid-rows-12">
          {[...Array(36)].map((_, i) => (
            <motion.div
              key={i}
              className="opacity-10 border-[0.5px] border-blue-900 dark:border-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: i * 0.02, duration: 0.5 }}
            />
          ))}
        </div>
        
        {/* Floating geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute w-16 h-16 rounded-lg md:w-24 md:h-24 ${
              i % 3 === 0 
                ? 'bg-blue-400 dark:bg-blue-600' 
                : i % 3 === 1 
                  ? 'bg-purple-400 dark:bg-purple-600'
                  : 'bg-yellow-400 dark:bg-yellow-600'
            } opacity-20`}
            initial={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100 - 50,
              rotate: 0
            }}
            animate={{ 
              x: [
                Math.random() * 80 - 40, 
                Math.random() * 80 - 40, 
                Math.random() * 80 - 40
              ],
              y: [
                Math.random() * 80 - 40, 
                Math.random() * 80 - 40, 
                Math.random() * 80 - 40
              ],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content container with grid layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[90vh] gap-4 w-full">
        {/* Left content - Text and CTA */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 order-2 md:order-1">
          <div className="space-y-6">
            {/* Small badge */}
            <motion.div 
              className="inline-block bg-black dark:bg-white text-white dark:text-black text-sm font-bold px-4 py-2 rounded-full mb-4 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(59,130,246,1)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome to SGC
            </motion.div>
          
            {/* Main heading with animated stroke */}
            <div className="relative">
              <motion.h1
                className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-poppins tracking-tight inline-block"
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
              <motion.div 
                className="absolute -bottom-3 left-0 h-3 bg-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 1.2 }}
              />
            </div>
            
            {/* Animated subtitle with staggered letters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {words.map((word, wordIndex) => (
                <div key={wordIndex} className="flex overflow-hidden">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      variants={letterVariants}
                      initial="initial"
                      animate="animate"
                      custom={wordIndex + letterIndex * 0.1}
                      className="text-2xl md:text-4xl text-gray-700 dark:text-gray-200 font-poppins inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Description paragraph */}
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Empowering students to achieve their full potential through guidance, 
              resources, and opportunities for personal and academic growth.
            </motion.p>
            
            {/* CTA buttons - primary and secondary */}
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <Link href="/about">
                <motion.button 
                  className="bg-white dark:bg-gray-900 text-black dark:text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl border-2 border-black dark:border-gray-700 text-lg md:text-xl shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] dark:shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/events">
                <motion.button 
                  className="bg-white dark:bg-gray-900 text-black dark:text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl border-2 border-black dark:border-gray-700 text-lg md:text-xl shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] dark:shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Events
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Right content - Visual elements */}
        <div className="relative flex items-center justify-center p-6 md:p-12 order-1 md:order-2">
          <div className="relative w-full h-64 md:h-96 overflow-visible">
            {/* Main visual element */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              <div className="relative w-48 h-48 md:w-72 md:h-72 bg-blue-100 dark:bg-blue-900 rounded-2xl border-4 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.5)]">
                <div className="absolute inset-4 overflow-hidden rounded-lg">
                  <Image
                    src="/logo.png"
                    alt="SGC Logo"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
                
                {/* Animated border */}
                <motion.div 
                  className="absolute -inset-2 border-2 border-dashed border-blue-500 rounded-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full border-4 border-black z-10"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
            
            <motion.div
              className="absolute bottom-0 left-4 w-20 h-20 md:w-32 md:h-32 bg-purple-400 rounded-lg border-4 border-black rotate-12 z-10"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            />
            
            {/* Small decorative dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500 border-2 border-black"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom decorative bar */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      />
    </section>
  );
};

export default HeroSection;