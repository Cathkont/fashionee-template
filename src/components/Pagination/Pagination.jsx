import "../ContentBlock/shop.css";

const Pagination = ({ page, setPage, totalPages }) => {
  const goPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const goNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="pagination">
      <button
        className="button-left"
        data-testid="previous-page-arrow"
        onClick={goPrev}
      >
        ←
      </button>

      <div className="pages">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          return (
            <div
              key={pageNumber}
              className="page"
              data-testid={`page-${pageNumber}`}
              data-active={page === pageNumber}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>

      <button
        className="button-right"
        data-testid="next-page-arrow"
        onClick={goNext}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
