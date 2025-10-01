'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, RotateCcw, RotateCw, ZoomIn, ZoomOut, Move, Download, Trash2, Edit3 } from 'lucide-react';

interface ImageManagerProps {
  onImageSelect: (url: string, filename: string) => void;
  onImageRemove: (filename: string) => void;
  className?: string;
}

interface UploadedImage {
  filename: string;
  url: string;
  size: number;
  dimensions: { width: number; height: number };
  uploadedAt: string;
}

const ImageManager = ({ onImageSelect, onImageRemove, className = '' }: ImageManagerProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [showManager, setShowManager] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('uploadedImages');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error('Error loading saved images:', error);
      }
    }
  }, []);

  // Save images to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem('uploadedImages', JSON.stringify(images));
  }, [images]);

  const handleFileUpload = async (file: File) => {
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
        const newImage: UploadedImage = {
          filename: result.filename,
          url: result.url,
          size: result.size,
          dimensions: result.dimensions,
          uploadedAt: new Date().toISOString()
        };

        setImages(prev => [newImage, ...prev]);
        setSelectedImage(newImage);
        onImageSelect(result.url, result.filename);
        setShowManager(false);
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

  const handleImageSelect = (image: UploadedImage) => {
    setSelectedImage(image);
    onImageSelect(image.url, image.filename);
    setShowManager(false);
  };

  const handleImageDelete = (filename: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(img => img.filename !== filename));
      onImageRemove(filename);
      if (selectedImage?.filename === filename) {
        setSelectedImage(null);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <Upload className="w-4 h-4" />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
        
        {images.length > 0 && (
          <button
            onClick={() => setShowManager(!showManager)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Manage Images ({images.length})
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
          e.target.value = '';
        }}
        className="hidden"
      />

      {/* Image Manager Modal */}
      {showManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Image Manager</h2>
                <button
                  onClick={() => setShowManager(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {images.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📷</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No images yet</h3>
                  <p className="text-gray-600 mb-6">Upload your first image to get started</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Upload Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.filename}
                      className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedImage?.filename === image.filename
                          ? 'border-indigo-500 ring-2 ring-indigo-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleImageSelect(image)}
                    >
                      <img
                        src={image.url}
                        alt="Uploaded image"
                        className="w-full h-32 object-cover"
                      />
                      
                      {/* Image Info Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                          <div className="text-sm font-medium mb-1">Click to Use</div>
                          <div className="text-xs">{image.dimensions.width} × {image.dimensions.height}</div>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageDelete(image.filename);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      {/* Selected Indicator */}
                      {selectedImage?.filename === image.filename && (
                        <div className="absolute top-2 left-2 bg-indigo-500 text-white rounded-full p-1">
                          <X className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{images.length} image{images.length !== 1 ? 's' : ''} uploaded</span>
                <span>Click on an image to use it in your content</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">Selected Image</h4>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={selectedImage.url}
              alt="Selected"
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                <div>{selectedImage.dimensions.width} × {selectedImage.dimensions.height}</div>
                <div>{formatFileSize(selectedImage.size)}</div>
                <div>Uploaded {formatDate(selectedImage.uploadedAt)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
