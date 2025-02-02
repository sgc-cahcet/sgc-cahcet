
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
          department: "Computer Science",
          currentPosition: "Software Engineer ",
          contact: "https://www.linkedin.com/in/mdrafique",
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