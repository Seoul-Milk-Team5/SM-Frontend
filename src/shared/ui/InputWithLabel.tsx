import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { InputWithLabelProps } from "../model";

function InputWithLabel({ label, type, id, placeholder, value, onChange, success, error, name }: InputWithLabelProps) {
  return (
    <div className="flex gap-3">
      <Label htmlFor={id} className="w-[120px] text-left pt-3 font-medium text-[17px] mr-10">
        {label}
      </Label>
      <div className="flex-1 flex flex-col max-w-[300px] ml-8">
        <Input
          className="placeholder-gray-300 px-5 py-5.5"
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          valid={!error}
          name={name}
        />
        {success && <p className="text-green-400 text-label-xs mt-1 pl-5">{success}</p>}
        {error && <p className="text-red-400 text-label-xs mt-1 pl-5">{error}</p>}
      </div>
    </div>
  );
}

export default InputWithLabel;
