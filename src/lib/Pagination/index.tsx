import React from "react";
import ArrowLeft from "./arrowLeft";
import ArrowRight from "./arrowRight";
import { PaginationProps } from "./pagination";
import PageLink from "./PageLink";
import "./pagination.scss";

export default function Pagination({
  currentPage,
  lastPage,
  setCurrentPage,
  size = "large",
  showText = false,
  showIcon,
  prevText = "Previous",
  nextText = "Next",
  prevIcon = <ArrowLeft />,
  nextIcon = <ArrowRight />,
}: PaginationProps) {
  let maxLength = 7;
  if (size === "small") {
    maxLength = 3;
  } else if (size === "medium") {
    maxLength = 5;
  } else if (size === "large") {
    maxLength = 7;
  }
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);
  return (
    <div className="PaginationStyle" aria-label="Pagination" data-size={size}>
      <span className="pagination__text">
        page {currentPage} of {lastPage}
      </span>
      <nav className="pagination">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {showIcon && <span className="pagination__prop">{prevIcon}</span>}
          {showText && <span className="pagination__prop">{prevText}</span>}
        </PageLink>
        {maxLength &&
          maxLength >= 5 &&
          pageNums.map((pageNum, idx) => (
            <PageLink
              key={idx}
              active={currentPage === pageNum}
              disabled={isNaN(pageNum)}
              onClick={() => setCurrentPage(pageNum)}
            >
              {!isNaN(pageNum) ? pageNum : "..."}
            </PageLink>
          ))}
        <PageLink
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {showText && <span className="pagination__prop">{nextText}</span>}
          {showIcon && <span className="pagination__prop">{nextIcon}</span>}
        </PageLink>
      </nav>
    </div>
  );
}

function getPaginationItems(
  currentPage: number,
  lastPage: number,
  maxLength: number
) {
  const res: Array<number> = [];

  // handle lastPage less than maxLength
  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i);
    }
  }

  // handle ellipsis logics
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = Math.floor(deductedMaxLength / 2);

    // handle ellipsis in the middle
    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        res.push(j);
      }

      res.push(NaN);

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k);
      }
    }

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);
    }

    // handle ellipsis not in the middle
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          res.push(n);
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p--) {
          res.unshift(p);
        }
      }
    }
  }

  return res;
}
