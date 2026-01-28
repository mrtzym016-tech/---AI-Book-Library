
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  downloadUrl: string;
  category: string;
  views: number;
  downloads: number;
  trending: boolean;
  seoKeywords: string[];
  metaDescription: string;
  price: string;
  format: string;
  pagesCount?: number;
  rating?: number;
  ratingCount?: number;
}

export interface AdConfig {
  id: string;
  provider: string;
  label: string;
}
