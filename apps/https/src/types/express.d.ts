 declare global {
  namespace Express {
    interface Request {
      userId?: string; // or number, or a full User object
    }
  }
}