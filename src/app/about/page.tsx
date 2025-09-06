"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <div className="space-y-12">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-8 text-black dark:text-white">
        About SGC
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg border-2 border-black dark:border-gray-700"
      >
        <img
          src="https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739543508/IMG_2803_su74x2.jpg"
          alt="SGC Group Photo"
          width={800}
          height={400}
          className="w-full h-auto mb-8 rounded-md"
        />
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Story</h2>
        <p className="mb-4 text-black dark:text-gray-200">
        SGC established in 2010 by late Mr. Tanveer Ahmed and Mr. Mohammed Imran, is dedicated to empowering students professionally. 
        Grounded in the mantra <b><i>of, for, and by the students</i></b>, SGC organizes diverse events, unveiling hidden talents. Through these initiatives, it nurtures skills, ensuring remarkable career outcomes and aspiring to elevate every student professionalism to new heights.
        </p>
        <p className="text-black dark:text-gray-200">
          Our dedicated team of faculty members, alumni, and student volunteers work tirelessly to create a supportive
          environment where every student can thrive academically, professionally, and personally.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg border-2 border-black dark:border-gray-700"
      >
        <Image
          src="https://res.cloudinary.com/dbqjkjl0c/image/upload/v1739541663/cahcet_top_pcngpd.jpg"
          alt="CAHCET Campus"
          width={800}
          height={400}
          className="w-full h-auto mb-8 rounded-md"
        />
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">About Our College</h2>
        <p className="mb-4 text-black dark:text-gray-200">
          <b>C.Abdul Hakeem College Of Engineering And Technology</b> has been a beacon of excellence in education since 1998. With a rich
          history of academic achievements and a forward-looking approach to education, our college has consistently
          ranked among the top institutions in the country.
        </p>
        <p className="mb-4 text-black dark:text-gray-200">
          A well-established and well-organized College of Engineering is the desired destination of vast majority of students.
          One such role model of a college is located at a distance of 100 kms from Anna International Airport, Chennai and at 4 kms
          from Arcot, the capital of Nawabs who ruled one-fourth of South India. Right from the year of its inception, the college is consistently producing scores of first class graduates, scores of graduates with high distinction and graduates with University Rank or other academic credentials.
        </p>
        <p className="mb-4 text-black dark:text-gray-200">
          We pride ourselves on our state-of-the-art facilities, distinguished faculty, and a curriculum that balances
          theoretical knowledge with practical skills. Our college is committed to nurturing not just successful
          professionals, but also responsible citizens who can contribute meaningfully to society.
        </p>
      </motion.div>
    </div>
  )
}

