import { ReactNode } from "react";

export interface IText {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  errorstate?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  rows?: number;
  cols?: number;
  multiline?: boolean;
}
