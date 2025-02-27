import { Label } from "../../src/components/ui/label";
import { Input } from "../../src/components/ui/input";
import { InputWithLabelProps } from "../model";

function InputWithLabel({ label, type, id, placeholder, value, onChange, success, error }: InputWithLabelProps) {
  return (
    <div className="flex gap-3">
      <Label htmlFor={id} className="w-[120px] text-left pt-3">
        {label}
      </Label>
      <div className="flex-1 flex flex-col max-w-[300px] ml-8">
        <Input
          className="placeholder-gray-300 p-5"
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          valid={!error}
        />
        {success && <p className="text-green-400 text-[12px] mt-1">{success}</p>}
        {error && <p className="text-red-400 text-[12px] mt-1">{error}</p>}
      </div>
    </div>
  );
}

export default InputWithLabel;
