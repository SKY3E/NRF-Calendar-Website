// Import useRouter to reroute user
import { useRouter } from 'next/router';
// Import useContext and UserContext to access user data
import { useContext } from 'react';
import { UserContext } from '../lib/context';

// Display home screen and export it
export default function Home() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  {/* If user is not signed in, reroute to enter page */}
  if (user == null || username == null){
    router.push('/enter');
  }

  return (
    <main>

    </main>
  );
}
