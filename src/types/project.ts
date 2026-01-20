export interface Project {
  id: number;
  title: string;
  imageFolder: string;
  description: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
