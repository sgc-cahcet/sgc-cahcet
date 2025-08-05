
// Define types for our alumni data structure
export type AlumniMember = {
  name: string;
  department: string;
  currentPosition: string;
  contact: string;
}

export type AlumniYear = {
  year: number;
  members: AlumniMember[];
}
// Enter the data for our alumni here..
export const alumni = [
  {
    year: "2025",
    members: [
        {
          name: "Yumnah Safiya",
          department: "CSE",
          currentPosition: "Mobile App Developer",
          contact: "https://www.linkedin.com/in/"
        },
        {
          name: "Zayd Bilal S.A",
          department: "IT",
          currentPosition: "Software Engineering Intern",
          contact: "https://www.linkedin.com/in/zaid-bilal-347473247"
        },
        {
          name: "Sneha",
          department: "CSE",
          currentPosition: "Junior Software Developer",
          contact: "https://www.linkedin.com/in/"
        },
        {
          name: "Priya Narayanan",
          department: "CSE",
          currentPosition: "QA Engineer",
          contact: "https://www.linkedin.com/in/priya-narayanan-a64383250/"
        },
        {
          name: "Varun M",
          department: "CSE",
          currentPosition: "Assistant Software Engineer Intern",
          contact: "https://www.linkedin.com/in/varun-mayilvaganan-662781234/"
        },
        {
          name: "Vallarasu J",
          department: "CSE",
          currentPosition: "UPSC Aspirant",
          contact: "https://www.linkedin.com/in/vallarasuj"
        },
        {
          name: "Thaseem M",
          department: "CSE",
          currentPosition: "Software Engineering Intern",
          contact: "https://www.linkedin.com/in/thaseem-m-6136b92a4"
        },
        {
          name: "Mohammed Zabeer. Z",
          department: "ECE",
          currentPosition: "Startup and Public Speaker",
          contact: "https://www.linkedin.com/in/mohammed-zabeer-z/"
        },
        {
          name: "Delhi Ganesh",
          department: "IT",
          currentPosition: "Software Engineering Intern",
          contact: "https://www.linkedin.com/in/delhi-ganesh-4a76a9326"
        }
    ]
  },
  {
      year: "2024",
      members: [
        {
          name: "Mohammed Rafique A",
          department: "CSE",
          currentPosition: "Software Engineer",
          contact: "https://www.linkedin.com/in/mdrafique",
        },
        {
          name: "Jeya Murugan L",
          department: "CSE",
          currentPosition: "Full Stack Developer",
          contact: "https://www.linkedin.com/in/jeyamuruganl/",
        },
        {
          name: "Prakash K",
          department: "IT",
          currentPosition: "N/A",
          contact: "https://www.linkedin.com/in/prakashkbtech/",
        },
        {
          name: "Vahitha Hafeez",
          department: "CSE",
          currentPosition: "Software Engineer",
          contact: "https://www.linkedin.com/in/vahitha-hafeez-912740212/",
        },
        {
          name: "Sathakathulla S ",
          department: "IT",
          currentPosition: "Network Engineer at Movate",
          contact: "https://www.linkedin.com/in/sathakathulla-s/",
        },
        {
          name: "Gnanasekaran B",
          department: "IT",
          currentPosition: "MTS at Zoho Corp",
          contact: "https://www.linkedin.com/in/gnana-sekaran/",
        },
        {
          name: "Yuvaraj A.D",
          department: "IT",
          currentPosition: "Java Developer",
          contact: "https://www.linkedin.com/in/yuvaraj-a-d/",
        },
        {
          name: "Gokul M",
          department: "IT",
          currentPosition: "Software Developer",
          contact: "https://www.linkedin.com/in/gokul-murugesan-btech/",
        },
        {
          name: "Shewetha V.V.",
          department: "CSE",
          currentPosition: "MBA at CAHCET SOM",
          contact: "https://www.linkedin.com/in/shwetha-v-v-31b556224/",
        },
        {
          name: "Almohammed Bilal N",
          department: "CSE",
          currentPosition: "DevOps Engineer",
          contact: "https://www.linkedin.com/in/almohammed-bilal/",
        },
        {
          name: "Lokesh V",
          department: "CSE",
          currentPosition: "Cloud Platform Engineer at E2E Networks",
          contact: "https://www.linkedin.com/in/lokeshvasudevan/",
        },
        // Add more alumni...
      ],
    },
    {
      year: "2023",
      members: [
        {
          name: "Mohanapriya V",
          department: "CSE",
          currentPosition: "TSE at Zoho Corp",
          contact: "https://www.linkedin.com/in/mohanapriya-vigneshwaran-2002b61b7/",
        },
        {
          name: "Sivapriya T",
          department: "CSE",
          currentPosition: "M.Tech at VIT Vellore",
          contact: "https://www.linkedin.com/in/siva-priya-thirumalai2022/",
        },
        {
          name: "Arun Srinivasan",
          department: "IT",
          currentPosition: "Software Enginner at Relevantz",
          contact: "http://linkedin.com/in/arunsrinivasan03/",
        },
        {
          name: "Mohamed Waseem B",
          department: "CSE",
          currentPosition: "Salesforce Associate at Pentacloud Consulting",
          contact: "https://www.linkedin.com/in/mohamed-waseem-b-15a19a223/",
        },
        {
          name: "Priyadharshini S",
          department: "CSE",
          currentPosition: "Software Engineer",
          contact: "https://www.linkedin.com/in/priyadharshini-s-94114022a/",
        },
        {
          name: "Harun J",
          department: "CSE",
          currentPosition: "Software Tester",
          contact: "https://www.linkedin.com/in/harunkhanj/",
        },
        {
          name: "Sneha Baskaran",
          department: "CSE",
          currentPosition: "Junior Software Develepor",
          contact: "https://www.linkedin.com/in/snehabaskaran/",
        },
        // Add more alumni...
      ],
    },
    {
      year: "2021",
      members: [
        {
          name: "Aneesur Rahman P M",
          department: "IT",
          currentPosition: "Packaged App Development Senior Analyst at Accenture",
          contact: "https://www.linkedin.com/in/aneesurrahmanpm/",
        },
        {
          name: "Arel Shane G",
          department: "IT",
          currentPosition: "Instructional Designer at LKQ Corp",
          contact: "https://www.linkedin.com/in/arelshane/",
        },
        {
          name: "Chithira Menon P S",
          department: "IT",
          currentPosition: "Software Engineer at Honeywell HTS",
          contact: "https://www.linkedin.com/in/chithira-menon-p-s-3146b7160/",
        },
        // Add more alumni...
      ],
    }
    // Add more years...
  ]