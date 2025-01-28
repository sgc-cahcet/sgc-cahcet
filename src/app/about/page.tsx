"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <div className="space-y-12">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-8">
        About SGC
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="neo-brutalism-white p-8 rounded-lg"
      >
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="SGC Group Photo"
          width={800}
          height={400}
          className="w-full h-auto mb-8 rounded-md"
        />
        <h2 className="text-2xl font-bold mb-4 text-black">Our Story</h2>
        <p className="mb-4 text-black">
          The Students Guidance Cell (SGC) was established in 2010 with the vision of empowering students through
          mentorship, career guidance, and personal development programs. Since its inception, SGC has been at the
          forefront of student support services, continuously evolving to meet the changing needs of our diverse student
          body.
        </p>
        <p>
          Our dedicated team of faculty members, alumni, and student volunteers work tirelessly to create a supportive
          environment where every student can thrive academically, professionally, and personally.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="neo-brutalism-white p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">About Our College</h2>
        <p className="mb-4 text-black">
          [Your College Name] has been a beacon of excellence in education since [year of establishment]. With a rich
          history of academic achievements and a forward-looking approach to education, our college has consistently
          ranked among the top institutions in the country.
        </p>
        <p>
          We pride ourselves on our state-of-the-art facilities, distinguished faculty, and a curriculum that balances
          theoretical knowledge with practical skills. Our college is committed to nurturing not just successful
          professionals, but also responsible citizens who can contribute meaningfully to society.
        </p>
      </motion.div>
    </div>
  )
}

