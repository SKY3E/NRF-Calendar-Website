import React, { useState, useEffect, useCallback } from 'react';
import DateView from '../components/DateView';

export default function ChooseCalendar(props) {
  const [calendarType, setCalendarType] = useState('day');

  // Retrieve dropdown value and pass it to props
  const handleCalendarTypeChange = (event) => {
    const newCalendarType = event.target.value;
    setCalendarType(newCalendarType);
    props.onCalendarTypeChange(newCalendarType);
  };

  const handleDateTypeChange = (date) => {
    props.onDateTypeChange(date);
  };

  return (
    <section className="border-4 rounded-lg p-2 px-28 bg-red-400 text-slate-800">
      <h2 className="text-xl font-bold">Calendar Settings</h2>
      <p className="font-semibold mb-1">Change your calendar settings</p>
      <select onChange={handleCalendarTypeChange} className="w-56 border-4 rounded p-2 bg-white hover:bg-gray-100 text-slate-800">
        <option value="day">Day View</option>
        <option value="week">Week View</option>
        <option value="month">Month View</option>
      </select>
      <DateView dateType={calendarType} onDateTypeChange={handleDateTypeChange} />
    </section>
  );
}