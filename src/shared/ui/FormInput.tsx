import { Input } from "@/components/ui/input";
import { FormInputProps } from "../model";


export default function FormInput({ label, name, value, onChange, width = "150px" }: FormInputProps) {
  return (
    <div className="flex justify-between">
      <label>{label}</label>
      <Input name={name} value={value} onChange={onChange} style={{ width }} className="h-[35px]" />
    </div>
  );
};
  