// Import react components
import React, { useState, useEffect } from "react";
// Import website components
import BottomNavbar from '../components/BottomNavbar';
import Modal from '../components/Modal';
// Import firebase components
import { firestore, auth } from '../lib/firebase';
import { collection, getDocs, doc } from 'firebase/firestore';

// Display home page
export default function Home() {
  const [showModal, setShowModal] = useState(false); // Set modal display state
  const [modalContent, setModalContent] = useState(0); // Set modal content
  const [calendarType, setCalendarType] = useState('day'); // Set modal calendar type (eg. day, week, month)
  const [calendarDates, setCalendarDates] = useState([]); // Set all calendar dates (All dates found in firebase)
  const [dateType, setDateType] = useState(new Date()); // Set modal date (eg. 04/05/2021)
  const [calendarItems, setCalendarItems] = useState([]); // Set calendar items (All dates)
  const [remoteCalendarItems, setRemoteCalendarItems] = useState([]); // Set calendar items by date (Viewed dates)
  const [user, setUser] = useState(null); // Set user state

  // Update user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Update calendarType state
  function handleCalendarTypeChange(newCalendarType) {
    setCalendarType(newCalendarType);
  }
  // Update dateType state
  function handleDateTypeChange(newDateType) {
    setDateType(newDateType);
  }

  // Retrieve calendar items when dateType or user state changes
  useEffect(() => {
    getCalendarItems();
  }, [dateType, user]);

  // Retrieve Javascript formatted dates for a day, week or month
  function getDays(calendarType, dateType) {
    // Retrieve day if chosen calendarType is day
    if (calendarType === 'day') {
      if (!dateType) return;
      let days = [];
      let day = new Date(dateType);
      day.setDate(day.getDate());
      days.push(day);
      
      return days;
    }
    // Retrieve week if chosen calendarType is week
    if (calendarType === 'week') {
      if (!dateType) return;
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

      return days;
    }
    // Retrieve month if chosen calendarType is month
    if (calendarType === 'month') {
      if (!dateType) return;
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

      return days;
    }
  }

  // Retrieve calendar items from database
  async function getCalendarItems() {
    // Get selected days : Get days in javascript format => Loop through dates => Convert to ISO format => Push to array => Set state
    var tempCalendarDates = [];
    const daysArr = getDays(calendarType, dateType);
    daysArr.forEach((date) => {
      const isoDate = date.toISOString().substring(0, 10);
      tempCalendarDates.push(isoDate);
    });
    setCalendarDates(tempCalendarDates);
    
    // Get calendar items : Get items from database => Loop through items => Push to array => Set state
    var tempCalendarItems = [];
    if (user != null){
      // Retrieve calendar items from user subcollection
      const userDocRef = doc(firestore, 'users', user);
      const itemsRef = collection(userDocRef, user + '-items');
      const itemSnapshot = await getDocs(itemsRef);

      itemSnapshot.forEach((doc) => {
        tempCalendarItems.push(doc.data());
      });
      setCalendarItems(tempCalendarItems);
    }
  }

  // Retrieve calendar items by date
  useEffect(() => {
    // Get calendar items : Loop through calendar items => Loop through calendar dates => Compare dates => Push to array => Set state
    var remoteCalendarItems = [];
    calendarItems.forEach(function (item) {
      const itemDate = new Date(Date.parse(item.dateTime));
      const isoItemDate = itemDate.toISOString().substring(0, 10);
      calendarDates.forEach(function (date) {
        if (isoItemDate === date) {
          remoteCalendarItems.push(item);
        }
      });
    });
    setRemoteCalendarItems(remoteCalendarItems);
  }, [calendarItems, calendarDates]);

  return (
    <main>
      <section className="flex flex-row justify-around items-center">
        <section className="flex justify-center items-center h-screen">
          <div className="border-4 rounded-lg p-2 px-28 bg-red-400">
            {remoteCalendarItems.map((content, index) => (
              <div key={index} className="bg-gray-200 text-slate-800 border-4 rounded mt-2 mb-2">{content.details + " " + (index+1)}</div>
            ))}
          </div>
        </section>
        <Modal isVisible={showModal} modalContent={modalContent} onClose={() => setShowModal(false)} onCalendarTypeChange={handleCalendarTypeChange} onDateTypeChange={handleDateTypeChange} />
      </section>
      <BottomNavbar setShowModal={setShowModal} setModalContent={setModalContent}/>
    </main>
  );
}