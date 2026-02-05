import { create } from "zustand";

interface UploadedFilesState {
  files: Array<File>;

  addFiles: (files: Array<File>) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void; 
   
}

export const useUploadedFilesStore = create<UploadedFilesState>((set, get) => ({
  files: [], 
  addFiles: (newFiles) => {
    const currentFiles = get().files;
    const updatedFiles = [...currentFiles, ...newFiles].slice(0, 3);
    set({ files: updatedFiles });

  },
  removeFile: (index) => {
    const currentFiles = get().files;
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    set({ files: updatedFiles });
  },
  clearFiles: () => set({ files: [] }), 
   
 

}));
