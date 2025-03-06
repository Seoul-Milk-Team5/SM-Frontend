export interface FormInputProps {
  label: string;
  name: string | undefined;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}
