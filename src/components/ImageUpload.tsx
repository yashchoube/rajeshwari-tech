'use client';

import { useState, useRef } from 'react';
import { Upload, X, RotateCcw, RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (url: string, filename: string) => void;
  onImageRemove: () => void;
  currentImage?: string;
  className?: string;
}

interface ImageTransform {
  scale: number;
  rotation: number;
  x: number;
  y: number;
}

const ImageUpload = ({ onImageUpload, onImageRemove, currentImage, className = '' }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(currentImage || null);
  const [uploadedFilename, setUploadedFilename] = useState<string>('');
  const [transform, setTransform] = useState<ImageTransform>({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedImage(result.url);
        setUploadedFilename(result.filename);
        onImageUpload(result.url, result.filename);
      } else {
        alert(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFilename('');
    onImageRemove();
  };

  const handleTransform = (newTransform: Partial<ImageTransform>) => {
    setTransform(prev => ({ ...prev, ...newTransform }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetTransform = () => {
    setTransform({ scale: 1, rotation: 0, x: 0, y: 0 });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {!uploadedImage ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">Upload Image</p>
          <p className="text-sm text-gray-500 mb-4">
            Click to select or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG, WEBP, GIF up to 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image Preview with Transform Controls */}
          <div className="relative border rounded-lg overflow-hidden bg-gray-50">
            <div
              className="relative cursor-move select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s ease'
              }}
            >
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="max-w-full h-auto block"
                style={{ maxHeight: '400px' }}
              />
            </div>
            
            {/* Remove Button */}
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Transform Controls */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700 mr-2">Adjust:</span>
            
            {/* Scale Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleTransform({ scale: Math.max(0.1, transform.scale - 0.1) })}
                className="p-1 hover:bg-gray-200 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-600 min-w-[3rem] text-center">
                {Math.round(transform.scale * 100)}%
              </span>
              <button
                onClick={() => handleTransform({ scale: Math.min(3, transform.scale + 0.1) })}
                className="p-1 hover:bg-gray-200 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Rotation Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleTransform({ rotation: transform.rotation - 90 })}
                className="p-1 hover:bg-gray-200 rounded"
                title="Rotate Left"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleTransform({ rotation: transform.rotation + 90 })}
                className="p-1 hover:bg-gray-200 rounded"
                title="Rotate Right"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetTransform}
              className="p-1 hover:bg-gray-200 rounded"
              title="Reset"
            >
              <Move className="w-4 h-4" />
            </button>

            <div className="text-xs text-gray-500 ml-auto">
              Drag to move • Scroll to zoom
            </div>
          </div>

          {/* Image Info */}
          <div className="text-xs text-gray-500">
            <p>Filename: {uploadedFilename}</p>
            <p>Transform: Scale {Math.round(transform.scale * 100)}%, Rotate {transform.rotation}°</p>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-indigo-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
            Uploading...
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
