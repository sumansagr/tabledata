import React, { useState } from "react"
import Register from "./Register"

import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import { Link } from "react-router-dom"

function Login(props) {
    const [userDetails, setuserDetails] = useState({
        email: '',
        password: ''
    })
    const [isEmailValid, setisEmailValid] = useState(true)
    const [emailError, setemailError] = useState('')

    const [isPasswordValid, setisPasswordValid] = useState(true)
    const [passwordError, setpasswordError] = useState('')

    const[type, setType]=useState('type')
    const[icon,setIcon]=useState(eyeOff);

    const login = (event) => {

        event.preventDefault()
   

        const isEmailValid = validateEmail(userDetails.email)
        const isPasswordValid = validatePassword(userDetails.password)

        

        if (isEmailValid && isPasswordValid) {
            // Programatically navigate
            console.log('props', props);
            props.history.push('/home')
        } else 
        {
            console.error('not valid');
        }
    }
    

    
    const mailexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,12})$/;
    const validateEmail = (email) => {
        if (mailexp.test(email)) {
            setisEmailValid(true)
            setemailError('')
            return true
        } else {
            setisEmailValid(false)
            setemailError('Please enter valid email')
            return false
        }
    }

    const passwordExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    const validatePassword = (password) => {
        if (passwordExp.test(password)) {
            setisPasswordValid(true)
            setpasswordError('')
            return true
        } else {
            setisPasswordValid(false)
            setpasswordError('minimum of 1 lower case letter ,1 upper case letter ,1 numeric character')
            return false
        }
    }

    const handleToggle = ()=> {
        if(type==='password'){
            setIcon(eye)
            setType('text')
        }
        else{
            setIcon(eyeOff)
            setType('password')
        }
    }
    
    const handleChange = (event) => {
        console.log(event.target.name);
        const userDetailsCopy = { ...userDetails }
        userDetailsCopy[event.target.name] =
            event.target.value
        setuserDetails(userDetailsCopy)
    }

    return (
       <div className="row login-form-container">
       <div className="col-6 login-form-container-1">
       <img src="https://image.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"></img>
       </div>   

       <div className="col-5 login-form-container-2">
       <div className="login-form-style">
       <h1>WELCOME BACK</h1>
            <form onSubmit={login} >
                <div>
                    <input type="email" name="email" placeholder="example@gmail.com" onChange={(event) => { handleChange(event)}} value={userDetails.email} /> <br></br>
                    {!isEmailValid ? <span style={{color:'red', fontSize:'12px'}}>{emailError}</span> : null}
                </div>
               
                <div>
                    <input type={type} name="password" placeholder="Enter password" onChange={(event) => { handleChange(event) }} autoComplete="off" value={userDetails.password} style={{marginLeft:20}} /> 
                    <span  className="icon" onClick={handleToggle}><Icon icon={icon}  size={17}/></span> <br></br>
                     {!isPasswordValid ? <span style={{color:'red', fontSize:'12px' }}>{passwordError} </span> : null}
                    
                </div>
               
                <div>
        <input type="submit" value="Login" />
                </div>
            </form>
            
            <Link to="/Register"><input type="submit" value="Create Account" /></Link> 
             
        </div>

       </div>
       </div>
    )
}

export default Login
