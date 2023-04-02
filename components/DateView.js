export default function dateViewDisplayer(props){
  const dateType = props.dateType;

  const handleDateTypeChange = (event) => {
    const date = event.target.value;
    props.onDateTypeChange(date);
  };

  if (dateType === 'day'){
    return (
      <section>
        <p className="font-semibold mb-1">Choose your day</p>
        <input onChange={handleDateTypeChange} className="w-56 border-4 rounded p-2 bg-white hover:bg-gray-100 text-slate-800" type="date" />
      </section>
    );
  }

  if (dateType === 'week'){
    return (
      <section>
        <p className="font-semibold mb-1">Choose your week</p>
        <input onChange={handleDateTypeChange} className="w-56 border-4 rounded p-2 bg-white hover:bg-gray-100 text-slate-800" type="week" />
      </section>
    );
  }

  if (dateType === 'month'){
    return (
      <section>
        <p className="font-semibold mb-1">Choose your month</p>
        <input onChange={handleDateTypeChange} className="w-56 border-4 rounded p-2 bg-white hover:bg-gray-100 text-slate-800" type="month" />
      </section>
    );
  }
}