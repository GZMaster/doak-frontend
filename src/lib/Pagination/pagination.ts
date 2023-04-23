import { ReactNode } from "react";

export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  size?: "small" | "medium" | "large";
  setCurrentPage: (page: number) => void;
  showText?: boolean;
  showIcon?: boolean;
  prevText?: string;
  nextText?: string;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};
