import { ReactNode } from "react";

export interface IInput {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorstate?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  autocomplete?: string;
}
