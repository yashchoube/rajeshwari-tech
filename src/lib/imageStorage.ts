import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'blogs');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export interface ImageUploadResult {
  success: boolean;
  filename?: string;
  url?: string;
  error?: string;
  size?: number;
  dimensions?: { width: number; height: number };
}

export const saveImageFile = async (file: File): Promise<ImageUploadResult> => {
  try {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`
      };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      };
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const filename = `${uuidv4()}${fileExtension}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file
    fs.writeFileSync(filepath, buffer);

    // Get image dimensions
    const dimensions = await getImageDimensions(buffer);

    return {
      success: true,
      filename,
      url: `/uploads/blogs/${filename}`,
      size: file.size,
      dimensions
    };
  } catch (error) {
    console.error('Error saving image:', error);
    return {
      success: false,
      error: 'Failed to save image'
    };
  }
};

const getImageDimensions = async (buffer: Buffer): Promise<{ width: number; height: number }> => {
  try {
    // Basic image dimension detection for common formats
    // This is a simplified version - in production, use a library like 'sharp' or 'jimp'
    
    // Check for PNG
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { width, height };
    }
    
    // Check for JPEG
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] === 0xFF) {
          const marker = buffer[offset + 1];
          if (marker === 0xC0 || marker === 0xC2) { // SOF0 or SOF2
            const height = buffer.readUInt16BE(offset + 5);
            const width = buffer.readUInt16BE(offset + 7);
            return { width, height };
          }
          const segmentLength = buffer.readUInt16BE(offset + 2);
          offset += 2 + segmentLength;
        } else {
          break;
        }
      }
    }
    
    // Check for GIF
    if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      const width = buffer.readUInt16LE(6);
      const height = buffer.readUInt16LE(8);
      return { width, height };
    }
    
    // Check for WebP
    if (buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
      const width = buffer.readUInt16LE(24) + 1;
      const height = buffer.readUInt16LE(26) + 1;
      return { width, height };
    }
    
    // Default fallback
    return { width: 800, height: 600 };
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    return { width: 800, height: 600 };
  }
};

export const deleteImageFile = (filename: string): boolean => {
  try {
    const filepath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export const getImageUrl = (filename: string): string => {
  return `/uploads/blogs/${filename}`;
};
