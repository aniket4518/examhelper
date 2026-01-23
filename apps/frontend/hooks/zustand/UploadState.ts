import {create} from "zustand"
 type  uploadVisibilityState={
 showUpload:boolean,
 setUpload:(value:boolean) =>void
  
 }
export const useUploadStore = create < uploadVisibilityState > ((Set)=>({
    showUpload : false,
    setUpload:(value)=>Set({showUpload:value}),
    
}))
 