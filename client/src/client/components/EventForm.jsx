import '../../App.css';
import { Button, Modal, TextInput, Label } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function EventForm() {
    const navigate = useNavigate();

    // set boolean state for three modals (they appear on true)
    const [openModal, setOpenModal] = useState(false);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    // set state for email, password (existing user)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState('gray');
    const [emailValidLabel, setEmailValidLabel] = useState('');
    const [passwordValid, setPasswordValid] = useState('gray');
    const [passwordValidLabel, setPasswordValidLabel] = useState('');
    // set state for newEmail, newPassword, confirmPassword (new users)
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmailValid, setNewEmailValid] = useState('gray')
    const [newPasswordValid, setNewPasswordValid] = useState('gray')
    const [newUsernameValid, setNewUsernameValid] = useState('gray')
    // const [createUserSuccess, setCreateUserSuccess] = useState(true);
    // set state for confirm signup modal
    const [confrimSignupModal, setConfirmSignupModal] = useState(false);
    // set userId state (which determines which version of components display)
    const [userId, setUserId] = useState(12345);
    const [match, setMatch] = useState('gray');
    const [validated, setValidated] = useState({
        eventName: 'gray',
        address:'gray',
        city:'gray',
        state:'gray',
        zip:'gray',
        date:'gray',
        startTime:'gray',
        endTime:'gray',
    });
    const [required, setRequired] = useState({
        name: '',
        address:'',
        city:'',
        state:'',
        zip:'',
        date:'',
        startTime:'',
        endTime:'',
    });
    let editStatus = true;

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
        editStatus = true;
        e.preventDefault();
        let formData = new FormData(document.getElementById('eventDetails'));
        const data = Object.fromEntries(formData);
        data.location = data.address + "," + data.city + "," + data.state + "," + data.zip;
        data.hostName = 'Dane Smith';

        for (let key in data) {
            if (data[key] === '' && key!== 'description' && key!== 'emails'&& key!== 'capacity') {
                console.log('empty value')
                editStatus = false;
                setValidated((prev) => ({...prev, [key]:'failure'}));
                setRequired((prev) => ({...prev, [key]: `* Required`}))
            } else {
                setValidated((prev) => ({...prev, [key]:''}));
                setRequired((prev) => ({...prev, [key]: ``}))
            }
        }

        if (editStatus === true) {
            document.getElementById('eventDetails').reset();
        
        fetch('/api/v1/event', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
        })
            .then((res) => {
                return res.json
            })
            .then((res) => {
                console.log(res)
                navigate(`/events/123`)
            })
            .catch((err) => console.log(err))
        }
    }

    // function to handle the submit button on login form
    async function handleLogin() {
        let continueLogin = true;

        if (email === '' || !email.includes('@')) {
            setEmailValid('failure')
            setEmailValidLabel('Please enter a valid email')
            continueLogin = false;
        } else {
            setEmailValid('success')
            setEmailValidLabel('')
        }
        if (password === '') {
            setPasswordValid('failure')
            setPasswordValidLabel('* Required')
            continueLogin = false;
        } else {
            setPasswordValid('success')
            setPasswordValidLabel('')
        }

        if (continueLogin) {
            const loginCreds = {
            email: email,
            password: password,
            }
            setEmailValid('gray');
            setPasswordValid('gray');
            setEmail('');
            setPassword('');
            setOpenModal(false)
        }
    }

    // function to handle submit button on create new account form
    async function handleCreateUser() {
        let createUserSuccess = true;

        if (newPassword !== confirmPassword) {
            setErrorModal(true)
        }
        if (newEmail.length < 3 || !newEmail.includes('@')) {
            setNewEmailValid('failure')
            setEmailValidLabel('* Please enter a valid email address')
            createUserSuccess = false;
        } else {
            setNewEmailValid('success')
            setEmailValidLabel('')
        }
        if (newUsername === '') {
            setNewUsernameValid('failure')
            createUserSuccess = false;
        } else {
            setNewUsernameValid('success')
        }
        if (newPassword === '') {
            setNewPasswordValid('failure')
            createUserSuccess = false;
        } else {
            setNewPasswordValid('success')
        }

        if (createUserSuccess === true) {

            const userCreds = {
                name: newUsername,
                email: newEmail,
                password: newPassword,
            }

            setCreateUserModal(false);
            setConfirmSignupModal(true);
            setNewEmailValid('gray');
            setNewUsernameValid('gray');
            setNewPasswordValid('gray');
            setMatch('gray');
        }
    }

    // function to handle click on the create account link
    async function openCreateUser() {
        setCreateUserModal(true);
        console.log("create user modal", createUserModal)
    }

    // function to handle cancel button on event create form
    function cancelClick() {
        for (let key in validated) {
            setValidated((previous) => ({...previous, [key]:''}));
            setRequired((previous) => ({...previous, [key]:''}))
        }
    }

    // useEffect hook to change color of confirmPassword input based on whether passwords match
    useEffect(() => {
        if (newPassword === confirmPassword && newPassword !== '') setMatch('success');
        if (newPassword !== confirmPassword && confirmPassword!== '') setMatch('failure');
        if (confirmPassword === '') setMatch('gray');
    },[newPassword, confirmPassword])


    // if the user is authenticated, display version with form and submit button
    if (userId !== undefined) {

    return (
        <div className=''>
            <form id="eventDetails" onSubmit={handleClick} className="p-4 pr-8">
                <div className="grid grid-cols-2 gap-0">
                <div className="w-1/3">
                <Label className="w-fit">{required.eventName}</Label>
                <TextInput type="text" name="eventName" color={validated.eventName} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Event Name"></TextInput>
                <br></br>
                <Label className="w-fit">{required.address}</Label>
                <TextInput type="text" name="address" color={validated.address} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Street Address"></TextInput>
                <br></br>
                <Label className="w-fit">{required.city}</Label>
                <TextInput type="text" name="city" color={validated.city} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="City"></TextInput>
                <br></br>
                <Label className="w-fit">{required.state}</Label>
                <TextInput type="text" name="state" color={validated.state} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="State (TN, CA, FL)"></TextInput>
                <br></br>
                <Label className="w-fit">{required.zip}</Label>
                <TextInput type="text" name="zip" color={validated.zip} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Zipcode"></TextInput>
                <br></br>
                <Label className="w-fit">{required.date}</Label>
                <TextInput type="text" name="date" color={validated.date} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Date (03/17/2024)"></TextInput>
                <br></br>
                <Label className="w-fit">{required.startTime}</Label>
                <TextInput type="text" name="startTime" color={validated.startTime} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Start Time (19:30 EST)"></TextInput>
                <br></br>
                <Label className="w-fit">{required.endTime}</Label>
                <TextInput type="text" name="endTime" color={validated.endTime} className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="End Time (23:30 EST)"></TextInput>
                <br></br>
                <TextInput type="text" name="capacity" color="" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md" placeholder="Capacity"></TextInput>
                <br></br>
                <br></br>
                <button type="submit" className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 shadow-lg p-2 font-bold">Create Event and Send Invites</button>
                <br></br>
                <br></br>
                <button type="button" onClick={cancelClick} className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 shadow-lg p-2 font-bold">Cancel</button>
                </div>
                <div className="w-2/3">
                <textarea name="description" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-64 rounded-md" placeholder="Event Description ..."></textarea>
                <br></br>
                <br></br>
                <textarea name="emails" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg w-96 pt-1 pb-1 h-60 rounded-md" placeholder="Invite friends (bff@test.com, friend@email.com)"></textarea>
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
                <label>Event name:</label>
                <h3 type="text" name='eventName' className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">Eclipse Party 2024</h3>
                <br></br>
                <label>Hosted by:</label>
                <h3 type="text" name="address" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">John Doe</h3>
                <br></br>
                <label>Date:</label>
                <h3 type="text" name="city" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-fit w-80 rounded-md">04/08/2024</h3>
                <br></br>
                <label>Time:</label>
                <h3 type="text" name="state" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-10 w-80 rounded-md">2:00pm - 10:00pm EDT</h3>
                <br></br>
                <label>Location:</label>
                <h3 type="text" name="zip" className="focus:ring-0 focus:border-sky-600 border-0 border-gray-500 shadow-lg h-fit w-80 rounded-md">123 Sundown Street<br></br>Indianapolis, IN<br></br>55555</h3>
                <br></br>
                <button onClick={() => setOpenModal(true)} className="text-black border border-black bg-pink-200 hover:bg-pink-500 hover:text-white rounded-md w-80 shadow-lg p-2 font-bold">Login or Sign Up to Create New Event</button>
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
                    <label className='text-red-400'>{emailValidLabel}</label>
                    <TextInput
                        id="email"
                        placeholder="name@email.com"
                        onChange={(event) => setEmail(event.target.value)}
                        shadow
                        color={emailValid}
                        required
                    />
                    </div>
                    <div>
                    <label className='text-red-400'>{passwordValidLabel}</label>
                    <TextInput
                        id="password"
                        placeholder="password" 
                        type="password"
                        onChange={(event) => setPassword(event.target.value)} 
                        color={passwordValid}
                        shadow
                        required />
                    </div>
                    <div className="w-full">
                    <Button onClick={() => {
                        handleLogin();
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
                        id="username"
                        placeholder="John Doe"
                        onChange={(event) => setNewUsername(event.target.value)}
                        color={newUsernameValid}
                        shadow
                        required
                    />
                    </div>
                    <div>
                    <label className='text-red-700'>{emailValidLabel}</label>
                    <TextInput
                        id="email"
                        placeholder="name@email.com"
                        onChange={(event) => setNewEmail(event.target.value)}
                        color={newEmailValid}
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
                        }} 
                        color={newPasswordValid}
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