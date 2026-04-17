import { useEffect, useState } from "react";
import api from "../../../lib/axios";

export interface Category {
  _id: string;
  name: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories"); // adjust if needed
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
};