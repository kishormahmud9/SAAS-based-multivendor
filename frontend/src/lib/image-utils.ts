const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "/placeholder-cat.png";
  
  // 1. If it's a full external URL or Data URI, return as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // 2. Standardize local path
  // Remove any leading slashes from the path to avoid double slashes with BACKEND_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // 3. Construct and return the full URL
  return `${BACKEND_URL}/${cleanPath}`;
};
