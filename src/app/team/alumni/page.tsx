"use client"

import { motion } from "framer-motion"
import { alumni } from "../../../data/data"
import { Linkedin } from "lucide-react"

export default function Alumni() {
  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 font-poppins"
      >
        Our Alumni
      </motion.h1>
      {alumni.map((year) => (
        <motion.div
          key={year.year}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-brutalism-white dark:neo-brutalism-dark p-6 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-4 font-poppins">Batch of {year.year}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Department</th>
                  <th className="p-2 text-left">Current Position</th>
                  <th className="p-2 text-left">Contact</th>
                </tr>
              </thead>
              <tbody>
                {year.members.map((member, index) => (
                  <motion.tr
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"}
                  >
                    <td className="p-2">{member.name}</td>
                    <td className="p-2">{member.department}</td>
                    <td className="p-2">{member.currentPosition}</td>
                    <td className="p-2">
                      <a
                        href={member.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                      >
                        <Linkedin className="mr-1" size={16} /> LinkedIn
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

