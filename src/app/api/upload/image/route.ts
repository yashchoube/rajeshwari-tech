import { NextRequest, NextResponse } from 'next/server';
import { saveImageFile } from '@/lib/imageStorage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ 
        error: 'No image file provided' 
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
