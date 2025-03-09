import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dispatch, SetStateAction } from "react";

type FilterState = {
  date: { limit: number; from: Date; to: Date };
};

type DatePickerWithRangeProps = {
  date: DateRange;
  setFilter: Dispatch<SetStateAction<FilterState>>;
  className?: string;
  disabled?: boolean; // 추가된 부분
  onSelect?: () => void; // 추가된 부분
};

function DatePickerWithRange({ date, setFilter, className, disabled, onSelect }: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            disabled={disabled} // disabled 적용
            onClick={onSelect} // 데이트 피커 선택 시 이벤트 실행
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={() => {
              setFilter((prev) => ({
                ...prev,
                date: {
                  limit: 0,
                  from: new Date(),
                  to: addDays(new Date(), 30),
                },
              }));
              onSelect && onSelect(); // onSelect 호출 (Searchbar에서 상태 변경)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerWithRange;
