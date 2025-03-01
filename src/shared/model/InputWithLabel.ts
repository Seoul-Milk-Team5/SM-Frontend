import { ChangeEvent } from "react";

export interface InputWithLabelProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  success?: string;
  error: string;
}
