import { ReactNode } from "react";

export enum PaginationSizing {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export type PaginationProps = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  size?: PaginationSizing;
  setCurrentPage: (page: number) => void;
  showText?: boolean;
  showIcon?: boolean;
  prevText?: string;
  nextText?: string;
  prevIcon?: ReactNode;
  nextIcon?: ReactNode;
};
