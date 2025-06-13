import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';

interface Props {
  page: number;
  search: string;
  perPage?: number;
  onTotalPages: (totalPages: number) => void;
}

const NoteList = ({ page, search, perPage = 12, onTotalPages }: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search, perPage }),
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading notes.</p>;

  onTotalPages(data.totalPages);

  if (data.results.length === 0) return null;

  return (
    <ul>
      {data.results.map((note: Note) => (
        <li key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div>
            <span>{note.tag}</span>
            <button onClick={() => mutation.mutate(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
