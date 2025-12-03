'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

import { X, Check, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

// ----------------------
// Update Type: Added
// Description: Created new ImageCropper component for cropping images before upload
// Updated By: Himanshu
// Updated Until: end of file
// ----------------------

interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedBlob: Blob) => void;
    onCancel: () => void;
    onSkip?: () => void;
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel, onSkip }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onRotationChange = (rotation: number) => {
        setRotation(rotation);
    };

    const onCropCompleteCallback = useCallback((croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
            image.src = url;
        });

    const getRadianAngle = (degreeValue: number) => {
        return (degreeValue * Math.PI) / 180;
    };

    const rotateSize = (width: number, height: number, rotation: number) => {
        const rotRad = getRadianAngle(rotation);
        return {
            width:
                Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
                Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        };
    };

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: { x: number; y: number; width: number; height: number },
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ): Promise<Blob | null> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return null;
        }

        const rotRad = getRadianAngle(rotation);

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        );

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth;
        canvas.height = bBoxHeight;

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
        ctx.rotate(rotRad);
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
        ctx.translate(-image.width / 2, -image.height / 2);

        // draw rotated image
        ctx.drawImage(image, 0, 0);

        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        );

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0);

        // As Blob
        return new Promise((resolve, reject) => {
            canvas.toBlob((file) => {
                if (file) {
                    resolve(file);
                } else {
                    reject(new Error('Canvas is empty'));
                }
            }, 'image/jpeg');
        });
    };

    const handleSave = async () => {
        try {
            if (!croppedAreaPixels) return;
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            if (croppedBlob) {
                onCropComplete(croppedBlob);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <h3 className="font-semibold text-gray-800">Edit Image</h3>
                    <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Cropper Area */}
                <div className="relative flex-1 min-h-[400px] bg-gray-900">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={undefined} // Free aspect ratio
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteCallback}
                        onZoomChange={onZoomChange}
                        onRotationChange={onRotationChange}
                    />
                </div>

                {/* Controls */}
                <div className="p-6 bg-white space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Zoom Control */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium text-gray-600">
                                <span className="flex items-center gap-1"><ZoomOut className="w-4 h-4" /> Zoom</span>
                                <span>{Math.round(zoom * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>

                        {/* Rotation Control */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium text-gray-600">
                                <span className="flex items-center gap-1"><RotateCw className="w-4 h-4" /> Rotate</span>
                                <span>{rotation}°</span>
                            </div>
                            <input
                                type="range"
                                value={rotation}
                                min={0}
                                max={360}
                                step={1}
                                aria-labelledby="Rotation"
                                onChange={(e) => setRotation(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            onClick={onCancel}
                            className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        {onSkip && (
                            <button
                                onClick={onSkip}
                                className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                            >
                                Skip Cropping
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Crop & Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
