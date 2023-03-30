// Import website components
import Navbar from '../components/Navbar';
import Toolbar from '../components/Toolbar';
// Import UserContext and useUserData
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
// Import Toaster and tailwindcss
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
// Import and create a font variable
import { Signika_Negative } from "next/font/google";
const signikaNegative = Signika_Negative({ 
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-signikaNegative',
});

// Display website components and export it
export default function App({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <main className={`${signikaNegative.variable} font-sans`}>
      {/* Set UserContext to current user data */}
      <UserContext.Provider value={ userData }>
        < Navbar />
        <Component {...pageProps} />
        <Toaster />
        <Toolbar />
      </UserContext.Provider>
    </main>
  );
}
