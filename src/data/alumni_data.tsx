
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
          currentPosition: "Software Engineer",
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
        // Add more alumni...
      ],
    },
    {
      year: "2023",
      members: [
        {
          name: "Mohanapriya",
          department: "Computer Science",
          currentPosition: "TSE at Zoho ",
          contact: "https://www.linkedin.com/in/mohanapriya-vigneshwaran-2002b61b7/",
        },
        // Add more alumni...
      ],
    },
    // Add more years...
  ]