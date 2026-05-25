export type Language = "en" | "bn";

export interface ServiceDetail {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  icon: string;
  subservices: string[];
}

export interface PortfolioItem {
  id: string;
  titleEn: string;
  titleBn: string;
  category: "all" | "web" | "branding" | "marketing" | "video";
  categoryLabelEn: string;
  categoryLabelBn: string;
  image: string;
  stats?: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  roleEn: string;
  roleBn: string;
  company: string;
  contentEn: string;
  contentBn: string;
  rating: number;
  avatar: string;
}
