import { Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, TextInput, Label } from 'flowbite-react';

function Event() {

    const {id} = useParams();

// need this route to retern event details AND current user details
    // async function getEvent(){
    //     const res = await fetch('/api/eventDetail/{id}', {
    // })
    //     const resData = await res.json();
    //     setData(resData.event)
    //     setPrevData(resData.event)
    //     setUser(resData.user)
    // }

    // useEffect(() => {
    //     getEvent();
    // })


    const [data, setData] = useState({
        name:'Eclipse Party',
        address: '1234 Sundown Drive',
        city: 'Indianapolis',
        state: 'IN',
        zip: '55994',
        date: '04/08/2024',
        time: '14:00:00 EDT',
        description: 'Join us to celebrate the spring and view the full solar eclipse with a barbecue and yard games. Eclipse glasses will be proivded, but BYOB!',
        guests: ['test@test.com', 'friend@email.com'],
        host:'Dane Smith',
    })
    const [prevData, setPrevData] = useState({
        name:'',
        address:'',
        city:'',
        state: '',
        zip:'',
        date:'',
        time:'',
        description:'',
        guests:'',
        host:'',
    })
    //delete this for prod
   // setPrevData(data);
    const [user, setUser] = useState({host: true})
    const [edit, setEdit] = useState(false);
    const [validated, setValidated] = useState({
        name: 'gray',
        address:'gray',
        city:'gray',
        state:'gray',
        zip:'gray',
        date:'gray',
        time:'gray',
    });
    const [required, setRequired] = useState({
        name: '',
        address:'',
        city:'',
        state:'',
        zip:'',
        date:'',
        time:'',
    });
    const cityState = data.city + ", " + data.state;
    let editStatus = true;

    async function handleClick(e) {
        e.preventDefault();
        console.log('click')
        let formData = new FormData(document.getElementById('eventDetails'));
        const updatedEvent = Object.fromEntries(formData);
        updatedEvent.host = data.host;
        document.getElementById('eventDetails').reset();
        setPrevData(data)
        console.log('updatedEvent', updatedEvent)
        for (let key in updatedEvent) {
            if (updatedEvent[key] === '' && key !== 'emails' && key !== 'description') {
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

        // const response = await fetch('/api/createEvent', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        // })
        // const res = await response.json();
        // console.log(res);

        }
    }

    if (!user.host) {  
        return (
            <div className="w-full h-screen bg-unfocused-lights bg-cover p-12">
            <br></br>
            <br></br>
                <div className='w-fit border border-slate-700 bg-gradient-to-tl from-red-100 to-white rounded-md p-6 shadow-lg'>
                    <h2 className='"text-slate-800 text-3xl'>You're invited to: {data.name}!</h2>
                </div>
                <br></br>
                <br></br>
                <div className="w-fit border bg-gradient-to-br from-red-100 to-emerald-100 border-gray-700 rounded-md p-8 shadow-xl">
                    <div id="exampleEvent" className="p-4 pr-8">
                        <div className="grid grid-cols-2 gap-0">
                            <div className="w-1/3">
                                <label className='pb-2'>Host:</label>
                                <h3 type="text" name="address" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.host}</h3>
                                <br></br>
                                <label className='pb-2'>date:</label>
                                <h3 type="text" name="city" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.date}</h3>
                                <br></br>
                                <label className='pb-2'>Time:</label>
                                <h3 type="text" name="state" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.time}</h3>
                                <br></br>
                                <label className='pb-2'>Address:</label>
                                <h3 type="text" name="zip" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-fit w-80 text-md rounded-md p-2">{data.address}<br></br>{cityState}<br></br>{data.zip}</h3>
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
    )  
    
    } else if (!edit) {
        return(
            <div className="w-full h-screen bg-unfocused-lights bg-cover p-12">
                <br></br>
                <br></br>
                <div className='w-fit border border-slate-700 bg-gradient-to-tl from-red-100 to-white rounded-md p-6 shadow-lg'>
                <h2 className='"text-slate-800 text-3xl'>You're invited to: {data.name}!</h2>
                </div>
                <br></br>
                <br></br>
                <div className="w-fit border bg-gradient-to-br from-red-100 to-emerald-100 border-gray-700 rounded-md p-8 shadow-xl">
                    <div id="exampleEvent" className="p-4 pr-8">
                        <div className="grid grid-cols-2 gap-0">
                            <div className="w-1/3">
                                <label className='pb-2'>Host:</label>
                                <h3 type="text" name="address" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.host}</h3>
                                <br></br>
                                <label className='pb-2'>date:</label>
                                <h3 type="text" name="city" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.date}</h3>
                                <br></br>
                                <label className='pb-2'>Time:</label>
                                <h3 type="text" name="state" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 text-md rounded-md">{data.time}</h3>
                                <br></br>
                                <label className='pb-2'>Address:</label>
                                <h3 type="text" name="zip" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-fit w-80 text-md  rounded-md p-2">{data.address}<br></br>{cityState}<br></br>{data.zip}</h3>
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
        )

    } else {
        return (
            <div className="w-full h-screen bg-unfocused-lights bg-cover p-12">
                <br></br>
                <br></br>
            <div className='w-fit border border-slate-700 bg-gradient-to-tl from-red-100 to-white rounded-md p-6 shadow-lg'>
                <h2 className='text-3xl'>Edit Your Event</h2>
            </div>
            <br></br>
            <br></br>
            <div className="w-fit border bg-gradient-to-br from-red-100 to-emerald-100 border-gray-700 rounded-md p-8 shadow-xl">
            <form id="eventDetails" onSubmit={handleClick} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0">
                <div className="w-1/3">
                <Label className="w-fit">{required.name}</Label>
                <TextInput type="text" name="name" color={validated.name} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.name}></TextInput>
                <br></br>
                <Label className="w-fit">{required.address}</Label>
                <TextInput type="text" name="address" color={validated.address} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.address}></TextInput>
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
                <Label className="w-fit">{required.time}</Label>
                <TextInput type="text" name="time" color={validated.time} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-xl h-10 w-80 text-md rounded-md" defaultValue={data.time}></TextInput>
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
                <br></br>
                </div>
                </div>
            </form>
        </div>
        </div>
    )
}
}

export default Event;