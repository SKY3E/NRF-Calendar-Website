// Import components
import Auth from '../components/Auth';
import Modal from '../components/Modal';
import React, { useState } from "react";
// Import website components
import BottomNavbar from '../components/BottomNavbar';

// Home page
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  function handleCalendarTypeChange(newCalendarType) {
    console.log('New calendar type:', newCalendarType);
    const calendarType = newCalendarType;
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
        <section class="flex justify-center items-center h-screen">
          <div class="grid grid-cols-7 grid-rows-6 gap-4 border-4 rounded-lg p-2 px-28 bg-red-400">
            {boxContent.map((content, index) => (
              <div key={index} className="bg-gray-200 text-slate-800 border-4 rounded">{content + " " + (index+1)}</div>
            ))}
          </div>
        </section>
        <Modal isVisible={showModal} modalContent={modalContent} onClose={() => setShowModal(false)} onCalendarTypeChange={handleCalendarTypeChange} />
      </main>
      <BottomNavbar setShowModal={setShowModal} setModalContent={setModalContent}/>
    </>
  );
}