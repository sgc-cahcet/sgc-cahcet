"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Github, Instagram, Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <div className="space-y-12">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-8">
        Contact Us
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="neo-brutalism-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-black">Get in Touch</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="mr-2" />
              <span>2nd Floor, CAHCET Main Block, CAHCET Campus, Hakeem Nagar, Melvisharam, Ranipet</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2" />
              <span> <a href="tel:+91 6381273532">+91 6381273532</a></span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2" />
              <span>studentguidancecell.cahcet@gmail.com</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-brutalism-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-black">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/studentsguidancecell" className="text-pink-600 hover:text-pink-800">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/studentguidancecell-cahcet/" className="text-blue-800 hover:text-blue-900">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/sgc-cahcet/" className="text-black hover:text-gray-800">
              <Github size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="neo-brutalism-white p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">Send Us a Message</h2>
        <p className="text-gray-600 mb-4">We'd love to hear from you. Drop a email to <a href="mailto:studentguidancecell.cahcet@gmail.com" className="text-blue-600 hover:text-blue-800">studentguidancecell.cahcet@gmail.com</a> to get in touch. We get back to you as soon as possible.</p>
      </motion.div>
    </div>
  )
}

