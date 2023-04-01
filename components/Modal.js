import React from 'react'
import Auth from './Auth'
import AddItem from './AddItem';

export const Modal = ({ isVisible, onClose, modalContent }) => {
  if (!isVisible) return null;

  if (modalContent === 0) {
    return (
      <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={() => onClose()}>
        <div class="w-[600px] flex flex-col">
          <button class="place-self-end mb-2" onClick={() => onClose()}>
            <svg class="h-8 w-8 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div class="bg-white p-2 rounded-lg">
            <Auth />
          </div>
        </div>
      </div>
    );
  }

  if (modalContent === 1) {
    return (
      <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={() => onClose()}>
        <div class="w-[600px] flex flex-col">
          <button class="place-self-end mb-2" onClick={() => onClose()}>
            <svg class="h-8 w-8 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div class="bg-white p-2 rounded-lg">
            <h1>Calendar Settings</h1>
          </div>
        </div>
      </div>
    );
  }

  if (modalContent === 2) {
    return (
      <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div class="w-[600px] flex flex-col">
          <button class="place-self-end mb-2" onClick={() => onClose()}>
            <svg class="h-8 w-8 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div class="bg-white p-2 rounded-lg">
            <AddItem />
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
