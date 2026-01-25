import {create} from "zustand"
 type  uploadVisibilityState={
 showUpload:boolean,
 setUpload:(value:boolean) =>void
  
 }
export const useUploadStore = create < uploadVisibilityState > ((set)=>({
    showUpload : false,
    setUpload:(value)=>set({showUpload:value}),
    
}))
 