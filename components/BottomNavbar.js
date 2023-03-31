export default function BottomNavbar({ setShowModal, setModalContent }) {
  const handleCalendarSettingsClick = () => {
    setShowModal(true);
    setModalContent(0);
  };

  const handleProfileClick = () => {
    setShowModal(true);
    setModalContent(1);
  };

  const handleAddItemClick = () => {
    setShowModal(true);
    setModalContent(2);
  };

  return (
    <nav class="fixed z-10 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2">
      <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
        <div class="inline-flex flex-col items-center justify-center px-5 rounded-full hover:bg-gray-50 group">
          <button onClick={handleCalendarSettingsClick}>Calendar Settings</button>
        </div>
        <div class="flex items-center justify-center">
          <button onClick={handleAddItemClick}>
            <svg class="h-12 w-12 p-2 rounded-full bg-slate-500 hover:bg-blue-900" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"></path>
            </svg>
          </button>
        </div>
        <div class="inline-flex flex-col items-center justify-center px-5 rounded-full hover:bg-gray-50 group">
          <button onClick={handleProfileClick}>Profile</button>
        </div>
      </div>
    </nav>
  );
}