import { useEffect, useState } from "react";
import { getVendorDocuments } from "../api/documentApi";
import type { VendorDocument } from "../types/document.types";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<VendorDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await getVendorDocuments();

        const rawDocs = res?.data || [];

        // ✅ MAP BACKEND → FRONTEND
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedDocs: VendorDocument[] = rawDocs.map((doc: any) => ({
          _id: doc._id || "",
          type: doc.type?.toUpperCase() || "DOCUMENT",
          identifier: doc.identifier || doc.number || "-", // fallback
          uploadDate: doc.createdAt
            ? new Date(doc.createdAt).toLocaleDateString()
            : "-",
          status: doc.is_verified ? "Verified" : "Pending",
          url: doc.document_url || doc.url || "",
        }));

        setDocuments(mappedDocs);
      } catch (err) {
        console.error("Documents fetch failed:", err);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  return { documents, loading };
};
