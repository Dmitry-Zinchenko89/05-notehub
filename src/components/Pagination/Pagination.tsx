import ReactPaginate from 'react-paginate';

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default Pagination;