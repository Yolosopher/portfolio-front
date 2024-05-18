import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import randomUID from "@/lib/randomUID";
import { cn } from "@/lib/utils";
import { LEVEL } from "@/models/tech";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  setChange: (value: number) => void;
}

const RangeInput = ({
  label,
  className,
  min,
  max,
  step,
  value,
  setChange,
  ...args
}: SliderProps) => {
  const uniqueId = randomUID();
  return (
    <div className="flex flex-col gap-2 w-full pb-3">
      <Label htmlFor={uniqueId} className="pl-2">
        {label ?? args.name}
      </Label>
      <Input
        className="w-max text-center"
        id={uniqueId}
        type="number"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= min && value <= max) {
            setChange(value);
          }
        }}
        value={value}
        step={step}
        min={min}
        max={max}
        {...args}
      />
      <Slider
        className={cn(
          "w-[60%]",
          className,
          args.disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-grab active:cursor-grabbing"
        )}
        value={[value]}
        step={step}
        min={min}
        max={max}
        disabled={args.disabled}
        onValueChange={(val: number[]) => {
          const value = val[0];
          if (value >= min && value <= max) {
            setChange(value);
          }
        }}
      />
    </div>
  );
};
export default RangeInput;
