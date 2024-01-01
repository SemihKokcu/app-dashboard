// PaginationComponent.js
import React from "react";
import { PaginationItem, PaginationLink } from "reactstrap";

const GenericPagination = ({
  totalPages,
  currentPage,
  isPreviousDisabled,
  isNextDisabled,
  onPageChange,
}) => {
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
    </>
  );
};

export default GenericPagination;
