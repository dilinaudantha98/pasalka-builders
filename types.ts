
export enum ProjectCategory {
  RESIDENTIAL = 'Residential',
  HOSPITALITY = 'Hotels & Restaurants',
  RETAIL = 'Showrooms',
  COMMERCIAL = 'Commercial',
  EDUCATIONAL = 'Educational',
  INDUSTRIAL = 'Industrial',
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  client: string;
  location: string;
  cost: string;
  timeline: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
}

export interface Milestone {
  year: number;
  description: string;
}
