// Import useRouter to reroute user
import { useRouter } from 'next/router';
// Import useContext and UserContext to access user data
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';

// Display home screen and export it
export default function ViewCalendar() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  {/* If user is not signed in, reroute to enter page */}
  useEffect(() => {
    if (user == null || username == null){
      router.push('/');
    }
  }, [user, username])

  return (
    <main>
    </main>
  );
}