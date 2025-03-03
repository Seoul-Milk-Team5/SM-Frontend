import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { InputWithButtonProps } from "../model";

function InputWithButton({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  success,
  error,
  disabled,
  buttonText,
  onClick,
}: InputWithButtonProps) {
  return (
    <div className="flex gap-3">
      <Label htmlFor={id} className="w-[120px] text-left pt-3">
        {label}
      </Label>
      <div className="flex-1 flex flex-col max-w-[300px] ml-8">
        <Input
          type={type}
          className="placeholder-gray-300 p-5"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          valid={!error}
        />
        {success && <p className="text-green-400 text-label-xs mt-1">{success}</p>}
        {error && <p className="text-red-400 text-label-xs mt-1">{error}</p>}
      </div>
      <Button
        className="bg-green-500 disabled:bg-gray-100 disabled:opacity-100 text-white hover:bg-green-600 py-[21px]"
        type="button"
        onClick={onClick}
        disabled={disabled}>
        {buttonText}
      </Button>
    </div>
  );
}

export default InputWithButton;
