import { Eye, Download, X } from "lucide-react";
import { useState } from "react";
import { useDocuments } from "../../../hooks/useDocuments";

const DocumentsSettings = () => {
  const { documents, loading } = useDocuments();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="text-gray-400 text-sm py-10 text-center">
        Loading documents...
      </div>
    );
  }

  if (!documents.length) {
    return (
      <div className="text-gray-400 text-sm py-10 text-center">
        No documents available
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your uploaded documents.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-md shadow-gray-100 overflow-hidden">
          {/* Table */}
          <table className="w-full text-sm">
            {/* Head */}
            <thead className="text-gray-400 text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left font-medium">
                  DOCUMENT TYPE
                </th>
                <th className="px-6 py-4 text-left font-medium">IDENTIFIER</th>
                <th className="px-6 py-4 text-left font-medium">UPLOAD DATE</th>
                <th className="px-6 py-4 text-left font-medium">STATUS</th>
                <th className="px-6 py-4 text-left font-medium">ACTIONS</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={doc._id ?? doc.identifier ?? index}
                  className="hover:bg-gray-50/70 transition"
                >
                  {/* TYPE */}
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {doc.type?.replace(/_/g, " ") || "-"}
                  </td>

                  {/* IDENTIFIER */}
                  <td className="px-6 py-5 text-gray-600">
                    {doc.identifier || "-"}
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5 text-gray-500">
                    {doc.uploadDate || "-"}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        doc.status === "Verified"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {/* VIEW */}
                      <button
                        onClick={() => doc.url && setSelectedDoc(doc.url)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      {/* DOWNLOAD */}
                      <a
                        href={doc.url}
                        download
                        className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition"
                        title="Download"
                      >
                        <Download size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full mx-4 p-5">
            {/* Close */}
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="w-full h-[75vh] flex items-center justify-center">
              {selectedDoc.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                <img
                  src={selectedDoc}
                  alt="Document"
                  className="max-h-full max-w-full rounded-lg"
                />
              ) : (
                <iframe
                  src={selectedDoc}
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentsSettings;
