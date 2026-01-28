
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
  price: string; // e.g., "Free" or "Paid"
  format: string; // e.g., "PDF", "EPUB"
}

export interface AdConfig {
  id: string;
  provider: string;
  label: string;
}
