const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "/placeholder-cat.png";
  
  // 1. If it's a full external URL (Unsplash, etc) or Data URI, return as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    // Check if it's our own backend URL already prepended (avoid double prepending)
    if (path.startsWith(BACKEND_URL)) {
        return path;
    }
    return path;
  }
  
  // 2. Standardize local path
  // Ensure it starts with /
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // 3. Prepend backend URL
  return `${BACKEND_URL}${cleanPath}`;
};
