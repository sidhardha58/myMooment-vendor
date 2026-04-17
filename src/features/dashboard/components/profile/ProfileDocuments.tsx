import { Eye, FileText, X } from "lucide-react";
import { useState } from "react";
import type { VendorDocument } from "../../types/document.types";

type Props = {
  documents: VendorDocument[];
};

export default function ProfileDocuments({ documents }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  if (!documents || documents.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6">
        <p className="text-gray-400 text-sm">No documents found</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5">
          <FileText className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            Uploaded Documents
          </h2>
        </div>

        <div className="h-px bg-gray-100 mx-6" />

        <div className="px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-xs tracking-wider">
                <th className="py-3 text-left">DOCUMENT TYPE</th>
                <th className="py-3 text-left">IDENTIFIER</th>
                <th className="py-3 text-left">UPLOAD DATE</th>
                <th className="py-3 text-left">STATUS</th>
                <th className="py-3 text-left">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc?._id || doc?.identifier}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium text-gray-800">
                    {doc?.type || "-"}
                  </td>

                  <td className="py-4 text-gray-600">
                    {doc?.identifier || "-"}
                  </td>

                  <td className="py-4 text-gray-600">
                    {doc?.uploadDate || "-"}
                  </td>

                  <td className="py-4">
                    <span className="px-2.5 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-md">
                      {doc?.status || "Pending"}
                    </span>
                  </td>

                  <td className="py-4">
                    <button
                      onClick={() => doc?.url && setSelectedDoc(doc.url)}
                      className="text-gray-400 hover:text-blue-500 transition"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedDoc(null)}
          />

          <div className="relative bg-white rounded-xl shadow-lg max-w-3xl w-full mx-4 p-4">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full h-[70vh] flex items-center justify-center">
              {selectedDoc.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                <img
                  src={selectedDoc}
                  alt="Document"
                  className="max-h-full max-w-full rounded-md"
                />
              ) : (
                <iframe
                  src={selectedDoc}
                  className="w-full h-full rounded-md"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
