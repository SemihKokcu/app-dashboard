import React, { useState } from "react";
import { PaginationItem, PaginationLink, Input, Label, FormGroup } from "reactstrap";

const GenericPagination = ({
  totalPages,
  currentPage,
  isPreviousDisabled,
  isNextDisabled,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  pageSize,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setInputPage(value);
    onPageChange(parseInt(value, 10)); // Sayfa numarası anında değişecek
  };

  const handlePageSizeChange = (e) => {
    const value = e.target.value;
    onPageSizeChange(value);
  };

  const handleInputBlur = () => {
    onPageChange(parseInt(inputPage, 10));
  };

  const pages = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i} className={i === currentPage ? "active" : ""}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    const endPage = Math.min(currentPage + 2, totalPages);
    for (let i = currentPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i} className={i === currentPage ? "active" : ""}>
          <PaginationLink
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }

  return (
    <>
    <FormGroup className="ml-2 mr-2">
        <Label for="pageNumber">Page</Label>
        <Input
          type="number"
          id="pageNumber"
          value={inputPage}
          onChange={handlePageInputChange}
          onBlur={handleInputBlur}
          min={1}
          max={totalPages}
        />
      </FormGroup>

      {/* Select for Items Per Page */}
      <FormGroup className="ml-2 mr-5">
        <Label for="pageSize">Items per page</Label>
        <Input
          type="select"
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Input>
      </FormGroup>
      <PaginationItem disabled={isPreviousDisabled}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
        >
          <i className="fas fa-angle-double-left" />
          <span className="sr-only">First</span>
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={isPreviousDisabled}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(currentPage - 1);
          }}
        >
          <i className="fas fa-angle-left" />
          <span className="sr-only">Previous</span>
        </PaginationLink>
      </PaginationItem>

      {pages}

      <PaginationItem disabled={isNextDisabled}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(currentPage + 1);
          }}
        >
          <i className="fas fa-angle-right" />
          <span className="sr-only">Next</span>
        </PaginationLink>
      </PaginationItem>

      <PaginationItem disabled={isNextDisabled}>
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(totalPages);
          }}
        >
          <i className="fas fa-angle-double-right" />
          <span className="sr-only">Last</span>
        </PaginationLink>
      </PaginationItem>

      {/* Input for Page Number */}
      
    </>
  );
};

export default GenericPagination;
