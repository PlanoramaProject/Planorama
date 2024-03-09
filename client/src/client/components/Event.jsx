import { Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, TextInput, Label } from 'flowbite-react';
import NavBar from './NavBar';

function Event() {

    const {id} = useParams();

// need this route to retern event details AND current user details
    // async function getEvent(){
    //     setPrevData(data);
    //     fetch(`/api//v1/event/{id}`)
    //         .then((res) => res.json())
    //         .then(data) => {
    //              let locArr = data.location.split(',');
    //              data.street = locArr[0];
    //              data.city = locArr[1];
    //              data.state = locArr[2];
    //              data.zip = locArr[3];
                    // setData(data);
                // }

    // useEffect(() => {
    //     getEvent();
    // })


    const [data, setData] = useState({
        eventName:'Eclipse Party',
        street: '1234 Sundown Drive', 
        city: 'Indianapolis',
        state: 'IN', 
        zip: '55994',
        date: '04/08/2024',
        startTime: '14:00:00 EDT',
        endTime: '14:00:00 EDT',
        description: 'Join us to celebrate the spring and view the full solar eclipse with a barbecue and yard games. Eclipse glasses will be proivded, but BYOB!',
        guests: ['test@test.com', 'friend@email.com'],
        hostName:'Dane Smith',
        capacity:'',
    })
    const [prevData, setPrevData] = useState({
        eventName:'',
        street:'',
        city:'',
        state:'',
        zip:'',
        date:'',
        startTime:'',
        endTime:'',
        description:'',
        guests:'',
        hostName:'',
        capacity:'',
    })
    //delete this for prod
    //setPrevData(data);
    const [user, setUser] = useState({host: true})
    const [edit, setEdit] = useState(false);
    const [validated, setValidated] = useState({
        eventName: 'gray',
        street:'gray',
        city:'gray',
        state:'gray',
        zip:'gray',
        date:'gray',
        startTime:'gray',
        endTime:'gray',
    });
    const [required, setRequired] = useState({
        eventName: '',
        address:'',
        city:'',
        state:'',
        zip:'',
        date:'',
        startTime:'',
        endTime:'',
    });
    


    async function handleClick(e) {
        console.log('handle click')
        let editStatus = true;
        e.preventDefault();
        let formData = new FormData(document.getElementById('eventDetails'));
        const updatedEvent = Object.fromEntries(formData);
        updatedEvent.hostName = data.hostName;
        document.getElementById('eventDetails').reset();
        setPrevData(data)

        for (let key in updatedEvent) {
            if (updatedEvent[key] === '' && key !== 'emails' && key !== 'description' && key !== 'capacity') {
                editStatus = false;
                setValidated((prev) => ({...prev, [key]:'failure'}));
                setData(updatedEvent); 
                let firstLetter = [key].toString()[0];
                let firstLetterCap = firstLetter.toUpperCase()
                let remainingLetters = [key].toString().slice(1);
                let capKey = firstLetterCap + remainingLetters
                setRequired((prev) => ({...prev, [key]: `Required: ${capKey}`}))
            } else {
                setValidated((prev) => ({...prev, [key]:'success'}));
                setRequired((prev) => ({...prev, [key]: ``}))
            }
        }
        if (editStatus) {

            setData(Object.assign(updatedEvent));

            for (let key in data) {
                setRequired((previous) => ({...previous, [key]:''}))
                setValidated((previous) => ({...previous, [key]:'gray'}))
            }

            setEdit(false);
            updatedEvent.location = updatedEvent.street + ',' + updatedEvent.city + ',' + updatedEvent.state + ',' + updatedEvent.zip; 

            console.log('fetch');
            fetch('/api/v1/event', {
                method: 'PUT',
                body: JSON.stringify(updatedEvent),
                headers: {
                    "Content-Type": "application/json",
                }
            })

        }
    }

    async function deleteClick() {
        fetch(`/api/v1/event/${id}`, {
            method: 'DELETE',
        })
    }

    if (!user.host) {  
        return (
            <div className="w-full h-screen p-12">
            <div>
                <NavBar />
            </div>
            <div className='pl-48'>
            <br></br>
            <br></br>
                <div className='flex justify center'>
                <div className='w-1/3 border border-slate-700 bg-gradient-to-tl from-red-100 to-white rounded-md p-6 shadow-lg'>
                    <h2 className='text-center text-slate-800 text-3xl'>You're invited to: <u>{data.eventName}</u>!</h2>
                </div>
                </div>
                <br></br>
                <br></br>
                <div className='flex justify-center'>
                <div className="w-fit border bg-gradient-to-br from-red-100 to-emerald-100 border-gray-700 rounded-md p-8 shadow-xl">
                    <div id="exampleEvent" className="p-4 pr-8">
                        <div className="grid grid-cols-2 gap-0">
                            <div className="w-1/3">
                                <label className='pb-2'>Host:</label>
                                <h3 type="text" name="hostName" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.hostName}</h3>
                                <br></br>
                                <label className='pb-2'>Date:</label>
                                <h3 type="text" name="date" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.date}</h3>
                                <br></br>
                                <label className='pb-2'>Time:</label>
                                <h3 type="text" name="startTime" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.startTime} - {data.endTime}</h3>
                                <br></br>
                                <label className='pb-2'>Location:</label>
                                <h3 type="text" name="zip" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-fit w-80 text-md rounded-md p-2">{data.street}<br></br>{data.city}, {data.state}<br></br>{data.zip}</h3>
                                <br></br>
                                </div>
                                <div className="w-2/3">
                                <label className='pb-2'>Description:</label>
                                <h3 name="description" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 text-md pt-1 pb-1 h-48 rounded-md bg-white pl-4">{data.description}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
    )  
    
    } else if (!edit) {
        return(
            <div className="w-full h-screen p-12">
                <div>
                    <NavBar />
                </div>
                <br></br>
                <br></br>
                <div className='pl-48'>
                <div className='flex justify-center'>
                <div className='w-1/3 border border-slate-700 bg-gradient-to-tl from-red-100 to-white rounded-md p-6 shadow-lg'>
                <h2 className='text-center text-slate-800 text-3xl'>You're invited to: <u>{data.eventName}</u>!</h2>
                </div>
                </div>
                <br></br>
                <br></br>
                <div className='flex justify-center'>
                <div className="w-fit border bg-gradient-to-br from-red-100 to-emerald-100 border-gray-700 rounded-md p-8 shadow-xl">
                    <div id="exampleEvent" className="p-4 pr-8">
                        <div className="grid grid-cols-2 gap-0">
                            <div className="w-1/3">
                                <label className='pb-2'>Host:</label>
                                <h3 type="text" name="hostName" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.hostName}</h3>
                                <br></br>
                                <label className='pb-2'>date:</label>
                                <h3 type="text" name="date" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.date}</h3>
                                <br></br>
                                <label className='pb-2'>Time:</label>
                                <h3 type="text" name="startTime" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.startTime} - {data.endTime}</h3>
                                <br></br>
                                <label className='pb-2'>Location:</label>
                                <h3 type="text" name="location" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-fit w-80 text-md  rounded-md p-2">{data.street}<br></br>{data.city}, {data.state}<br></br>{data.zip}</h3>
                                <br></br>
                                <div className="pt-6">
                                <button name='edit' onClick={() => {
                                    setEdit(true)
                                    setPrevData(data)
                                    }} className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 text-md shadow-lg p-2 font-bold">Edit Event</button>
                            </div>
                        </div>
                                <div className="w-2/3">
                                <label className='pb-2'>Description:</label>
                                <h3 name="description" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 text-md pt-1 pb-1 h-48 rounded-md bg-white pl-4">{data.description}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )

    } else {
        return (
            <div className="w-full h-screen bg-unfocused-lights bg-cover pt-6 pl-12">
                <br></br>
                <br></br>
            <div className='flex justify-center'>
            <div className='w-1/3 border border-slate-700 bg-gradient-to-tl from-red-100 to-white rounded-md p-6 shadow-lg'>
                <h2 className='text-3xl text-center'>Edit Your Event</h2>
            </div>
            </div>
            <br></br>
            <br></br>
            <div className='pb-12 flex justify-center'>
            <div className="w-fit border bg-gradient-to-br from-red-100 to-emerald-100 border-gray-700 rounded-md p-6 shadow-xl">
            <form id="eventDetails" onSubmit={handleClick} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0 relative">
                <div className="w-1/3">
                <Label className="w-fit">{required.eventName}</Label>
                <TextInput type="text" name="eventName" color={validated.eventName} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.eventName}></TextInput>
                <br></br>
                <Label className="w-fit">{required.street}</Label>
                <TextInput type="text" name="street" color={validated.street} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.street}></TextInput>
                <br></br>
                <Label className="w-fit">{required.city}</Label>
                <TextInput type="text" name="city" color={validated.city} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.city}></TextInput>
                <br></br>
                <Label className="w-fit">{required.state}</Label>
                <TextInput type="text" name="state" color={validated.state} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.state}></TextInput>
                <br></br>
                <Label className="w-fit">{required.zip}</Label>
                <TextInput type="text" name="zip" color={validated.zip} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.zip}></TextInput>
                <br></br>
                <Label className="w-fit">{required.date}</Label>
                <TextInput type="text" name="date" color={validated.date} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.date}></TextInput>
                <br></br>
                <Label className="w-fit">{required.startTime}</Label>
                <TextInput type="text" name="startTime" color={validated.startTime} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.startTime}></TextInput>
                <br></br>
                <Label className="w-fit">{required.endTime}</Label>
                <TextInput type="text" name="endTime" color={validated.endTime} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.endTime}></TextInput>
                <br></br>
                <TextInput type="text" name="capacity" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" placeholder='Capacity' defaultValue={data.capacity}></TextInput>
                <br></br>
                <br></br>
                <button type="submit" className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 text-md shadow-xl p-2 font-bold">Save Changes</button>
                <br></br>
                <br></br>
                <button type="button" onClick={() => {
                    setData(prevData)
                    for (let key in validated) {
                        setValidated((previous) => ({...previous, [key]:'gray'}))
                        setRequired((previous) => ({...previous, [key]:''}))
                    }
                    setEdit(false)
                    }} className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 text-md shadow-xl p-2 font-bold">Cancel</button>
                </div>
                <div className="w-2/3">
                <textarea name="description" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl w-96 text-md pt-1 pb-1 h-48 rounded-md" defaultValue={data.description}></textarea>
                <br></br>
                <br></br>
                <textarea name="emails" className="text-gray-500 focus:ring-0 focus:border-sky-600 border-0 shadow-lg w-96 text-md pt-1 pb-1 h-48 rounded-md" placeholder="Invite guests (bff@test.com, friend@email.com)"></textarea>
                <br></br>
                <div className=''>
                <button type="button" onClick={deleteClick} className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 text-md shadow-xl p-2 font-bold absolute bottom-0 right-0">Delete Event</button>
                </div>
                </div>
                </div>
            </form>
        </div>
        </div>
        </div>
    )
}
}

export default Event;