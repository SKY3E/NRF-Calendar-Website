import { doc, collection, setDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { firestore } from '../lib/firebase';

export default function AddItem() {
  const { register, handleSubmit, reset, formState, formState: { errors } } = useForm();
  const { isValid, isDirty } = formState;

  const createItem = async ({ title, details, date, time }) => {
    const UserId = auth.currentUser.uid;

    // Assuming you have a user document reference
    const userDocRef = doc(firestore, 'users', UserId);
    const userSubCollectionName = UserId + '-items';

    // Create a subcollection within the user document
    const subCollectionRef = collection(userDocRef, userSubCollectionName);

    // Add a document to the subcollection
    const newDocRef = await setDoc(doc(subCollectionRef), {
      // Add data for the new document
      title: title,
      details: details,
      date: date,
      time: time
    });
    reset({ title, details, date, time });
  }


  return (
    <section class="border-4 rounded-lg p-2 px-28 bg-red-400">
      <div class="text-slate-800">
        <h2 class="text-xl font-bold">Add Item</h2>
        <form onSubmit={handleSubmit(createItem)}>
          <h3>Choose item title :</h3>
          <input class="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('title', { required: true })} type="text" />
          <h3 class="mt-2">Choose item details :</h3>
          <textarea class="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('details', { required: false })}></textarea>         
          <h3>Choose item date :</h3>
          <input class="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('date', { required: true })} type="date" />
          <h3>Choose item time :</h3>
          <input class="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('time', { required: true })} type="time" />
          <input class="w-80 border-4 rounded p-2 mt-6 bg-white hover:bg-gray-100 text-slate-800" type="submit" disabled={!isDirty || !isValid} />
        </form>
      </div>
    </section>
  );
}