import EventForm from './client/components/EventForm';
import "./App.css"
import NavBar from './client/components/NavBar';

function App() {

  return (
    <div className="w-full h-full ">
      <div className='flex items-start'>
        <div className=''>
        </div>
      </div>
      <div className=''></div>
      <div className='grid grid-cols-1 place-items-center pt-12 pl-8 pb-12'>
        <h1 className="text-slate-800 text-3xl border rounded-lg border-slate-800 p-4 bg-gradient-to-tr from-white to-violet-100 w-1/3 text-center">Planorama ... the party starts here!
        </h1>
      </div>
      <div className='flex space-x-36 justify-center pb-8'>
        <div id="formBorder" className='w-2/3 border h-fit border-slate-800 p-4 rounded-lg bg-gradient-to-tr from-teal-100 to-pink-100 bg-cover shadow-xl pl-6'>
          <br></br>
          <EventForm />
        </div>
        <div id="landingText" className='w-1/3 border h-fit border-slate-800 p-4 rounded-lg bg-gradient-to-tr from-pink-100 to-white bg-cover shadow-xl'>
          <p className='text-xl p-4 text-justify'>Welcome to Planorama! Create an event and start inviting friends now! <br></br><br></br>Fill in the details, and let us take care of the rest. We'll email an event link with everything your guests need to know to whomever you like. Meanwhile, you can focus on planning the event.<br></br><br></br> You must be registered to create an event, but anyone with a link can view the event details. Registered users can also RSVP and see who else is invited. While you're here, check out the profile page to keep track of all your upcoming events and RSVPs.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
