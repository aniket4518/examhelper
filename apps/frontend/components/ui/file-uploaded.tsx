import React from "react";
import { useUploadedFilesStore } from "../../hooks/zustand/handeluploads";

export default function FileUploaded() {
  const { files } = useUploadedFilesStore();
  if (!files.length) return <div>No files uploaded.</div>;
  return (
    <div>
      <h3 className="font-bold mb-2">Uploaded Files:</h3>
      <ul className="list-disc pl-5">
        {files.map((file, idx) => (
          <li key={file.name + idx}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
