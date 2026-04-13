'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = 'Cover Image', className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetStatus = (isError = false) => {
    setTimeout(() => setUploadStatus('idle'), isError ? 5000 : 2500);
  };

  const handleUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Upload API failure:', data);
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
      setUploadStatus('success');
      resetStatus();
    } catch (err: any) {
      console.error('Upload handler error:', err);
      setErrorMsg(err.message);
      setUploadStatus('error');
      resetStatus(true);
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleRemove = () => {
    onChange('');
    setUploadStatus('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-xs font-semibold text-zinc-400 ml-1 tracking-wider uppercase block">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        id="image-upload-input"
      />

      {value ? (
        /* Preview */
        <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
          <img
            src={value}
            alt="Cover preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <Upload size={14} />
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-2 bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <X size={14} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* Drop Zone */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative w-full h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 group',
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
              : 'border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5'
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="animate-spin text-indigo-400" />
              <p className="text-xs text-zinc-400 font-medium">Uploading...</p>
            </div>
          ) : uploadStatus === 'success' ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 size={28} className="text-emerald-400" />
              <p className="text-xs text-emerald-400 font-bold">Uploaded!</p>
            </div>
          ) : uploadStatus === 'error' ? (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
            </div>
          ) : (
            <>
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors',
                isDragging ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-400'
              )}>
                <ImageIcon size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-300">
                  {isDragging ? 'Drop it here!' : 'Click or drag image here'}
                </p>
                <p className="text-xs text-zinc-600 mt-1">JPG, PNG, GIF, WebP • Max 5MB</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
