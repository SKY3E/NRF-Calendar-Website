import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Home() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  
  if (user == null || username == null){
    router.push('/enter');
  }

  return (
    <main>

    </main>
  );
}
