import { ExternalLink, Star } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import { Project } from '@/types/project';
import ProjectGallery from './ProjectGallery';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{project.title}</h3>
          {project.featured && (
            <span className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-semibold">
              <Star className="h-4 w-4 mr-1" />
              Featured
            </span>
          )}
        </div>

        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <ProjectGallery
            folderName={project.imageFolder} 
            projectTitle={project.title}
          />
        </div>
        
        <p className="text-secondary mb-4">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-dark rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Features:</h4>
          <ul className="space-y-1">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start text-secondary">
                <span className="text-primary dark:text-primary-dark mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex-1"
            >
              <SocialIcon
                network='github'
                className="h-5 w-5 mr-2"
                as='span'
              />
              Repo
            </a>
          )}
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-lg hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors flex-1"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}