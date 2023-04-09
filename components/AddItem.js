// Import firebase & firestore components
import { doc, collection, setDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { firestore } from '../lib/firebase';
// Import react form component
import { useForm } from 'react-hook-form';
// React Hot Toast
import toast from 'react-hot-toast';

export default function AddItem(props) {
  // Set form properties and variables
  const { register, handleSubmit, reset, formState, formState: { errors } } = useForm();
  const { isValid, isDirty } = formState;
  
  // Create a new item
  const createItem = async ({ title, details, date, time }) => {
    // Get authenticated user
    const UserId = auth.currentUser.uid;

    // Create a reference to a subcollection in the user doc
    // And create the subcollection if it doesn't exist
    const userDocRef = doc(firestore, 'users', UserId);
    const userSubCollectionName = UserId + '-items';
    const subCollectionRef = collection(userDocRef, userSubCollectionName);

    const dateString = date + 'T' + time;
    const dateTime = new Date(dateString);
    console.log(dateTime.toISOString());

    // Add a document to the subcollection with all the data
    await setDoc(doc(subCollectionRef), {
      // Add data for the new document
      title: title,
      details: details,
      dateTime: dateTime.toISOString(),
    });

    // Reset form register values and send toast to display success message
    reset({ title, details, date, time });
    toast.success('Successfully added in a item to your calendar!');
    // Pass new item through props => Reload Calendar View
    handleItemCreation(title);
  }

  const handleItemCreation = (title) => {
    props.onItemCreation(title);
  }


  return (
    <section className="border-4 rounded-lg p-2 px-28 bg-red-400">
      <div className="text-slate-800">
        <h2 className="text-xl font-bold">Add Item</h2>
        <form onSubmit={handleSubmit(createItem)}>
          <h3>Choose item title :</h3>
          <input className="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('title', { required: true })} type="text" />
          <h3 className="mt-2">Choose item details :</h3>
          <textarea className="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('details', { required: false })}></textarea>         
          <h3>Choose item date :</h3>
          <input className="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('date', { required: true })} type="date" />
          <h3>Choose item time :</h3>
          <input className="w-80 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" {...register('time', { required: true })} type="time" />
          <input className="w-80 border-4 rounded p-2 mt-6 bg-white hover:bg-gray-100 text-slate-800" type="submit" disabled={!isDirty || !isValid} />
        </form>
      </div>
    </section>
  );
}