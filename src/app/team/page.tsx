"use client"

import { motion } from "framer-motion"
import { teamMembers } from "../../data/data"
import { Linkedin } from "lucide-react"

export default function Team() {
  return (
    <div>
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-8">
        Our Team
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neo-brutalism-white p-6 rounded-lg text-center"
          >
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-400"
            />
            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
            <p className="text-lg text-gray-600 mb-1">{member.role}</p>
            <p className="text-sm text-gray-500 mb-4">
              {member.department}, {member.year}
            </p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <Linkedin className="mr-1" size={16} /> LinkedIn
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

