export type MenuItem = {
  name: string;
  description: string;
  image?: File | null;
  imagePreview?: string;
};

export type Section = {
  name: string;
  selectionType: "all" | "limited";
  maxSelectable?: number;
  items: MenuItem[];
};

export type MenuData = {
  name: string;
  type: "veg" | "nonveg";
  price: number;
  minMembers: number;
  maxMembers: number;

  image?: File | null;
  imagePreview?: string;

  sections: Section[];
};