import React, { useState } from "react";
import {
  PaginationItem,
  PaginationLink,
  Input,
  Label,
  FormGroup,
  Button,
} from "reactstrap";

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
    onPageChange(parseInt(value, 10));
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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
      <div className="mt-1" style={{ display: "flex" }}>
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
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <FormGroup style={{ marginRight: "10px", }}>
          <Label className="mt-3" for="pageNumber">Page</Label>
          <Input
            type="number"
            id="pageNumber"
            value={inputPage}
            onChange={handlePageInputChange}
            onBlur={handleInputBlur}
            min={1}
            max={totalPages}
            className="form-control"
            style={{ width: "60px" }}
          />
        </FormGroup>

        <FormGroup style={{ marginRight: "10px" }}>
          <Label className="mt-3" for="pageSize">Items per page</Label>
          <Input
            type="select"
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="form-control"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input>
        </FormGroup>
      </div>

      
    </div>
  );
};

export default GenericPagination;
