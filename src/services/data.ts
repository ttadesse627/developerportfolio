import { Project } from "@/types/project";
import { Skill } from "@/types/skill";


export const gitHubProfile: string = "https://github.com/ttadesse627";
export const projects: Project[] = [
  {
    id: 1,
    title: "Temporal Warehouse",
    imageFolder: "temporal-warehouse-screenshots",
    description: "An Inventory management system that enables products storage management",
    technologies: ['ASP.NET Core', 'JWT', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    features: [
      "Products add, update, delete and views",
      "Transaction history",
      "Email Notification on product scarce, expire, etc",
      "Stock level tracking",
      "Report generation",
      "User Management",
      "Admin control panel",
      "Role-based access control",
    ],
    liveUrl: "https://temporal-warehouse.vercel.app",
    githubUrl: gitHubProfile+"/TemporalWarehouse",
    featured: true,
  },
  {
    id: 2,
    title: "Employment Agency System",
    imageFolder: 'employment-agency-screenshots',
    description: "An API that is built using Asp.Net Core and MySQL database using EF Core.",
    technologies: ['ASP.NET Core', 'EF Core', 'SignalR', 'MySQL'],
    features: [
      "User authentication and permission-based authorization",
      "Real-time search",
      "Flexible Reports Generation",
      "Email Notification for applicants"
    ],
    liveUrl: undefined,
    githubUrl: gitHubProfile+"/smartagency",
    featured: true,
  },
  {
    id: 3,
    title: "Class Scheduling App",
    imageFolder: "class-scheduling-screenshots",
    description: "A class scheduling app that generates a schedule for sections of an institute.",
    technologies: ['ASP.NET Core', 'EF Core', 'MySQL'],
    features: [
      "Section Schedule Generation",
      "Minimized conflicts",
      "User authentication and permission-based authorization",
    ],
    liveUrl: undefined,
    githubUrl: gitHubProfile+"/ClassSchedulerApp",
    featured: false,
  },
  {
    id: 4,
    title: "E-commerce System",
    imageFolder: "e-commerce-screenshots",
    description: "An online shopping platform.",
    technologies: ['Next.js', 'ASP.NET Core', 'PostgreSQL', 'Redis'],
    features: [
      "Product catalog with search and filters",
      "Shopping cart and checkout",
      "Order tracking system",
      "Admin and Seller dashboards",
    ],
    liveUrl: undefined,
    githubUrl: gitHubProfile+"/OrderManagementSystem",
    featured: true,
  },
  
];

export const skills = ["ASP.NET Core", "SQL", "React", "Angular", "Git", "TypeScript", "MongoDB", "Docker", "AWS"];

export const detailedSkills: Skill[] = [
  { name: "ASP.NET Core", level: 90, category: "Backend" },
  { name: "TypeScript", level: 90, category: "Language" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "SQL", level: 90, category: "Database" },
  { name: "Angular", level: 30, category: "Frontend" },
  { name: "Docker", level: 75, category: "DevOps" },
  { name: "AWS", level: 30, category: "Cloud" },
];

export const aboutInfo = {
  name: "Tesfaye Tadesse",
  title: "Software Developer",
  bio: "Passionate software developer with 3+ years of experience building web applications. Specializing in ASP.NET Core, React, and cloud technologies. I love creating efficient, scalable solutions that solve real-world problems.",
  email: "ttadesse627@gmail.com",
  location: "Bishoftu, Oromia",
  experience: "3+ years",
  education: "B.S. in Software Engineering",
};