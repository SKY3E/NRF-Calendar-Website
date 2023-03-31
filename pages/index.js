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

  return (
    <>
      <main class="mt-2 flex flex-row justify-around items-center">
        <Modal isVisible={showModal} modalContent={modalContent} onClose={() => setShowModal(false)}/>
      </main>
      <BottomNavbar setShowModal={setShowModal} setModalContent={setModalContent}/>
    </>
  );
}