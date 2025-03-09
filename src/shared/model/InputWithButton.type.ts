import { ChangeEvent, MouseEvent } from "react";

export interface InputWithButtonProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  success?: string;
  error?: string;
  disabled: boolean;
  buttonText: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
