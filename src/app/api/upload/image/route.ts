import { NextRequest, NextResponse } from 'next/server';
import { saveImageFile } from '@/lib/imageStorage';

// ----------------------
// Update Type: Added
// Description: Created new Upload Image Route for handling file uploads
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({
        error: 'No image file provided'
      }, { status: 400 });
    }

    // Security: Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
      }, { status: 400 });
    }

    // Security: Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 5MB.'
      }, { status: 400 });
    }

    const result = await saveImageFile(file);

    if (!result.success) {
      return NextResponse.json({
        error: result.error
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      filename: result.filename,
      url: result.url,
      size: result.size,
      dimensions: result.dimensions
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({
      error: 'Failed to upload image'
    }, { status: 500 });
  }
}

