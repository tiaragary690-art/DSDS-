
import React, { useState, useEffect, useRef } from 'react';
import { Upload, RotateCcw } from 'lucide-react';
import { getImageOverride, setImageOverride } from '../utils/imageStore';

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function EditableImage({ id, defaultSrc, alt, className, referrerPolicy }: EditableImageProps) {
  const [src, setSrc] = useState(getImageOverride(id) || defaultSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setSrc(getImageOverride(id) || defaultSrc);
    };
    window.addEventListener('image-override-updated', handleUpdate);
    return () => window.removeEventListener('image-override-updated', handleUpdate);
  }, [id, defaultSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageOverride(id, base64);
        setSrc(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const overrides = JSON.parse(localStorage.getItem('lt_image_overrides') || '{}');
      delete overrides[id];
      localStorage.setItem('lt_image_overrides', JSON.stringify(overrides));
      window.dispatchEvent(new Event('image-override-updated'));
      setSrc(defaultSrc);
    } catch (err) {
      console.error('Error resetting image override:', err);
      setSrc(defaultSrc);
    }
  };

  return (
    <div className={`relative group/editable ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" referrerPolicy={referrerPolicy} />
      
      {/* Edit Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/editable:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
          title="上传图片"
        >
          <Upload size={20} />
        </button>
        {src !== defaultSrc && (
          <button
            onClick={handleReset}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            title="恢复默认"
          >
            <RotateCcw size={20} />
          </button>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}
