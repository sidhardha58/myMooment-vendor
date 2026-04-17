import React, { useState } from "react";

export default function FileUpload({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);

    const newPreviews = newFiles.map((file) =>
      file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
    );
    setPreviews([...previews, ...newPreviews]);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="w-full">
      {/* LABEL */}
      <label className="text-sm text-gray-600 mb-2 block font-medium">
        Proof Upload
      </label>

      {/* UPLOAD BOX */}
      <label className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-blue-400 transition-colors duration-200 text-center w-full bg-gray-50">
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="hidden"
        />

        <p className="text-sm text-gray-600">Click to upload or drag & drop</p>
        <p className="text-xs text-gray-400 mt-1">
          Images, PDF, or DOC (Max 5 files, 10MB each)
        </p>
      </label>

      {/* UPLOADED FILES */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4 w-full">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center bg-gray-100 rounded-md p-2 text-gray-600 text-xs w-full md:w-48"
            >
              {/* REMOVE BUTTON */}
              <button
                onClick={() => handleRemove(i)}
                className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
                title="Remove file"
              >
                ✕
              </button>

              {/* IMAGE PREVIEW */}
              {file.type.startsWith("image/") && previews[i] ? (
                <img
                  src={previews[i]}
                  alt={file.name}
                  className="w-full h-32 object-cover rounded-md mb-1"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded-md mb-1"></div>
              )}

              {/* FILE NAME */}
              <span className="truncate w-full text-center" title={file.name}>
                {file.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
