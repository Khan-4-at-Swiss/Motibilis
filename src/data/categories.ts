import { getAssetUrl } from '@/lib/assets';

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Academic Tools",
    description:
      "Powerful software solutions designed for students, educators, and academic institutions. Streamline research, manage coursework, and enhance learning experiences.",
    imageUrl: getAssetUrl("images/academic.jpg"),
    sortOrder: 1,
  },
  {
    id: 2,
    name: "Professional Tools",
    description:
      "Enterprise-grade productivity software for businesses and professionals. Automate workflows, manage projects, and boost team efficiency.",
    imageUrl: getAssetUrl("images/professional.jpg"),
    sortOrder: 2,
  },
  {
    id: 3,
    name: "Games",
    description:
      "Games that can be played by anyone, regardless of their technical expertise.",
    imageUrl: getAssetUrl("images/games.jpg"),
    sortOrder: 3,
  },
];

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id);
}