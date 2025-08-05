"use client"

import { motion } from "framer-motion"
import { Clock, Users, Mail, MessageCircle } from "lucide-react"

export default function JoinPage() {
  return (
         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
                         <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-6">
               <Users className="w-8 h-8 text-slate-600 dark:text-slate-300" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Join SGC
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Become part of the Student Guidance Cell and help shape the future of our community
            </p>
          </motion.div>

        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 neo-brutalism-white dark:neo-brutalism-dark"
          >
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Stay Tuned!</h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We're currently preparing something exciting for our recruitment process. 
                The application portal will be opening soon!
              </p>
              
                             <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 mb-6">
                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                   What to Expect
                 </h3>
                 <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
                   <li className="flex items-start">
                     <span className="text-slate-600 dark:text-slate-300 mr-2">•</span>
                     <span>Comprehensive application process</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-slate-600 dark:text-slate-300 mr-2">•</span>
                     <span>Multiple roles and opportunities</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-slate-600 dark:text-slate-300 mr-2">•</span>
                     <span>Skill development and mentorship</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-slate-600 dark:text-slate-300 mr-2">•</span>
                     <span>Networking with industry professionals</span>
                   </li>
                 </ul>
              </div>

              <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <span>Follow us on social media for updates!</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
                         className="bg-slate-700 dark:bg-slate-800 text-white rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-3">Have Questions?</h3>
                         <p className="text-slate-200 dark:text-slate-300 mb-4">
               Reach out to us for more information about joining SGC
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:studentguidancecell@gmail.com"
                                 className="bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 px-6 py-2 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </a>
              <a
                href="/contact"
                                 className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-slate-700 dark:hover:bg-gray-800 dark:hover:text-slate-300 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Page
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer will be included via layout */}
    </div>
  )
} 