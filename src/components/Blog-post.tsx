"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, User, Newspaper, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  title: string;
  author: string;
  pubDate: string;
  link: string;
  categories: string[];
}

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const blogPostsRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sgc-cahcet');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        if (data.status === 'ok' && Array.isArray(data.items)) {
          setBlogPosts(data.items.slice(0, 6));
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error instanceof Error ? error.message : 'Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  useEffect(() => {
    startAutoScroll();
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [blogPosts]);

  const startAutoScroll = () => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }
    
    autoScrollTimerRef.current = setInterval(() => {
      if (!isHovering && window.innerWidth < 768 && blogPosts.length > 0) {
        setCurrentPostIndex((prev) => {
          const nextIndex = (prev + 1) % blogPosts.length;
          scrollToBlogPost(nextIndex);
          return nextIndex;
        });
      }
    }, 5000);
  };

  const scrollToBlogPost = (index: number) => {
    if (blogPostsRef.current && window.innerWidth < 768) {
      const scrollPosition = index * (blogPostsRef.current.scrollWidth / blogPosts.length);
      blogPostsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBlogNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentPostIndex((prev) => {
        const newIndex = prev === 0 ? blogPosts.length - 1 : prev - 1;
        scrollToBlogPost(newIndex);
        return newIndex;
      });
    } else {
      setCurrentPostIndex((prev) => {
        const newIndex = (prev + 1) % blogPosts.length;
        scrollToBlogPost(newIndex);
        return newIndex;
      });
    }
    
    startAutoScroll();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  if (error) {
    return (
      <section className="neo-brutalism-white dark:neo-brutalism-dark p-4 md:p-8 rounded-lg">
        <div className="text-center text-red-600 dark:text-red-400 p-4">
          {error}
        </div>
      </section>
    );
  }

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8 md:py-16 px-4"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="inline-block mb-4 md:mb-6"
      >
        <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
      </motion.div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-black">No Articles Yet! ✨</h3>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">
        We're cooking up something amazing! 🚀
      </p>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
        Stay tuned for exciting content coming your way! 🌟
      </p>
    </motion.div>
  );

  return (
    <section className="neo-brutalism-white dark:neo-brutalism-dark p-4 md:p-8 rounded-lg space-y-4 md:space-y-8">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold font-poppins text-black">
          Latest from our Blog
        </h2>
        <Link 
          href="https://medium.com/@sgc-cahcet"
          className="group flex items-center gap-1 md:gap-2 text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
          </motion.span>
        </Link>
      </div>

      {/* Mobile scroll controls - only show when not loading and has posts */}
      {!isLoading && blogPosts.length > 0 && (
        <div className="flex md:hidden justify-between mb-3">
          <motion.button
            onClick={() => handleBlogNavigation('prev')}
            className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg border-2 border-black dark:border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
          
          <div className="flex space-x-1">
            {blogPosts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentPostIndex(index)
                  scrollToBlogPost(index)
                  startAutoScroll()
                }}
                className={`h-2 w-2 rounded-full border border-black dark:border-white ${
                  currentPostIndex === index 
                    ? 'bg-pink-500 dark:bg-pink-400' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={() => handleBlogNavigation('next')}
            className="bg-black dark:bg-white text-white dark:text-black p-1 rounded-lg border-2 border-black dark:border-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : blogPosts.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          ref={blogPostsRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="overflow-x-auto md:overflow-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <motion.div 
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-4 md:pb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 p-4 md:p-6 flex-shrink-0 min-w-[280px] w-[85vw] max-w-sm md:w-auto md:min-w-0 snap-center"
              >
                <Link href={post.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="truncate max-w-[80px] md:max-w-none">
                          {post.author || 'Anonymous'}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        {new Date(post.pubDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {post.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                        {post.categories?.slice(0, 3).map((category, idx) => (
                          <span 
                            key={idx}
                            className="px-1.5 md:px-2 py-0.5 md:py-1 text-2xs md:text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 truncate max-w-[80px]"
                          >
                            {category}
                          </span>
                        ))}
                        {post.categories?.length > 3 && (
                          <span className="px-1.5 md:px-2 py-0.5 md:py-1 text-2xs md:text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            +{post.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <motion.div 
                      className="inline-flex items-center gap-1 md:gap-2 text-sm md:text-base text-blue-600 dark:text-blue-400 mt-2 md:mt-4"
                      whileHover={{ x: 5 }}
                    >
                      <Newspaper className="h-3 w-3 md:h-4 md:w-4" />
                      Read article 
                      <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                    </motion.div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;