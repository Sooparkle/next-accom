import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarValue = Date | [Date, Date] | null;

interface CalendarDateSetType {
  start : (date : Date) => void;
  end : (date : Date) => void;
}

const CalendarArea = ({start, end} : CalendarDateSetType) => {

  const handleDateChange = (date: CalendarValue) => {
    if (date === null) {
      console.log("No date selected");
      return;
    }

    if (Array.isArray(date)) {
      start(date[0]);
      end(date[1])
    } else {
      const selectedDate = date.toLocaleDateString();
      console.log("Selected Date", selectedDate);
    }
  };

  return (

      <Calendar
        onChange={(date) => handleDateChange(date as CalendarValue)}
        selectRange={true}
        locale='ko-KR'
      />
  );
};

export default CalendarArea;
