"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Newspaper, Sparkles } from 'lucide-react';
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
      <section className="neo-brutalism-white dark:neo-brutalism-dark p-8 rounded-lg">
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
      className="text-center py-16 px-4"
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
        className="inline-block mb-6"
      >
        <Sparkles className="w-16 h-16 text-blue-500" />
      </motion.div>
      <h3 className="text-2xl font-bold mb-4 text-black">No Articles Yet! ✨</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        We're cooking up something amazing! 🚀
      </p>
      <p className="text-gray-500 dark:text-gray-500">
        Stay tuned for exciting content coming your way! 🌟
      </p>
    </motion.div>
  );

  return (
    <section className="neo-brutalism-white dark:neo-brutalism-dark p-8 rounded-lg space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-poppins text-black">
          Latest from our Blog
        </h2>
        <Link 
          href="https://medium.com/@sgc-cahcet"
          className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all posts
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 p-6"
            >
              <Link href={post.link} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author || 'Anonymous'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(post.pubDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories?.map((category, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 mt-4"
                    whileHover={{ x: 5 }}
                  >
                    <Newspaper className="h-4 w-4" />
                    Read article 
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default BlogSection;