export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ConsultingService {
  title: string;
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface Services {
  title: string;
  additionalTitle: string;
  mainServices: Service[];
  consulting: ConsultingService;
  maintenance: ConsultingService;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
    keywords: string;
    socialLinks: {
      linkedin: string;
      github: string;
      twitter: string;
    };
  };
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    contact: string;
  };
  services: Services;
  [key: string]: any; // For other sections
}

export type Language = 'en' | 'he'; 