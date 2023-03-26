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
    <main>
      <div>
        <h1>Enter Page</h1>
      </div>
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
    <div>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.png'} /> Sign in with Google
        
      </button>
      <button onClick={() => toast.success("You're currently signed out.")}>Sign-In State</button>
    </div>
  );
}

function SignOutButton() {
  return(
    <div>
      <button onClick={() => auth.signOut()}>Sign out</button>
      <button onClick={() => toast.success("You're currently signed in.")}>Sign-In State</button>
    </div>
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
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="username" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p>Something went wrong.</p>;
  }
}