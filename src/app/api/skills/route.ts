import { NextResponse } from 'next/server';
import { Skill } from '@/types/skill';


export async function GET() {

    const detailedSkills: Skill[] = [
      { name: "ASP.NET Core", level: 90, category: "Backend" },
      { name: "TypeScript", level: 90, category: "Language" },
      { name: "React", level: 85, category: "Frontend" },
      { name: "Next.js", level: 85, category: "Frontend" },
      { name: "SQL", level: 90, category: "Database" },
      { name: "Angular", level: 30, category: "Frontend" },
      { name: "Docker", level: 75, category: "DevOps" },
      { name: "AWS", level: 30, category: "Cloud" },
    ];



  try {

    return NextResponse.json(detailedSkills);
  } catch {
    return NextResponse.json([]);
  }
}
