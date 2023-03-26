// Import link from next
import Link from 'next/link';

// Display navbar component and export it
export default function Navbar() {

  return (
    <nav class="border-b-4 bg-slate-800 p-2">
      <ul class="flex align-middle justify-between items-center">
        <li><Link href="/"><img class="h-24" src={'/calendar.png'} /></Link></li>
        <li><Link href="/enter"><button class="w-56 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-gray-500">Enter Page</button></Link></li>
      </ul>
    </nav>
  );
}