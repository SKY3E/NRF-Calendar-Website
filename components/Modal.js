// Import react components
import React from 'react'
// Import website components
import Auth from './Auth'
import AddItem from './AddItem';
import ChooseCalendar from './ChooseCalendar';

// Display modal according to prop configurations
export default function Modal(props){
  const { isVisible, onClose, modalContent } = props;

  const handleCalendarTypeChange = (calendarType) => {
    props.onCalendarTypeChange(calendarType);
  };
  const handleDateTypeChange = (date) => {
    props.onDateTypeChange(date);
  };
  const handleItemCreation = (title) => {
    props.onItemCreation(title);
  };

  // If prop config is set to not visible then return null
  if (!isVisible) return null;

  if (modalContent === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          <button className="place-self-end mb-2" onClick={() => onClose()}>
            <svg className="h-8 w-8 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div className="bg-white p-2 rounded-lg flex justify-center">
            <Auth />
          </div>
        </div>
      </div>
    );
  }

  if (modalContent === 1) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          <button className="place-self-end mb-2" onClick={() => onClose()}>
            <svg className="h-8 w-8 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div className="bg-white p-2 rounded-lg">
            <ChooseCalendar onCalendarTypeChange={handleCalendarTypeChange} onDateTypeChange={handleDateTypeChange}/>
          </div>
        </div>
      </div>
    );
  }

  if (modalContent === 2) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          <button className="place-self-end mb-2" onClick={() => onClose()}>
            <svg className="h-8 w-8 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"></path>
            </svg>
          </button>
          <div className="bg-white p-2 rounded-lg">
            <AddItem onItemCreation={handleItemCreation}/>
          </div>
        </div>
      </div>
    );
  }
}
