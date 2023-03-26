import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';

import { Signika_Negative } from '@next/font/google';
const signikaNegative = Signika_Negative({ 
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-signikaNegative',
});

export default function App({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <main className={`${signikaNegative.variable} font-sans`}>
      <UserContext.Provider value={ userData }>
        < Navbar />
        <Component {...pageProps} />
        <Toaster />
        < Footer />
      </UserContext.Provider>
    </main>
  );
}
