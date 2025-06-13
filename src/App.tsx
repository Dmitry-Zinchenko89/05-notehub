import { useState } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import Pagination from './components/Pagination/Pagination';
import NoteList from './components/NoteList/NoteList';
import NoteModal from './components/NoteModal/NoteModal';
import { useDebounce } from './hooks/useDebounce';

const App = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    return (
        <div>
            <header>
                <SearchBox value={search} onChange={setSearch} />
                {totalPages > 1 && <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />}
                <button onClick={() => setIsOpen(true)}>Create note +</button>
            </header>

            <NoteList
                page={page}
                search={debouncedSearch}
                onTotalPages={setTotalPages}
            />

            {isOpen && <NoteModal onClose={() => setIsOpen(false)} />}
        </div>
    );
};

export default App;