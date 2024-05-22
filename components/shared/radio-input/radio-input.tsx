import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import randomUID from "@/lib/randomUID";
import { cn } from "@/lib/utils";
import { WorkHours } from "@/models/experience";

type RadioOptionType = {
  label: string;
  value: string;
};

type RadioInputProps = {
  options: RadioOptionType[];
  label?: string;
  name: string;
  value: string;
  setValue: (value: WorkHours) => void;
  radioGroupClassName?: string;
  className?: string;
};

const RadioInput = ({
  name,
  label,
  options,
  value,
  setValue,
  className,
  radioGroupClassName,
}: RadioInputProps) => {
  const uniqueId = randomUID();
  return (
    <div className={cn("flex flex-col gap-2 w-full pb-3", className)}>
      <Label className="pl-2">{label ?? name}</Label>
      <RadioGroup
        defaultValue={"option-one"}
        value={value}
        onValueChange={setValue}
        className={cn("flex items-center gap-2", radioGroupClassName)}
      >
        {options.map((option) => {
          const uID = `option-${uniqueId}-${option.value}`;
          return (
            <div key={uID} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={uID} />
              <Label htmlFor={uID}>{option.label ?? option.value}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
export default RadioInput;
