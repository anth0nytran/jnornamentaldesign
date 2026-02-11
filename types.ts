export interface Review {
  name: string;
  text: string;
  source: 'Facebook' | 'Thumbtack' | 'Google' | 'Yelp';
  date?: string;
  stars: number;
  project?: string;
  themes?: string[];
  category?: 'fences' | 'gates' | 'railings' | 'access-control' | 'general';
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface ServiceCategory {
  title: string;
  slug: string;
  description: string;
  heroImage: string;
  services: Service[];
  gallery: string[];
}

export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  languages: string[];
  yearsExperience: string;
  rating: number;
  reviewCount: number;
  serviceAreas: string[];
  credentials: string[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    thumbtack?: string;
  };
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  type?: 'image' | 'video';
  orientation?: 'portrait' | 'landscape';
}
