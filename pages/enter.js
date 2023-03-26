// Authentication
import { googleAuthProvider, auth, firestore } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
// Use context & react components
import { UserContext } from '../lib/context';
import { useEffect, useState, useCallback, useContext } from 'react';
// Use debounce
import debounce from 'lodash.debounce';
// Write and get documents from firestore
import { doc, getDoc, writeBatch } from 'firebase/firestore'
// React Hot Toast
import toast from 'react-hot-toast';

// Defaut EnterPage Export
export default function EnterPage() {
  const { user, username } = useContext(UserContext);

  return (
    <main class="mt-2 flex justify-center items-center">
      {/* Check if user is signed in - if not, show sign in form, else show sign out button, else show sign in button */}
      {user ? 
        !username ? <UsernameForm /> : <SignOutButton />
        : 
        <SignInButton />
      }
    </main>
  );
}

// Create Sign In Page w/ Popup Window
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return ( 
    <section class="border-4 rounded-lg p-2 px-28 bg-red-400">
      <div class="text-slate-800">
        <h2 class="text-xl font-bold">Sign-in</h2>
        <p class="font-semibold">Access your personalized calendar</p>
      </div>
      <button class="h-16 w-56 flex items-stretch space-x-2 border-4 rounded p-2 bg-white hover:bg-gray-50 mt-2" onClick={signInWithGoogle}>
        <img src={'/google.png'} /> <div class="text-gray-500 m-auto">Sign in with Google</div>
      </button>
      <button class="w-56 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-gray-500" onClick={() => toast.success("You're currently signed out.")}>Check Sign-In State</button>
    </section>
  );
}

function SignOutButton() {
  return(
    <section class="border-4 rounded-lg p-2 px-28 bg-red-400 flex flex-col">
      <div class="text-slate-800">
        <h2 class="text-xl font-bold">Sign-out</h2>
        <p class="font-semibold">Sign-in to another account</p>
      </div>
      <button class="w-56 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-gray-500" onClick={() => auth.signOut()}>Sign out</button>
      <button class="w-56 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-gray-500" onClick={() => toast.success("You're currently signed in.")}>Sign-In State</button>
    </section>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = doc(firestore, "users", user.uid);
    const usernameDoc = doc(firestore, "usernames", formValue);

    const batch = writeBatch(firestore);
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = async (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        console.log(username);
        const ref = doc(firestore, 'usernames', username);
        const docRef = await getDoc(ref);
        console.log('Firestore read executed!');
        if (docRef.exists()){
          setIsValid(false);
        } else {
          setIsValid(true);
        }
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section class="border-4 rounded-lg p-2 px-28 bg-red-400 flex flex-col">
        <h2 class="text-slate-800 text-xl font-bold">Create Personal Profile</h2>
        <p class="text-slate-800 text-xl font-semibold">Choose Username</p>
        <hr class="border-t-4 border-dashed"/>
        <form class="mt-2 flex space-x-4" onSubmit={onSubmit}>
          <div>
            <input class="border-4 rounded p-2 w-full focus:outline-none focus:border-slate-800 focus:ring-slate-800 focus:ring-1" name="username" placeholder="username" value={formValue} onChange={onChange} />
            <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
            <button class="w-56 border-4 rounded p-2 bg-white hover:bg-gray-100 text-gray-500" type="submit" disabled={!isValid}>
              Choose
            </button>
          </div>
          <div>
            <h3 class="text-slate-800 text-xl font-semibold">Debug State</h3>
            <div class="text-slate-800">
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p class="text-slate-800">Checking...</p>;
  } else if (isValid) {
    return <p class="text-slate-800">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p class="text-slate-800">That username is taken!</p>;
  } else {
    return <p class="text-slate-800">Waiting...</p>;
  }
}