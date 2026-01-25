import { create } from "zustand";

interface UploadedFilesState {
  files: Array<File>;
  setFiles: (files: Array<File>) => void;
  clearFiles: () => void;
  hasFile: boolean;
}

export const useUploadedFilesStore = create<UploadedFilesState>((set) => ({
  files: [],
  setFiles: (files) => set({ files, hasFile: files.length >0 }),
  clearFiles: () => set({ files: [], hasFile: false }),
  hasFile: false,
}));
