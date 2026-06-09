import servicesData from '@/data/services.json';

export type ServiceTranslation = {
  title: string;
  description: string;
  longDescription: string;
};

export type Service = {
  slug: string;
  icon: string;
  color: string;
  subServices: string[];
  translations: Record<string, ServiceTranslation>;
};

export function getAllServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getAllServices().find((s) => s.slug === slug);
}
