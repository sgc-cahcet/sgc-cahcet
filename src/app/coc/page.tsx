"use client"

import { motion } from "framer-motion"

const sections = [
  {
    title: "I. Forms of Address",
    subsections: [
      {
        heading: "Addressing Senior Members",
        items: [
          "All seniors (higher semester or year) shall be addressed as Brother [Name] or Sister [Name] e.g., Brother Arjun, Sister Fathima, until formally invited to use first names.",
          "The same courtesy titles apply in written communications, group chats, and all official SGC channels.",
        ],
      },
      {
        heading: "Addressing Peers & Juniors",
        items: [
          "Peers within the same batch may be addressed by first name when both parties are comfortable.",
          "Juniors shall be addressed respectfully by first name. Senior members shall never use condescending, dismissive, or authority-abusing tones with juniors.",
        ],
      },
      {
        heading: "Addressing Faculty & Staff",
        items: [
          "Faculty, coordinators, and administrative personnel shall be addressed as Sir, Ma'am without exception.",
          "All formal written communication must open with a proper salutation and close with the member's full name and roll number.",
        ],
      },
      {
        heading: "Prohibited Address",
        items: [
          "Derogatory nicknames, appearance-based labels, caste-linked monikers, or any address that demeans a member is a conduct violation.",
        ],
      },
      {
        heading: "In-Person Etiquette",
        items: [
          "Acknowledge seniors with a courteous nod or greeting upon entering shared spaces/college.",
          "During formal sessions, remain seated with devices silenced; do not interrupt speakers.",
        ],
      },
    ],
  },
  {
    title: "II. Prevention of Sexual Harassment (POSH)",
    description:
    "The SGC is an unconditionally safe space for all members. The following policy covers physical, verbal, digital, and non-verbal conduct in alignment with the POSH Act. Every member regardless of seniority, is equally bound.",
    subsections: [
      {
        heading: "Physical Harassment — Prohibited Conduct",
        items: [
          "Any uninvited or unwanted touching — hands, shoulders, waist, face, or any body part without explicit consent.",
          "Deliberately crowding, cornering, blocking a member's path, or invading personal space in a way that causes discomfort.",
          "Sexually suggestive gestures, obscene mimicry, leering, or any body language intended to make a member uncomfortable.",
          "Unwanted hugs, pats, or physical contact framed as jokes. Consent is non-negotiable, always.",
          "Pushing, shoving, prodding, or any aggressive physical contact, however minor.",
        ],
      },
      {
        heading: "Verbal & Conversational Harassment — Prohibited Conduct",
        items: [
          "Comments about a member's body, appearance, or attractiveness, whether directly or indirectly.",
          "Sexually loaded language, crude jokes, double entendres, or innuendos in any SGC space.",
          "Repeatedly asking for dates, personal favours, or companionship after being declined.",
          "Spreading rumours or fabricated stories of a sexual or intimate nature about any member.",
          "Trivialising or mocking a member's discomfort — 'It was just a joke' or 'Don't be sensitive' — is itself a violation.",
        ],
      },
      {
        heading: "Cyberbullying & Digital Harassment — Prohibited Conduct",
        items: [
          "Sending unsolicited personal, romantic, sexual, or threatening messages through any digital medium.",
          "Sharing, forwarding, or posting images, memes, or videos that ridicule, demean, or sexualise any member without consent.",
          "Doxxing: sharing a member's private information (address, photos, contact) without consent.",
          "Impersonating another member online or sending messages on their behalf to deceive or harm.",
          "Screenshotting or recording private conversations and sharing them without all parties' consent.",
          "Coordinated targeting, mass reporting, group exclusion, or sustained online harassment campaigns.",
        ],
      },
      {
        heading: "Non-Verbal & Environmental Harassment — Prohibited Conduct",
        items: [
          "Persistent staring, following, or surveilling a member in a way that causes fear or discomfort.",
          "Displaying or circulating sexually explicit or offensive materials in any SGC physical or digital space.",
          "Deliberate collective exclusion or group silencing with intent to isolate or harm a member.",
        ],
      },
      {
        heading: "Reporting & Redressal",
        items: [
          "Complaints may be raised with the SGC CoC Moderators: in writing, verbally, or anonymously via the SGC Grievance Portal.",
          "All complaints are strictly confidential. The complainant's identity is protected.",
          "Complaints are acknowledged within 24 hours and resolved within 3 working days.",
          "Retaliation against any complainant is an independent violation subject to immediate disciplinary action.",
        ],
      },
    ],
  },
  {
    title: "III. Zero-Tolerance & Anti-Discrimination",
    items: [
      "Racism, casteism, colourism, or any commentary referencing ethnicity, national origin, or skin tone in any form is strictly prohibited.",
      "Sexism, homophobia, transphobia, and discrimination based on gender identity or sexual orientation are categorically banned.",
      "Religious intolerance or derogatory remarks about faith, including jokes, shall not be condoned.",
      "Ableism or bullying based on disability, neurodivergence, mental health, or physical appearance is explicitly prohibited.",
      "Witnesses of such conduct are duty-bound to report to the SGC Ethics Committee within 24 hours.",
    ],
  },
  {
    title: "IV. Professional Conduct & Community Standards",
    subsections: [
      {
        heading: "General Conduct",
        items: [
          "Members shall present themselves in neat, dignified attire at all official SGC events.",
          "Profane, obscene, or offensive language is prohibited within all SGC premises and digital channels.",
          "Members shall not consume alcohol, narcotics, or controlled substances in connection with SGC activities.",
          "Punctuality is mandatory. Habitual tardiness attracts a formal demerit in the member's record.",
          "Confidential SGC information shall not be disclosed externally without written Board authorisation.",
        ],
      },
      {
        heading: "Digital & Social Media",
        items: [
          "Members shall not post content that misrepresents the SGC or discredits any associated individual.",
          "SGC branding and logos may not be used externally without prior written approval.",
          "Members are personally accountable for all content published under their credentials on SGC platforms.",
        ],
      },
      {
        heading: "Standards of Excellence",
        items: [
          "Members shall contribute at least one initiative, workshop, or project per semester.",
          "Plagiarism or uncredited use of peers' work in SGC projects is a serious ethical violation.",
          "Members representing SGC externally shall maintain decorum befitting the institution.",
        ],
      },
      {
        heading: "Disciplinary Framework",
        items: [
          "Level I — Minor Infraction: Written warning and mandatory counselling session.",
          "Level II — Moderate Infraction: Suspension of SGC privileges, community service, notation in record.",
          "Level III — Severe / Repeat Infraction: Permanent termination of membership and full revocation of all SGC access rights.",
          "In case of POSH violations, after investigations & procedures, direct termination will be proceeded, no more disciplinary frameworks.",
          "All members under review retain the right to a fair hearing prior to any Level III action.",
        ],
      },
    ],
  },
  {
    title: "V. Member Self-Declaration",
    items: [
      "Immediate and permanent termination of my SGC membership.",
      "Complete revocation and locking of all SGC platform access including member portals, communication channels, event systems, shared repositories, email aliases, and all associated credentials.",
      "Formal notation of the violation in the SGC internal registry, which may be shared with institutional authorities at the Board's discretion.",
      "Permanent ineligibility for re-admission to the SGC, unless overturned by unanimous vote of the Executive Board.",
    ],
    note: "I acknowledge that ignorance of the Code of Conduct does not excuse non-compliance. All members must familiarise themselves with this document and stay updated on any amendments.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function CodeOfConduct() {
  return (
    <div className="space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-black dark:text-white"
      >
        Code of Conduct
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg border-2 border-black dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Student Guidance Cell — Code of Conduct
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The Student Guidance Cell (SGC) is a formally constituted student community committed to
          excellence, mutual respect, and principled conduct. This Code of Conduct (CoC) is binding on
          all enrolled members from the date of induction. Non-compliance attracts disciplinary action
          as defined herein.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-gray-900 p-8 rounded-lg border-2 border-black dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              {section.title}
            </h2>

            {section.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                {section.description}
              </p>
            )}

            {section.subsections?.map((sub, subIndex) => (
              <div key={subIndex} className="mb-6 last:mb-0">
                <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">
                  {sub.heading}
                </h3>
                <ul className="space-y-2">
                  {sub.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 min-w-[6px] rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {section.items && (
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 min-w-[6px] rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.note && (
              <p className="text-gray-600 dark:text-gray-300 mt-6 border-t-2 border-gray-200 dark:border-gray-700 pt-4">
                {section.note}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg border-2 border-black dark:border-gray-700 text-center"
      >
        <p className="text-gray-600 dark:text-gray-300 italic">
          By being a member of SGC, all members are deemed to have read, understood, and agreed to
          this Code of Conduct.
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
          SGC — Confidential Internal Document
        </p>
      </motion.div>
    </div>
  )
}
