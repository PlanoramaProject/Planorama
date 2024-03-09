import EventForm from './client/components/EventForm';
import "./App.css"

function App() {

  return (
    <div className="w-full h-full ">
    <div className='grid grid-cols-1 place-items-center pt-12 pl-8'>
    <h1 className="text-slate-800 text-3xl border rounded-lg border-slate-800 p-4 bg-gradient-to-tr from-white to-violet-100 w-1/3 text-center">Planorama ... the party starts here!</h1>
    </div>
    <div className="grid grid-cols-1 place-items-center pb-8">
      <br></br>
      <br></br>
    <div id="formBorder" className='border h-fit w-auto border-slate-800 p-4 rounded-lg bg-gradient-to-tr from-teal-100 to-pink-100 bg-cover shadow-xl'>
    <div className="grid grid-cols-1 place-items-center">
    <div>
    </div>
    </div>
    <br></br>
    <EventForm />
    </div>
    </div>
    </div>
  );
}

export default App;
