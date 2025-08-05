export interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  category: 'energy' | 'sleep' | 'stress' | 'omega' | 'focus';
  rating: number;
  reviews: number;
  featuredReview: string;
  mercadolibre: string;
  benefits: string[];
  ingredients: string[];
  contraindications: string[];
}