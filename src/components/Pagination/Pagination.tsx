import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};