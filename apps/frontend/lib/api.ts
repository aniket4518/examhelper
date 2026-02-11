export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3002";
 
export const api = (path: string) => `${API_BASE_URL}${path}`;
export const ws = (path?: string) => `${WS_BASE_URL}${path || ""}`;
