import * as React from "react";
import { Locale, addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { uk } from "date-fns/locale";

export function DatePickerWithPresets({
  label,
  className,
  date,
  setDate,
}: any) {
  React.useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div className={`grid gap-2 ${className}`}>
      <Label htmlFor="source">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "d MMMM yyyy", {
                locale: uk as Locale,
              })
            ) : (
              <span>Оберіть дату поїздки</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Обрати" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Сьогодні</SelectItem>
              <SelectItem value="1">Завтра</SelectItem>
              <SelectItem value="2">Післязавтра</SelectItem>
              <SelectItem value="7">Через тиждень</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
