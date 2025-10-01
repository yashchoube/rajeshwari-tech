'use client';

import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, RotateCw, Move, Download, Trash2, Edit3 } from 'lucide-react';

interface ImageDisplayProps {
  src: string;
  alt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  editable?: boolean;
}

const ImageDisplay = ({ 
  src, 
  alt = "Image", 
  onEdit, 
  onDelete, 
  className = "",
  editable = true 
}: ImageDisplayProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editable) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !editable) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.1));
  };

  const handleRotateLeft = () => {
    setRotation(prev => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation(prev => prev + 90);
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = alt || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (hasError) {
    return (
      <div className={`border-2 border-dashed border-red-300 rounded-lg p-8 text-center ${className}`}>
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <div className="text-red-600 font-medium mb-1">Failed to load image</div>
        <div className="text-red-500 text-sm">Please check the image URL or try uploading again</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Image Container */}
      <div 
        className="relative overflow-hidden rounded-lg"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.2s ease'
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`w-full h-auto transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${editable ? 'cursor-move' : 'cursor-default'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
        />
        
        {/* Loading State */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      {showControls && editable && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={handleZoomIn}
            className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleRotateLeft}
            className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
            title="Rotate Left"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleRotateRight}
            className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
            title="Rotate Right"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
            title="Reset"
          >
            <Move className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded shadow-sm transition-all"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white rounded shadow-sm transition-all"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Image Info */}
      {showControls && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          Scale: {Math.round(scale * 100)}% • Rotate: {rotation}°
        </div>
      )}

      {/* Instructions */}
      {editable && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Drag to move • Use controls to resize and rotate
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
