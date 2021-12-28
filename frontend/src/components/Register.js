import React, {useState, useRef} from 'react'
import {createTheme, ThemeProvider, TextField, Paper, Box, AppBar, Toolbar, Typography, Button} from '@mui/material'
import { adduser } from '../config/NodeServices';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


//Custom Themes
    const formTheme = createTheme({
        palette:{
            mode:'dark',
        }
    })


//RegEx for validation
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForName = RegExp('^[a-zA-Z]{3,15}$')
const RegForPassword = RegExp('^[a-zA-Z0-9@*!&%$]{8,15}$')


function Register() {
    // state variables
    const [state,setState] = useState({fname:'',lname:'',email:'',password:''})
    const [error,setError] = useState({fname:'',lname:'',email:'',password:'', cpassword:''})

    //useRef variables
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const cpasswordRef = useRef(null)

    //handler to perform validation operation
    const handler = e =>{
        let name = e.target.name
        switch(name){
            case 'fname':
                setError({...error,fname:RegForName.test(fnameRef.current.value)?'':'Error'})
                setState({...state,fname:fnameRef.current.value})
                break

            case 'lname':
                setError({...error,lname:RegForName.test(lnameRef.current.value)?'':'Error'})
                setState({...state,lname:lnameRef.current.value})
                break

            case 'email':
                setError({...error,email:RegForEmail.test(emailRef.current.value)?'':'Error'})
                setState({...state,email:emailRef.current.value})
                break

            case 'password':
                setError({...error,password:RegForPassword.test(passwordRef.current.value)?'':'Error'})
                setState({...state,password:passwordRef.current.value})
                break

            case 'cpassword':
                setError({...error,cpassword:cpasswordRef.current.value===state.password?'':'Error'})
                break

            default:
        }
    }

    //form submit function to store data to database
    const formSubmit = e => {
        e.preventDefault()
        if(state.fname!=='' && state.lname!=='' && state.email!=='' && state.password!==''){
            if(error.fname==='' && error.lname==='' && error.email==='' && error.password==='' && error.cpassword==='' ){
                adduser(state).then(res =>{
                    if(res.data.err===0) alert(res.data.msg)
                    else alert(res.data.msg)
                    window.location.replace('/')
                })
            }else alert("Validation Error!")
        }else alert("Input Fields Empty Error!")
    }

    return (
        <div className="index-background">
            <ThemeProvider theme={formTheme}>
                <Box sx={{flexGrow:1}}>
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant='h4'>React Social App</Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            
                <Paper color={'secondary'} className='index-form' sx={{width:1/4, mx:'auto'}}>
                    <Typography textAlign='center' variant="h4"><AppRegistrationIcon sx={{fontSize:70}} /></Typography>
                    <form onSubmit={e => formSubmit(e)}>
                        <TextField fullWidth sx={{my:1}} type="text" label="First Name" variant="standard" name="fname" inputRef={fnameRef} onChange={e => handler(e)} />
                        <TextField fullWidth sx={{my:1}} type="text" label="Last Name" variant="standard" name="lname" inputRef={lnameRef} onChange={e => handler(e)} />
                        <TextField fullWidth sx={{my:1}} type="text" label="Email" variant="standard" name="email" inputRef={emailRef} onChange={e => handler(e)} />
                        <TextField fullWidth sx={{my:1}} type="text" label="Password" variant="standard" name="password" inputRef={passwordRef} onChange={e => handler(e)} />
                        <TextField fullWidth sx={{my:1}} type="text" label="Confirm Password" variant="standard" name="cpassword" inputRef={cpasswordRef} onChange={e => handler(e)} />
                        <Button type="submit" sx={{float:'right',mt:3}} variant="contained">Register</Button>
                        <Button onClick={()=> window.location.replace('/')} sx={{mt:3}} variant="text">Already a User? Sign In</Button>
                    </form>
                </Paper>
            </ThemeProvider>
            

        </div>
    )
}

export default Register
