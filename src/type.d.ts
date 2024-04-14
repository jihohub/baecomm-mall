export interface ProductSimple {
  id: number;
  title: string;
  price: number;
  brand: string;
  thumbnail: string;
}

export interface ProductSpecific extends ProductSimple {
  description: string;
  images: string[];
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}
