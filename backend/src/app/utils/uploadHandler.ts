import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

// Standard upload directory
const UPLOAD_ROOT = 'uploads';

/**
 * Ensures directory exists
 */
const ensureDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Global Image Optimization System
 * Converts to WebP, Compresses, and Saves
 */
export const optimizeAndSaveImage = async (
  file: Express.Multer.File,
  subFolder: string
): Promise<string> => {
  const uploadPath = path.join(UPLOAD_ROOT, subFolder);
  ensureDir(uploadPath);

  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
  const filePath = path.join(uploadPath, fileName);

  await sharp(file.buffer)
    .webp({ quality: 80 }) // High visual quality, efficient size
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }) // Responsive limits
    .toFile(filePath);

  // Return the public path (including /uploads prefix for static serving)
  return `/${UPLOAD_ROOT}/${subFolder}/${fileName}`;
};

/**
 * Multer configuration for Memory Storage
 * We use memory storage because we want to process the buffer with Sharp
 */
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new ApiError(httpStatus.BAD_REQUEST, 'Only image files are allowed!'));
  },
});
