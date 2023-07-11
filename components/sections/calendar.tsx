'use client'
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";


const Calendar = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <CalendarComponent 
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date)}
        className="rounded-md border my-8 p-4"
        
        />
    )
}

export default Calendar;