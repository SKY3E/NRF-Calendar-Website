// Import components
import Auth from '../components/Auth';
import Modal from '../components/Modal';

// Home page
export default function Home() {
  return (
    <main class="mt-2 flex flex-row justify-around items-center">
      <div class="mt-2 flex flex-col justify-center items-center basis-2/3">
        <section class="border-4 rounded-lg p-2 mb-2 bg-red-400 w-8/12">
          <h4 class="text-4xl font-bold text-slate-800">Welcome to Open Calendar!</h4>
          <p class="text-slate-800">Organize your day, week, or month with <strong>Open Calendar</strong>, <br></br> by signing up today or logging in.</p>
        </section>
        <Auth />
        <section class="border-4 rounded-lg p-2 mt-2 bg-red-400 w-8/12">
         <h4 class="text-4xl font-bold text-slate-800">How to use ?</h4>
         <p class="text-slate-800">Click on the + at the top of the screen to add an item to your <br></br> personalized calendar.</p>
        </section>
      </div>
      <div class="basis-1/3">
        <img class="h-96" src={'/calendar.png'} />
      </div>
      <Modal />
    </main>
  );
}