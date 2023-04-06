// Import react components
import React, { useState, useEffect } from "react";
// Import website components
import BottomNavbar from '../components/BottomNavbar';
import Modal from '../components/Modal';
// Import firebase components
import { firestore, auth } from '../lib/firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';

// Display home page
export default function Home() {
  // Set modal display state
  const [showModal, setShowModal] = useState(false);
  // Set modal content
  const [modalContent, setModalContent] = useState(0);
  // Set modal calendar type (eg. day, week, month)
  const [calendarType, setCalendarType] = useState('day');
  // Set modal date (eg. 04/05/2021)
  const [dateType, setDateType] = useState(new Date());
  // Set calendar items
  const [calendarItems, setCalendarItems] = useState([]);
  const [calendarItemsByDate, setCalendarItemsByDate] = useState([]);
  // Set user state
  const [user, setUser] = useState(null);

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
    console.log('Converted dates:', getDays(calendarType, dateType));
    getCalendarItems();
  }, [dateType]);

  // Get days in week or month
  function getDays(calendarType, dateType) {
    if (calendarType === 'day') {
      if (!dateType) return;
      let days = [];
      let day = new Date(dateType);
      day.setDate(day.getDate() + 1);
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
    // Get selected days
    const daysArr = getDays(calendarType, dateType);
    console.log('List length:', daysArr.length);
    
    var tempCalendarItems = [];

    if (user != null){
      const userDocRef = doc(firestore, 'users', user);
      const itemsRef = collection(userDocRef, user + '-items');
      console.log('itemsRef:', itemsRef);

      const itemSnapshot = await getDocs(itemsRef);

      itemSnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        tempCalendarItems.push(doc.data());
        const item = doc.data();
        console.log('Details:', item.details);
        const date = new Date(Date.parse(item.dateTime));
        const isoDate = date.toISOString().substring(0, 10);
        tempCalendarItems.push(item.details);
        tempCalendarItems.push(date);
        console.log('+1');
      });
      tempCalendarItems.shift();
      setCalendarItems(tempCalendarItems);
    }
  }

  return (
    <main>
      <section className="flex flex-row justify-around items-center">
        <section className="flex justify-center items-center h-screen">
          <div className="grid grid-cols-7 grid-rows-6 gap-4 border-4 rounded-lg p-2 px-28 bg-red-400">
            {calendarItems.map((content, index) => (
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