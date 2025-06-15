import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { NoteForm } from '../NoteForm/NoteForm';

interface NoteModalProps {
  onClose: () => void;
}

export const NoteModal = ({ onClose }: NoteModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div onClick={onClose}>
      <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};