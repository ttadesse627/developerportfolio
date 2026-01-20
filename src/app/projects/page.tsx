'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { projects } from '../../services/data';
import ProjectCard from '../../components/ProjectCard';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  
  // Extract all unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );
  
  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);
    
    return matchesSearch && matchesTech;
  });

  return (
    <div className="section-padding">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 dark:text-white">My Projects</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A collection of projects showcasing my skills and experience
          </p>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark bg-white dark:bg-surface-dark text-gray-900 dark:text-gray-100"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
              >
                <option value="All">All Technologies</option>
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 card">
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">No projects found</h3>
            <p className="text-secondary">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">{projects.length}</div>
            <div className="text-secondary">Total Projects</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-secondary">Featured</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">{allTechnologies.length}</div>
            <div className="text-secondary">Technologies Used</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary dark:text-primary-dark mb-2">
              {projects.filter(p => p.liveUrl).length}
            </div>
            <div className="text-secondary">Live Demos</div>
          </div>
        </div>
      </div>
    </div>
  );
}