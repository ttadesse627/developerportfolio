

import { AboutInfo } from '@/types/about-info';
import { NextResponse } from 'next/server';


export async function GET() {

    const aboutInfo: AboutInfo = {
        name: "Tesfaye Tadesse",
        title: "Software Developer",
        bio: "Passionate software developer with 3+ years of experience building web applications. Specializing in ASP.NET Core, React, and cloud technologies. I love creating efficient, scalable solutions that solve real-world problems.",
        email: "ttadesse627@gmail.com",
        location: "Bishoftu, Oromia",
        experience: "3+ years",
        education: "BSc. in Software Engineering",
    };

  try {

    return NextResponse.json(aboutInfo);
  } catch {
    return NextResponse.json([]);
  }
}


