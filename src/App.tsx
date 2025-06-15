import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes, type FetchNotesResponse, deleteNote } from './services/noteService';
import { NoteList } from './components/NoteList/NoteList';
import { NoteModal } from './components/NoteModal/NoteModal';
import { SearchBox } from './components/SearchBox/SearchBox';
import { Pagination } from './components/Pagination/Pagination';

const PER_PAGE = 12;

function App() {
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
        queryKey: ['notes', { page, search: debouncedSearch }],
        queryFn: () => fetchNotes({ page, search: debouncedSearch, perPage: PER_PAGE }),
        keepPreviousData: true,
    });

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>Create Note</button>
            <SearchBox value={search} onChange={setSearch} />

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading notes</p>}

            {data && (
                <>
                    <NoteList notes={data.results} onDelete={mutation.mutate} />
                    <Pagination
                        pageCount={data.totalPages}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                </>
            )}

            {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

export default App;