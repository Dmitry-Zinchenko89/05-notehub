import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';

interface Props {
  onClose: () => void;
}

const NoteModal = ({ onClose }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;