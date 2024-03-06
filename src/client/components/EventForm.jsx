import '../../App.css'
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';


function EventForm() {

    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(undefined)

    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
      }

    async function handleClick(e) {
        e.preventDefault()
        let formData = new FormData(document.getElementById('eventDetails'))
        document.getElementById('eventDetails').reset()
        const data = Object.fromEntries(formData)
        console.log(data);
        // const response = await fetch('/api/createEvent', {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        // })
        // const res = await response.json();
        // console.log(res);
    }

    async function handleLogin() {
        const loginCreds = {
            email: email,
            password: password
        }
        console.log(loginCreds)
    }

    useEffect(() => {
        console.log('email', email, 'password', password)
    }, [email, password])

    if (userId !== undefined) {

    return (
        <div className="">
            <form id="eventDetails" onSubmit={handleClick} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0">
                <div className="w-1/3">
                <input type="text" name="name" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Event Name"></input>
                <br></br>
                <br></br>
                <input type="text" name="address" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Address"></input>
                <br></br>
                <br></br>
                <input type="text" name="city" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="City"></input>
                <br></br>
                <br></br>
                <input type="text" name="state" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="State (e.g., TN, CA, FL)"></input>
                <br></br>
                <br></br>
                <input type="text" name="zip" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Zipcode"></input>
                <br></br>
                <br></br>
                <input type="text" name="date" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Date (e.g., 03/17/2024)"></input>
                <br></br>
                <br></br>
                <input type="text" name="time" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Time (e.g., 19:30 EST)"></input>
                <br></br>
                <br></br>
                <button type="submit" className="text-black border border-slate-500 bg-slate-300 hover:bg-slate-700 hover:text-white rounded-md w-48 h-10 shadow-lg">Save and Send Invites</button>
                </div>
                <div className="w-2/3">
                <textarea name="description" className="border-2 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md" placeholder="Event Description ..."></textarea>
                <br></br>
                <br></br>
                <textarea name="emails" className="border-2 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md" placeholder="Provide guest emails, separated by comma (e.g., bestie@test.com, friend@email.com)"></textarea>
                <br></br>
                <br></br>
                </div>
                </div>
            </form>
        </div>
    )

} else {
    return (
        <div id="unknownUser">
            <div id="eventDetails" onSubmit={(handleClick)} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0">
                <div className="w-1/3">
                <h3 type="text" name="name" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">Eclipse Party 2024</h3>
                <br></br>
                <h3 type="text" name="address" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">123 Sundown Street</h3>
                <br></br>
                <h3 type="text" name="city" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">Indianapolis</h3>
                <br></br>
                <h3 type="text" name="state" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">IN</h3>
                <br></br>
                <h3 type="text" name="zip" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">12345</h3>
                <br></br>
                <h3 type="text" name="date" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">04/08/2024</h3>
                <br></br>
                <h3 type="text" name="time" className="border-2 border-gray-500 shadow-lg h-10 w-80 rounded-md">14:00 EDT</h3>
                <br></br>
                <button onClick={() => setOpenModal(true)} className="text-black border border-pink-800 bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 shadow-lg p-4">Login or Sign Up to Create New Event</button>
                </div>
                <div className="w-2/3">
                <h3 name="description" className="border-2 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md bg-white pl-4">Join us in the backyard for barbecue and drinks while we view the full solar eclipse! Viewing glasses will be provided for all. BYOB.</h3>
                <br></br>
                <br></br>
                <h3 name="emails" className="border-2 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md bg-white pl-4" >johndoe@test.com, bestfriend@email.com, janejacobs@email.com</h3>
                <br></br>
                <br></br>
                <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login to Your Account</h3>
                    <div>
                    <TextInput
                        id="email"
                        placeholder="name@email.com"
                        onChange={(event) => setEmail(event.target.value)}
                        shadow
                        required
                    />
                    </div>
                    <div>
                    <TextInput
                        id="password"
                        placeholder="password" 
                        type="password"
                        onChange={(event) => setPassword(event.target.value)} 
                        shadow
                        required />
                    </div>
                    <br></br>
                    <div className="w-full">
                    <Button onClick={() => {
                        handleLogin();
                        
                        setOpenModal(false)
                        }} 
                        className="bg-cyan-500">Log in to your account</Button>
                    </div>
                    <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                    <a href="/api/recover-password" className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-500">
                        Lost Password?
                    </a>
                    </div>
                    <button className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-500">
                        Create account
                    </button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
                </div>
                </div>
            </div>
        </div>
    )
}
}



export default EventForm;