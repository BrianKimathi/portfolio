export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  stack: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
  features?: string[];
}

export interface ApiResponse<T> {
  data: T[];
  total?: number;
  page?: number;
}
