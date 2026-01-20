import { ArrowRight, Database, Cloud, Users, Server } from 'lucide-react';
import Link from 'next/link';
import { projects, skills } from '../services/data';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';

export default function HomePage() {
  const featuredProjects = projects.filter(project => project.featured);
  
  const services = [
    {
      icon: Server,
      title: "Backend Development",
      description: "Building robust APIs and server-side logic with ASP.NET Core, Node.js"
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Designing and optimizing SQL and NoSQL databases"
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Deploying and managing applications on cloud platforms"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Working effectively in agile development teams"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-secondary dark:from-gray-800 dark:to-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Full Stack Developer
                <span className="block text-primary dark:text-primary-dark mt-2">Building Digital Solutions</span>
              </h1>
              <p className="text-xl text-gray-300 dark:text-gray-400 mb-8">
                I create efficient, scalable web applications using modern technologies
                like ASP.NET Core, React, and DevOps platforms.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="btn-primary">
                  View Projects <ArrowRight className="inline ml-2 h-5 w-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get In Touch
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 transform rotate-3">
                <div className="bg-white/5 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 -rotate-3">
                  <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-primary-dark">3+</div>
                      <div className="text-gray-300 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-primary-dark">15+</div>
                      <div className="text-gray-300 dark:text-gray-400">Projects Completed</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-primary-dark">5+</div>
                      <div className="text-gray-300 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-3xl font-bold text-primary dark:text-primary-dark">15+</div>
                      <div className="text-gray-300 dark:text-gray-400">Technologies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What I Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="card hover:shadow-xl transition-shadow p-3 "
              >
                <div className='flex justify-center'>
                  <service.icon className="h-12 w-12 text-primary dark:text-primary-dark mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{service.title}</h3>
                <p className="text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-gray-100 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white">Featured Projects</h2>
            <Link href="/projects" className="text-primary dark:text-primary-dark hover:text-primary/80 dark:hover:text-primary-dark/80 font-medium">
              View All Projects <ArrowRight className="inline ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}