'use client'

import { Calendar, MapPin, GraduationCap, Briefcase, Download } from 'lucide-react';
import SkillBadge from '@/components/SkillBadge';
import { useEffect, useState } from 'react';
import { Experience } from '@/types/experience';
import { Skill } from '@/types/skill';
import { AboutInfo } from '@/types/about-info';
import Image from 'next/image'

export default function AboutPage() {
 
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [aboutInfo, setAboutInfo] = useState<AboutInfo>();
    const [loading, setLoading] = useState(false);

     useEffect(() => {
    async function loadExperiences() {
      const res = await fetch('/api/experiences');

      console.log("Response from the server: ", res)
      const data = await res.json();
      setExperiences(data);
      setLoading(false);
    }

    async function loadSkills() {
      const res = await fetch('/api/skills');

      console.log("Response from the server: ", res)
      const data = await res.json();
      setSkills(data);
      setLoading(false);
    }

    async function loadAboutInfo() {
      const res = await fetch('/api/about-info');

      console.log("Response from the server: ", res)
      const data = await res.json();
      setAboutInfo(data);
      setLoading(false);
    }

    loadExperiences();
    loadSkills();
    loadAboutInfo();
  }, []);



//   if (loading) {
//     return (
//       <div className="aspect-video flex items-center justify-center">
//         Loading images…
//       </div>
//     );
//   }

//   if (images.length === 0) {
//     return (
//       <div className="aspect-video flex items-center justify-center text-gray-500">
//         No images found
//       </div>
//     );
//   }

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="section-padding">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 dark:text-white">About Me</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Passionate software developer creating impactful digital solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Personal Info */}
          { aboutInfo &&
          (<div className="lg:col-span-1">
            <div className="card p-8 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary to-accent dark:from-primary-dark dark:to-accent-dark rounded-full mb-6 overflow-hidden">
                  {/* Replace with actual image */}
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-600 dark:text-gray-400">
                        <Image
                          src={'/profile.jpg'}
                          alt="Profile Picture"
                          width={192}
                          height={192}
                          sizes="(max-width: 768px) 100vw, 200px"
                          className="rounded-full object-cover"
                          priority
                        />
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold dark:text-white">{aboutInfo.name}</h2>
                <p className="text-primary dark:text-primary-dark font-medium">{aboutInfo.title}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-secondary">
                  <MapPin className="h-5 w-5 mr-3 text-primary dark:text-primary-dark" />
                  <span>{aboutInfo.location}</span>
                </div>
                <div className="flex items-center text-secondary">
                  <Calendar className="h-5 w-5 mr-3 text-primary dark:text-primary-dark" />
                  <span>{aboutInfo.experience} Experience</span>
                </div>
                <div className="flex items-center text-secondary">
                  <GraduationCap className="h-5 w-5 mr-3 text-primary dark:text-primary-dark" />
                  <span>{aboutInfo.education}</span>
                </div>
                <div className="flex items-center text-secondary">
                  <Briefcase className="h-5 w-5 mr-3 text-primary dark:text-primary-dark" />
                  <span>Available for Freelance</span>
                </div>
              </div>

              <a
                href="../../tesfaye_tadesse_resume.pdf"
                download
                className="w-full mt-8 btn-primary flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Resume
              </a>
            </div>
          </div>)}

          {/* Right Column - Bio and Experience */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}


            {aboutInfo &&
            (<div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">My Story</h3>
              <p className="text-secondary mb-6">
                {aboutInfo.bio}
              </p>
              <p className="text-secondary">
                I believe in writing clean, maintainable code and following best practices.
                My approach combines technical expertise with strong communication skills
                to deliver high-quality solutions that exceed expectations.
              </p>
            </div>)}

            {/* Experience */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-8 dark:text-white">Professional Experience</h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l border-primary dark:border-primary-dark last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary dark:bg-primary-dark rounded-full"></div>
                    <div className="mb-2">
                      <h4 className="text-xl font-semibold dark:text-white">{exp.title}</h4>
                      <div className="flex items-center text-secondary mb-2">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {exp.company}
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                    </div>
                    <div className="py-4 px-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                      <ul className="space-y-3">
                        {exp.descriptions.map((description, descIndex) => (
                          <li 
                            key={descIndex} 
                            className="flex items-start text-secondary transition-all duration-200 hover:translate-x-1"
                          >
                            {/* Custom bullet with checkmark */}
                            <div className="flex-shrink-0 w-6 h-6 mt-0.5 mr-3 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-dark"></div>
                            </div>
                            
                            {/* Task content */}
                            <div className="flex-1">
                              <span className="leading-relaxed">{description}</span>
                              
                              {/* Optional: Add icons for specific task types */}
                              {description.toLowerCase().includes('lead') && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                                  Leadership
                                </span>
                              )}
                              {description.toLowerCase().includes('implement') && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                                  Development
                                </span>
                              )}
                              {description.toLowerCase().includes('secur') && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                                  Security
                                </span>
                              )}
                              {description.toLowerCase().includes('test') && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                                  Testing
                                </span>
                              )}
                              {['performance' , 'enhance', 'efficien' , 'optimiz'].some(word => description.toLowerCase().includes(word)) && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                                  Performance Optimization
                                </span>
                              )}
                              {description.toLowerCase().includes('collaborat') && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                                  Collaboration
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills by Category */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-8 dark:text-white">Technical Skills</h3>
              <div className="space-y-8">
                {categories.map((category) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold mb-4 text-primary dark:text-primary-dark">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skills
                        .filter(skill => skill.category === category)
                        .map((skill) => (
                          <SkillBadge key={skill.name} skill={skill.name} level={skill.level} />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Education & Certifications</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">Bachelor of Science in Computer Science</h4>
                    <p className="text-secondary">Stanford University • 2013-2017</p>
                    <p className="text-secondary mt-1">Graduated Magna Cum Laude with Honors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white">Certifications</h4>
                    <ul className="text-secondary space-y-1 mt-1">
                      <li>• AWS Certified Solutions Architect - Associate</li>
                      <li>• Microsoft Certified: Azure Developer Associate</li>
                      <li>• Google Professional Cloud Developer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}