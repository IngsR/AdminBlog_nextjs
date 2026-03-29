'use client';

import { useState } from 'react';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  itemName?: string;
}

export const DeleteButton = ({ id, endpoint, itemName }: DeleteButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');
      
      setIsConfirming(false);
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete item. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-2">Confirm?</span>
        <Button 
          variant="danger" 
          size="sm" 
          className="h-8 rounded-lg px-3"
          onClick={handleDelete}
          isLoading={isDeleting}
        >
          Yes
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          className="h-8 rounded-lg px-3"
          onClick={() => setIsConfirming(false)}
          disabled={isDeleting}
        >
          No
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="danger" 
      size="icon" 
      className="hover:bg-red-500 group/del relative"
      onClick={() => setIsConfirming(true)}
      title={`Delete ${itemName || 'item'}`}
    >
      <Trash2 size={18} className="group-hover/del:rotate-12 transition-transform" />
    </Button>
  );
};
