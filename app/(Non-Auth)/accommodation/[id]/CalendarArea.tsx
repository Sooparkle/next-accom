import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../../../styles/AccommmodationDetail.module.scss';

type CalendarValue = Date | [Date, Date] | null;

interface CalendarDateSetType {
  start : (date : Date) => void;
  end : (date : Date) => void;
}
interface CalendarTileProperties {
  date: Date;
  view: string;
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

  const tileClassName = ({ date }: CalendarTileProperties) => {
    return date.getDay() === 0 ? 'sunday' : null;
  };

  return (
    <div
      className={styles.CalendarWrap}
    >
      <Calendar
        onChange={(date) => handleDateChange(date as CalendarValue)}
        selectRange={true}
        calendarType="gregory"
        locale='ko-KR'
        next2Label={null}
        prev2Label={null}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarArea;
