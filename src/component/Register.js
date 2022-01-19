import React, { useState } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import TableData from "./TableData"

function Register(props) {

    const [userDetails, setuserDetails] = useState({
        fname:"",
        lname:"",
        email: '',
        password: '',
        cpassword:"",
        date:"",
        gender:""
    })

    const [isFnameValid,setisFnameValid] = useState("true")
    const [fnameError, setfnameError] = useState("")

    const [isLnameValid,setisLnameValid] = useState("true")
    const [lnameError, setlnameError] = useState("")
     
    const [isEmailValid, setisEmailValid] = useState(true)
    const [emailError, setemailError] = useState('')

    const [isPasswordValid, setisPasswordValid] = useState(true)
    const [passwordError, setpasswordError] = useState('')


    const [isCPasswordValid, setisCPasswordValid] = useState(true)
    const [cpasswordError, setcpasswordError] = useState('')

    const [isDateValid,setisDateValid] = useState("true")
    const [dateError, setdateError] = useState("")

    // const[isGenderValid,setisGenderValid]= useState(true)
    // const[genderError,setgenderError] = useState("")


    const[type, setType]=useState('type')
    const[icon,setIcon]=useState(eyeOff);

    const [tableData, setTableData] = useState([]);


    const register= (event)=> {
        event.preventDefault()
        console.log(userDetails);   

        const isFnameValid = validateFirstName(userDetails.fname)
        const isLnameValid = validateLastName(userDetails.lname)
        const isEmailValid = validateEmail(userDetails.email)
        const isPasswordValid = validatePassword(userDetails.password)
        const isCPasswordValid = validateConfirmPassword(userDetails.cpassword)
        const isDateValid = validateDate(userDetails.date)
        // const isGenderValid = validateGender(userDetails.gender)

        if (isFnameValid && isLnameValid && isEmailValid && isPasswordValid  && isCPasswordValid  &&isDateValid) {
            // Programatically navigate
            setTableData([
                ...tableData,
                { fname: userDetails.fname, lname: userDetails.lname, mail: userDetails.email ,date:userDetails.date },
              ]);

        } else 
        {
            console.error('not valid');
        }
        
    }


    

    //* Firstname
    const expr = /^[a-zA-Z_]{3,15}$/;

    const validateFirstName = (fname) => {
        if (fname && expr.test(fname)) {
            setisFnameValid(true)
            setfnameError('')
            return true
        } else {
            setisFnameValid(false)
            setfnameError('Please enter your first name.')
            return false
        }
    }

    
    //* LastName

    const validateLastName = (lname) => {
        if (lname && expr.test(lname) ) {
           setisLnameValid(true)
           setlnameError('')
            return true
        } else {
           setisLnameValid(false)
           setlnameError('Please enter your last name.')
            return false
        }
    }


     //* email

    const mailexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,12})$/;

        const validateEmail = (email) => {
            if (mailexp.test(email)) {
                setisEmailValid(true)
                setemailError('')
                return true
            } else {
                setisEmailValid(false)
                setemailError('Please enter an valid email address.')
                return false
            }
        }


    //* password
    const passwordExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        const validatePassword = (password) => {
            if (passwordExp.test(password) ) {
                setisPasswordValid(true)
                setpasswordError('')
                return true
            } else {
                setisPasswordValid(false)
                setpasswordError('minimum of 1 lower case letter ,1 upper case letter ,1 numeric character')
                return false
            }
        }


    //* cpassword

        const validateConfirmPassword = (cpassword,password) => {
            if ((cpassword===userDetails.password ) && cpassword !="") {
                setisCPasswordValid(true)
               setcpasswordError('')
                return true
            } else {
                setisCPasswordValid(false)
                setcpasswordError('password and confirm password must match')
                return false
            }
        }

     //* date

        const validateDate = (date) => {
            if (date) {
                setisDateValid(true)
                setdateError('')
                return true
            } else {
                setisDateValid(false)
                setdateError('please select your date of birth')
                return false
            }
        }

        //gender

        // const validateGender = (gender) => {
        //     if (gender ==="") {
        //         setisGenderValid(false)
        //         setgenderError('please select 1 option')
        //         return true
        //     } else {
        //         setisGenderValid(true)
        //         setgenderError('')
               
        //         return false
        //     }
        // }

        //handleToggle
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

        //handleChange

        const handleChange = (event) => {
            console.log(event.target.name);
            const userDetailsCopy = { ...userDetails }
            userDetailsCopy[event.target.name] =event.target.value
            setuserDetails(userDetailsCopy)
        }

    

    return (
       <div className="row registration">
          
           <div className="col-7 login-form-style  registration-form-container-1">
           <h1>Registration</h1>

     <form onSubmit={register}>
     <div className="form-row">
      <div>
     <input type="text" placeholder='Firstname' name="fname" onChange={(event) => { handleChange(event) }}  value={userDetails.fname}/> <br></br>
     {!isFnameValid ? <span style={{color:'red', fontSize:'12px',position:"relative",right:"30px"}}>{fnameError}</span> : null}
      </div>
        
      <div>
     <input type="text" placeholder='Lastname' name="lname"  onChange={(event)=>{handleChange(event)}} value={userDetails.lname}/><br></br>
     {!isLnameValid ? <span style={{color:'red', fontSize:'12px',position:"relative",right:"30px"}}>{lnameError}</span> : null}
      </div>

      
      <div>
     <input type={type} placeholder='New Password'  name="password"  onChange={(event)=>{handleChange(event)}} value={userDetails.password} autoComplete="off" />
     <span  className="reg-icon" onClick={handleToggle}><Icon icon={icon}  size={17}/></span> <br></br>
     {!isPasswordValid ?<span style={{color:'red', fontSize:'11px',position:"relative",right:"30px"}}>{passwordError}</span> : null}
      </div> 

      <div>
     <input type={type} placeholder='Confirm Password' name="cpassword" onChange={(event)=>{handleChange(event)}} value={userDetails.cpassword} style={{position:"relative",right:17}} autoComplete="off" />
     <span  className="reg-icon1" onClick={handleToggle}><Icon icon={icon}  size={17} /></span> <br></br>
     {!isCPasswordValid ? <span style={{color:'red', fontSize:'12px',position:"relative",right:"30px"}}>{cpasswordError}</span> : null}
      </div>

      <div>

     <input type="email" placeholder='Example@gmail.com' name="email" onChange={(event)=>{handleChange(event)}}  value={userDetails.email}/><br></br>
     {!isEmailValid ? <span style={{color:'red', fontSize:'12px',position:"relative",right:"30px"}}>{emailError}</span> : null}
     
      </div>

      <div>
     <input type="date" placeholder='Enter date' name="date" onChange={(event)=>{handleChange(event)}} value={userDetails.date} /><br></br>
     {!isDateValid ? <span style={{color:'red', fontSize:'12px',position:"relative",right:"30px"}}>{dateError}</span> : null}
      </div></div>

{/*      
      <div style={{position:"relative",right:"20px"}} >
      <label >Gender:</label>
      <input type="radio"  name="gender" value="Male" onClick={(event) => {handleChange(event)}} />Male    
      <input  type="radio" name="gender" value="Female"  onClick={(event) => {handleChange(event)}} />Female
       {!isGenderValid ? <span style={{color:'red', fontSize:'12px',position:'relative', top:"-2px",left:"20px"}}>{genderError}</span> : null}
      </div> */}
      
      <div>
     <input type="submit" />
      </div>
      <p style={{marginTop:"20px"}}>Already have account? </p> 
   <Link to="/Login" style={{position:"relative",right:"190px" , top:"20px",textDecoration:"none"}}>Login</Link>

</form>
        </div>
        <div className="col-3  registration-form-container-2">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4268415-3551762.png" />
           </div>

           <div style={{ marginTop: "180px" }}>
        {tableData.length > 0 ? <TableData data={tableData}  fname={userDetails.fname} lname={userDetails.lname} email={userDetails.email} date={userDetails.date}/> : ""}
      </div>

       </div>
     
        
    )
}

export default Register
