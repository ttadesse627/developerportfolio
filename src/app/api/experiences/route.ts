import { NextResponse } from 'next/server';
import { Experience } from '@/types/experience';


export async function GET() {

    const experiences: Experience[] = [
      {
      title: "Software Developer",
      company: "Private",
      period: "Nov 2025 - Present",
      descriptions: [
        "Building scalable APIs, microservices architecture using ASP.NET Core, Frontend applications using React and Next.js"
      ]
    },
    {
      title: "Junior Software Developer",
      company: "AppDiv Systems Development Plc.",
      period: "Mar 2023 - Nov 2025", 
      descriptions: [
        "Built and maintained scalable REST APIs using ASP.NET Core, EF Core, and Clean Architecture.",
        "Implemented RBAC, 2F Authentication, and activity workflows to improve system security.",
        "Integrated Redis caching and Elasticsearch, improving API performance and search efficiency.",
        "Designed and optimized database schemas, stored procedures, and functions to reduce query latency.",
        "Performed API testing (Postman) and load testing (JMeter), fixing defects and improving system stability.",
        "Implemented CI/CD pipelines with Docker and GitHub Actions.",
        "Collaborated with cross-functional teams using Azure Boards to deliver features on schedule."
      ],
    },
    
  ];

  try {

    return NextResponse.json(experiences);
  } catch {
    return NextResponse.json([]);
  }
}
