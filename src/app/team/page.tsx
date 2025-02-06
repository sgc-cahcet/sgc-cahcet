"use client";

import { motion } from "framer-motion";
import { teamMembers } from "../../data/team_data";
import { Linkedin } from "lucide-react";

const getYearSuffix = (year: string) => {
  switch (year) {
    case "I":
      return "st"
    case "II":
      return "nd"
    case "III":
      return "rd"
    case "IV":
      return "th"
    default:
      return ""
  }
}

const getRolePriority = (role: string) => {
  switch (role) {
    case "President":
      return 1
    case "Vice President":
      return 2
    case "Advisor":
      return 3
    default:
      return 4
  }
}

const getYearPriority = (year: string) => {
  switch (year) {
    case "IV":
      return 1
    case "III":
      return 2
    case "II":
      return 3
    case "I":
      return 4
    default:
      return 5
  }
}

const sortedTeamMembers = [...teamMembers].sort((a, b) => {
  // First, sort by role priority
  const rolePriorityDiff = getRolePriority(a.role) - getRolePriority(b.role)
  if (rolePriorityDiff !== 0) return rolePriorityDiff

  // Then, sort by year priority
  const yearPriorityDiff = getYearPriority(a.year) - getYearPriority(b.year)
  if (yearPriorityDiff !== 0) return yearPriorityDiff

  // If same role and year, sort by name
  return a.name.localeCompare(b.name)
})

export default function Team() {
  return (
    <div>
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-8">
        Our Team
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedTeamMembers.map((member, index) => (
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
            <h2 className="text-2xl font-bold mb-2 text-black">{member.name}</h2>
            <p className="text-lg text-gray-600 mb-1">{member.role}</p>
            <p className="text-sm text-gray-500 mb-4">
              {member.year}
              <sup>{getYearSuffix(member.year)}</sup> Year, {member.department}
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