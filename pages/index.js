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
  const [calendarDates, setCalendarDates] = useState([]); // Set all calendar dates
  const [dateType, setDateType] = useState(new Date()); // Set modal date (eg. 04/05/2021)
  const [calendarItems, setCalendarItems] = useState([]); // Set calendar items
  const [remoteCalendarItems, setRemoteCalendarItems] = useState([]); // Set calendar items by date
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

  // Reset calendar items
  useEffect(() => {
    getCalendarItems();
  }, [dateType, user]);

  // Get days in week or month
  function getDays(calendarType, dateType) {
    if (calendarType === 'day') {
      if (!dateType) return;
      let days = [];
      let day = new Date(dateType);
      day.setDate(day.getDate());
      days.push(day);
      
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

      return days;
    }
  }

  // Retrieve calendar items from database
  async function getCalendarItems() {
    // Get selected days : Get days in javascript format => Loop through dates => Convert to ISO format => Push to array
    var tempCalendarDates = [];
    const daysArr = getDays(calendarType, dateType);
    daysArr.forEach((date) => {
      const isoDate = date.toISOString().substring(0, 10);
      tempCalendarDates.push(isoDate);
    });
    setCalendarDates(tempCalendarDates);
    
    var tempCalendarItems = [];
    if (user != null){
      // Retrieve calendar items from user subcollection
      const userDocRef = doc(firestore, 'users', user);
      const itemsRef = collection(userDocRef, user + '-items');
      const itemSnapshot = await getDocs(itemsRef);

      // Loop through each calendar item
      itemSnapshot.forEach((doc) => {
        const item = doc.data();
        const date = new Date(Date.parse(item.dateTime));
        const isoItemDate = date.toISOString().substring(0, 10);

        tempCalendarItems.push(item);
      });
      setCalendarItems(tempCalendarItems);
      console.log('Calendar Items:', tempCalendarItems);
      // configureRemoteCalendarItems(tempCalendarItems); 
    }
  }

  useEffect(() => {
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
    console.log('Remote Calendar Items:', remoteCalendarItems)
  }, [calendarItems, calendarDates]);

  return (
    <main>
      <section className="flex flex-row justify-around items-center">
        <section className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-7 grid-rows-6 gap-4 border-4 rounded-lg p-2 px-28 bg-red-400">
            {remoteCalendarItems.map((content, index) => (
              <div key={index} className="bg-gray-200 text-slate-800 border-4 rounded">{content + " " + (index+1)}</div>
            ))}
          </div>
        </section>
        <Modal isVisible={showModal} modalContent={modalContent} onClose={() => setShowModal(false)} onCalendarTypeChange={handleCalendarTypeChange} onDateTypeChange={handleDateTypeChange} />
      </section>
      <BottomNavbar setShowModal={setShowModal} setModalContent={setModalContent}/>
    </main>
  );
}