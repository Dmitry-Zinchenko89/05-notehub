import type { Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <span>{note.tag}</span>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};