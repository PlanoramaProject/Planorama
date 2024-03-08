import '../../App.css'
import { Button, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';


function EventForm() {
    // set boolean state for three modals (they appear on true)
    const [openModal, setOpenModal] = useState(false);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    // set state for email, password (existing user)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // set state for newEmail, newPassword, confirmPassword (new users)
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // set state for confirm signup modal
    const [confrimSignupModal, setConfirmSignupModal] = useState(false);
    // set userId state (which determines which version of components display)
    const [userId, setUserId] = useState(123);
    const [match, setMatch] = useState('gray');

    // functions that reset modal states to false when they're closed out
    function onCloseModal() {
        setOpenModal(false);
        setEmail('');
      }

    function onCloseCreate() {
        setCreateUserModal(false);
        setMatch('gray');
    }

    function onCloseConfirm() {
        setErrorModal(false);
    }

    function onCloseSignup() {
        setConfirmSignupModal(false);
    }

    // function to handle the submit button on create event form
    async function handleClick(e) {
        e.preventDefault();
        let formData = new FormData(document.getElementById('eventDetails'));
        document.getElementById('eventDetails').reset();
        const data = Object.fromEntries(formData);
        console.log(data);
        fetch("/api/v1/user/all")
        .then((res) => {
            return res.json();
        })
        .then((data) => console.log(data))

        //     method: 'POST',
        //     body: JSON.stringify(data),
        // })
        // const res = await response.json();
        // console.log(res);
    }

    // function to handle the submit button on login form
    async function handleLogin() {
        const loginCreds = {
            email: email,
            password: password
        }
        console.log(loginCreds)
    }

    // function to handle submit button on create new account form
    async function handleCreateUser() {
        if (newPassword !== confirmPassword) {
            setErrorModal(true)
        }
        const userCreds = {
            email: newEmail,
            password: newPassword
        }
        console.log(userCreds)
    }

    // function to handle click on the create account link
    async function openCreateUser() {
        setCreateUserModal(true)
    }

    // delete this function before prod --- just testing whether state is being saved on submit
    useEffect(() => {
        console.log('email', email, 'password', password)
    }, [email, password])

    // useEffect hook to change color of confirmPassword input based on whether passwords match
    useEffect(() => {
        console.log('confirm pass', confirmPassword)
        if (newPassword === confirmPassword && newPassword !== '') setMatch('success');
        if (newPassword !== confirmPassword && confirmPassword!== '') setMatch('failure');
        if (confirmPassword === '') setMatch('gray');
        console.log('new', newPassword, 'confirm', confirmPassword);
    },[newPassword, confirmPassword])


    // if the user is authenticated, display version with form and submit button
    if (userId !== undefined) {

    return (
        <div className="">
            <form id="eventDetails" onSubmit={handleClick} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0">
                <div className="w-1/3">
                <input type="text" name="name" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Event Name"></input>
                <br></br>
                <br></br>
                <input type="text" name="address" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Street Address"></input>
                <br></br>
                <br></br>
                <input type="text" name="city" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="City"></input>
                <br></br>
                <br></br>
                <input type="text" name="state" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="State (TN, CA, FL)"></input>
                <br></br>
                <br></br>
                <input type="text" name="zip" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Zipcode"></input>
                <br></br>
                <br></br>
                <input type="text" name="date" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Date (03/17/2024)"></input>
                <br></br>
                <br></br>
                <input type="text" name="time" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Time (19:30 EST)"></input>
                <br></br>
                <br></br>
                <button type="submit" className="text-black border border-pink-800 bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 shadow-lg p-2 font-bold">Create Event and Send Invites</button>
                </div>
                <div className="w-2/3">
                <textarea name="description" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md" placeholder="Event Description ..."></textarea>
                <br></br>
                <br></br>
                <textarea name="emails" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md" placeholder="Invite friends (bff@test.com, friend@email.com)"></textarea>
                <br></br>
                <br></br>
                </div>
                </div>
            </form>
        </div>
    )
// if user is not authenticated, display version that has example event and button to create account or login
} else {
    return (
        <div id="unknownUser">
            <div id="exampleEvent" onSubmit={(handleClick)} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0">
                <div className="w-1/3">
                <h3 type="text" name="name" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">Eclipse Party 2024</h3>
                <br></br>
                <h3 type="text" name="address" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">123 Sundown Street</h3>
                <br></br>
                <h3 type="text" name="city" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">Indianapolis</h3>
                <br></br>
                <h3 type="text" name="state" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">IN</h3>
                <br></br>
                <h3 type="text" name="zip" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">12345</h3>
                <br></br>
                <h3 type="text" name="date" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">04/08/2024</h3>
                <br></br>
                <h3 type="text" name="time" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">14:00 EDT</h3>
                <br></br>
                <button onClick={() => setOpenModal(true)} className="text-black border border-pink-800 bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 shadow-lg p-2 font-bold">Login or Sign Up to Create New Event</button>
                </div>
                <div className="w-2/3">
                <h3 name="description" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-48 rounded-md bg-white pl-4">Join us in the backyard for barbecue and drinks while we view the full solar eclipse! Viewing glasses will be provided for all. BYOB.</h3>
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
                    <div className="w-full">
                    <Button onClick={() => {
                        handleLogin();
                        
                        setOpenModal(false)
                        }} 
                        className="bg-cyan-500">Log in to your account</Button>
                    </div>
                    <div className="flex justify-between">
                    <div className="flex items-center gap-2 pl-1">
                    <a href="/api/recover-password" className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-500">
                        Lost Password?
                    </a>
                    </div>
                    <button onClick={openCreateUser} className="text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-500">
                        Create account
                    </button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
            <Modal show={createUserModal} size="md" onClose={onCloseCreate} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create User Account</h3>
                    <div>
                    <TextInput
                        id="email"
                        placeholder="name@email.com"
                        onChange={(event) => setNewEmail(event.target.value)}
                        shadow
                        required
                    />
                    </div>
                    <div>
                    <TextInput
                        id="password"
                        placeholder="password" 
                        type="password"
                        onChange={(event) => {
                            setNewPassword(event.target.value)
                            console.log(newPassword)
                        }} 
                        shadow
                        required />
                    </div>
                    <div>
                    <TextInput
                        id="confirmPassword"
                        placeholder="confirm password" 
                        type="password"
                        onChange={(event) => setConfirmPassword(event.target.value)} 
                        shadow
                        color={match}
                        required />
                    </div>
                    <div className="w-full">
                    <Button onClick={() => {
                        handleCreateUser();
                        setCreateUserModal(false);
                        setConfirmSignupModal(true);
                        }} 
                        className="bg-cyan-500">Create Account</Button>
                    </div>
                    
                </div>
                </Modal.Body>
            </Modal>
            <Modal show={errorModal} size="md" onClose={onCloseConfirm} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 h-72 grid grid-cols-1 place-items-center">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Error: Passwords Do Not Match<br></br>Please try again</h3>
                    <div>
                    <div className="w-full">
                    </div>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
            <Modal show={confrimSignupModal} size="md" onClose={onCloseSignup} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 h-72 grid grid-cols-1 place-items-center">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">User account created. Please login to begin creating events.</h3>
                    <div>
                    <div className="w-full">
                    </div>
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