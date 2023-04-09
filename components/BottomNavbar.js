export default function BottomNavbar({ setShowModal, setModalContent }) {
  // Update prop configurations on button clicks
  const handleCalendarSettingsClick = () => {
    setShowModal(true);
    setModalContent(1);
  };

  const handleProfileClick = () => {
    setShowModal(true);
    setModalContent(0);
  };

  const handleAddItemClick = () => {
    setShowModal(true);
    setModalContent(2);
  };

  return (
    <nav className="fixed z-10 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <div className="inline-flex flex-col items-center justify-center px-5 rounded-full hover:bg-gray-50 group">
          <svg onClick={handleCalendarSettingsClick} className="w-12 h-12 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            <path clipRule="evenodd" fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={handleAddItemClick}>
            <svg className="h-12 w-12 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"></path>
            </svg>
          </button>
        </div>
        <div className="inline-flex flex-col items-center justify-center px-5 rounded-full hover:bg-gray-50 group">
          <svg onClick={handleProfileClick} className="w-12 h-12 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </div>
      </div>
    </nav>
  );
}