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
  const [calendarType, setCalendarType] = useState('month');
  const [dateType, setDateType] = useState(null);

  // Update calendarType state
  function handleCalendarTypeChange(newCalendarType) {
    setCalendarType(newCalendarType);
  }
  // Display new calendarType to the console once updated
  useEffect(() => {
    console.log('Calendar type:', calendarType);
  }, [calendarType]);

  function handleDateTypeChange(newDateType) {
    setDateType(newDateType);
  }
  // Display new dateType to the console once updated
  useEffect(() => {
    console.log('Date type:', dateType);
  }, [dateType]);

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