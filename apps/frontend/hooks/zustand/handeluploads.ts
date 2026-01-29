import { create } from "zustand";

interface UploadedFilesState {
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  addFiles: (files: Array<File>) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  hasFile: boolean;
}
export const useUploadedFilesStore = create<UploadedFilesState>((set, get) => ({
  files: [],
  setFiles: (files) => set({ files, hasFile: files.length > 0 }),
  addFiles: (newFiles) => {
    const currentFiles = get().files;
    const updatedFiles = [...currentFiles, ...newFiles].slice(0, 3);
    set({ files: updatedFiles, hasFile: updatedFiles.length > 0 });
  },
  removeFile: (index) => {
    const currentFiles = get().files;
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    set({ files: updatedFiles, hasFile: updatedFiles.length > 0 });
  },
  clearFiles: () => set({ files: [], hasFile: false }),
  hasFile: false,
}));
