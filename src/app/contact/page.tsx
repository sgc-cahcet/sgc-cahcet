"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Github, Instagram, Linkedin } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "suggestion",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from("feedback")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            feedback_type: formData.feedbackType,
            message: formData.message,
          },
        ])

      if (error) throw error

      setSubmitStatus({
        type: "success",
        message: "Thank you for your feedback! We'll get back to you soon.",
      })
      setFormData({ name: "", email: "", feedbackType: "suggestion", message: "" })
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "There was an error submitting your feedback. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
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
              <span>
                <a href="tel:+91 6381273532">+91 6381273532</a>
              </span>
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
            <a
              href="https://www.instagram.com/studentsguidancecell"
              className="text-pink-600 hover:text-pink-800"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/studentguidancecell-cahcet/"
              className="text-blue-800 hover:text-blue-900"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/sgc-cahcet/"
              className="text-black hover:text-gray-800"
            >
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
        
        {submitStatus.type && (
          <div
            className={`p-4 mb-4 rounded ${
              submitStatus.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="feedbackType" className="block text-sm font-medium text-black">
              Feedback Type
            </label>
            <select
              id="feedbackType"
              required
              className="mt-1 block w-full px-3 py-2 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.feedbackType}
              onChange={(e) => setFormData({ ...formData, feedbackType: e.target.value })}
            >
              <option value="suggestion">Suggestion</option>
              <option value="bug">Bug Report</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-black">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>
    </div>
  )
}