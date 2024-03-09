import clsx from "clsx";
import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
export default function CPagination({
  className,
  totalPage,
  handleChangePage,
}) {
  const [curPage, setCurPage] = useState(1);
  const handleClickPage = (pageNum, offset) => {
    const current = pageNum + offset;
    if (current > 0 && current <= totalPage) {
      setCurPage(current);
      handleChangePage(current);
    }
  };

  return (
    <div className={clsx("d-flex gap-1 text-main", className)}>
      <div
        className="border bg-white d-flex align-items-center pointer"
        onClick={() => handleClickPage(1, 0)}
        style={{ padding: "3px 6.5px" }}
      >
        <FiChevronsLeft />
      </div>
      <div
        className="border bg-white d-flex align-items-center pointer"
        onClick={() => handleClickPage(curPage, -1)}
        style={{ padding: "3px 6.5px" }}
      >
        <FiChevronLeft />
      </div>
      {Array.from({ length: totalPage }, (_, index) => {
        const pageNum = index + 1;
        return (
          <div
            key={`page_${pageNum}`}
            className={clsx(
              "border pointer",
              pageNum === curPage ? "bg-main text-white" : "bg-white"
            )}
            style={{ padding: "3px 11px" }}
            onClick={() => handleClickPage(pageNum, 0)}
          >
            {pageNum}
          </div>
        );
      })}
      <div
        className="border bg-white d-flex align-items-center pointer"
        onClick={() => handleClickPage(curPage, 1)}
        style={{ padding: "3px 6.5px" }}
      >
        <FiChevronRight />
      </div>
      <div
        className="border bg-white d-flex align-items-center pointer"
        onClick={() => handleClickPage(totalPage, 0)}
        style={{ padding: "3px 6.5px" }}
      >
        <FiChevronsRight />
      </div>
    </div>
  );
}
