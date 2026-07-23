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
  description: string;
  longDescription: string;
  tags: string[];
  links: { github: string; live: string };
  features: string[];
}

export interface ApiResponse<T> {
  data: T[];
  total?: number;
  page?: number;
}
