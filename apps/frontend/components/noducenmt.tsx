import { FiFilePlus } from "react-icons/fi"
import { useUploadedFilesStore } from "../hooks/zustand/handeluploads"

export default function Nodocs() {
    const { files, hasFile } = useUploadedFilesStore()
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
                <FiFilePlus className="text-xl text-neutral-500" />
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
                Saved sources will appear here.
                <br />
                <span className="text-neutral-600">Click Add Resources above to add PDFs, text or images.</span>
            </p>
        </div>
    )
}