"use client";

import { motion } from "framer-motion";
import { alumni } from "../../../data/alumni_data";
import { Linkedin, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function Alumni() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // Define interfaces for better type safety
  interface ExpandedMembersState {
    [yearBatch: number]: {
      [memberName: string]: boolean;
    };
  }
  
  const [expandedMembers, setExpandedMembers] = useState<ExpandedMembersState>({});

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Toggle accordion item
  const toggleAccordion = (yearBatch: number, memberName: string): void => {
    setExpandedMembers((prev: ExpandedMembersState) => {
      const yearMembers = {...(prev[yearBatch] || {})};
      yearMembers[memberName] = !yearMembers[memberName];
      return {...prev, [yearBatch]: yearMembers};
    });
  };

  const filteredAlumni = alumni.map(year => ({
    ...year,
    members: year.members
      .filter(member => {
        const searchFields = [
          member.name,
          member.department,
          member.currentPosition,
          year.year.toString()
        ].map(field => field.toLowerCase());
        
        const query = searchQuery.toLowerCase();
        
        return searchFields.some(field => field.includes(query));
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  })).filter(year => year.members.length > 0);

  return (
    <div className="space-y-8 px-4 md:px-0">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-8 font-poppins text-center md:text-left text-black dark:text-white"
      >
        Our Alumni
      </motion.h1>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={isMobile ? "Search alumni..." : "Search by name, department, position, or batch year..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-black dark:text-white"
          />
        </div>
      </motion.div>

      {filteredAlumni.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500 dark:text-gray-400"
        >
          No results found for "{searchQuery}"
        </motion.div>
      ) : (
        filteredAlumni.map((year) => (
          <motion.div
            key={year.year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg border-2 border-black dark:border-gray-700"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins text-black dark:text-white">Batch of {year.year}</h2>
            {/* Desktop View - Table */}
            {!isMobile && (
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-100 dark:bg-blue-900">
                      <th className="p-2 text-left text-black dark:text-white">Name</th>
                      <th className="p-2 text-left text-black dark:text-white">Department</th>
                      <th className="p-2 text-left text-black dark:text-white">Current Position</th>
                      <th className="p-2 text-left text-black dark:text-white">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {year.members.map((member, index) => (
                      <motion.tr
                        key={member.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"}
                      >
                        <td className="p-2 text-black dark:text-white">{member.name}</td>
                        <td className="p-2 text-black dark:text-white">{member.department}</td>
                        <td className="p-2 text-black dark:text-white">{member.currentPosition}</td>
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
            )}
            {/* Mobile View - Accordion Cards */}
            {isMobile && (
              <div className="md:hidden space-y-3">
                {year.members.map((member, index) => {
                  const isExpanded = expandedMembers[Number(year.year)]?.[member.name] || false;
                  return (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border rounded-lg shadow-sm overflow-hidden bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                    >
                      {/* Accordion Header */}
                      <div 
                        className="p-3 bg-gray-50 dark:bg-gray-800 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleAccordion(Number(year.year), member.name)}
                      >
                        <h3 className="font-medium text-black dark:text-white">{member.name}</h3>
                        {isExpanded ? 
                          <ChevronUp size={20} className="text-gray-500 dark:text-gray-300" /> : 
                          <ChevronDown size={20} className="text-gray-500 dark:text-gray-300" />
                        }
                      </div>
                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="p-3 bg-white dark:bg-gray-700 space-y-2">
                          <div>
                            <span className="font-medium text-gray-500 dark:text-gray-300">Department:</span>
                            <p className="text-black dark:text-white">{member.department}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500 dark:text-gray-300">Current Position:</span>
                            <p className="text-black dark:text-white">{member.currentPosition}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500 dark:text-gray-300">Contact:</span>
                            <p>
                              <a
                                href={member.contact}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center mt-1"
                              >
                                <Linkedin className="mr-1" size={16} /> LinkedIn
                              </a>
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
}