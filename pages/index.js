// Import react components
import React, { useState, useEffect } from "react";
// Import website components
import BottomNavbar from '../components/BottomNavbar';
import Modal from '../components/Modal';

// Display home page
export default function Home() {
  // Define modal states
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);
  const [calendarType, setCalendarType] = useState('day');
  const [dateType, setDateType] = useState(null);

  // Update calendarType state
  function handleCalendarTypeChange(newCalendarType) {
    setCalendarType(newCalendarType);
  }
  // Display new calendarType to the console once updated
  useEffect(() => {
    console.log('Calendar type:', calendarType);
  }, [calendarType]);
  // Update dateType state
  function handleDateTypeChange(newDateType) {
    setDateType(newDateType);
  }
  // Display new dateType to the console once updated
  useEffect(() => {
    console.log('Date type:', dateType);
    getDays(calendarType, dateType);
  }, [dateType]);

  // Get days in week or month
  function getDays(calendarType, dateType) {
    if (calendarType === 'day') {
      if (!dateType) return;
      let days = [];
      let day = new Date(dateType);
      day.setDate(day.getDate() + 1);
      days.push(day);
      
      console.log(days);
      return days;
    }
    if (calendarType === 'week') {
      if (!dateType) return;
      // split the week value into year and week numbers
      let [year, week] = dateType.split('-W');

      // create a date for the first day of the week
      let firstDay = new Date(year, 0, 1 + (week - 1) * 7);
      // adjust for the day of the week (0 = Sunday)
      firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

      let days = [];
      // loop through each day of the week
      for (let i = 0; i < 7; i++) {
        let day = new Date(firstDay);
        day.setDate(firstDay.getDate() + i);
        days.push(day);
      }

      console.log(days);
      return days;
    }
    if (calendarType === 'month') {
      if (!dateType) return;
      // split the month value into year and month numbers
      let [year, month] = dateType.split('-');

      let days = [];
      // loop through each day of the month
      for (let day = 1; day <= 31; day++) {
        let date = new Date(year, month - 1, day);
        // break out of the loop if the month changes
        if (date.getMonth() != month - 1) {
          break;
        }
        days.push(date);
      }

      console.log(days);
      return days;
    }
  }


  // Define the content for each box
  const boxContent = [
    'Box', 'Box', 'Box', 'Box', 'Box', 'Box', 'Box',
    'Box', 'Box', 'Box', 'Box', 'Box', 'Box', 'Box',
    'Box', 'Box', 'Box', 'Box', 'Box', 'Box', 'Box',
    'Box', 'Box', 'Box', 'Box', 'Box', 'Box', 'Box',
    'Box', 'Box', 'Box', 'Box', 'Box', 'Box', 'Box',
    'Box', 'Box', 'Box', 'Box', 'Box', 'Box', 'Box',
  ];

  return (
    <>
      <main className="flex flex-row justify-around items-center">
        <section className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-7 grid-rows-6 gap-4 border-4 rounded-lg p-2 px-28 bg-red-400">
            {boxContent.map((content, index) => (
              <div key={index} className="bg-gray-200 text-slate-800 border-4 rounded">{content + " " + (index+1)}</div>
            ))}
          </div>
        </section>
        <Modal isVisible={showModal} modalContent={modalContent} onClose={() => setShowModal(false)} onCalendarTypeChange={handleCalendarTypeChange} onDateTypeChange={handleDateTypeChange} />
      </main>
      <BottomNavbar setShowModal={setShowModal} setModalContent={setModalContent}/>
    </>
  );
}