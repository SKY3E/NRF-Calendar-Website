import { useState } from 'react';

export default function ChooseCalendar(props) {
  const handleCalendarTypeChange = (event) => {
    const newCalendarType = event.target.value;
    props.onCalendarTypeChange(newCalendarType);
  };

  return (
    <section className="border-4 rounded-lg p-2 px-28 bg-red-400 text-slate-800">
      <h2 className="text-xl font-bold">Calendar Settings</h2>
      <p className="font-semibold">Change your calendar settings</p>
      <select onChange={handleCalendarTypeChange} className="w-56 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800">
        <option value="day">Day View</option>
        <option value="week">Week View</option>
        <option value="month">Month View</option>
      </select>
    </section>
  );
}