import React, {useState, useRef, useEffect} from 'react'
import { loginuser } from '../config/NodeServices';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {userLogin} from '../redux/userReducer'
import {createTheme, ThemeProvider, TextField, Paper, Box, AppBar, Toolbar, Typography, Button} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';


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

function Login() {

    //dispatch function for redux
    const dispatch = useDispatch()

    //navigate throughout the components
    const navigate = useNavigate()

    //redux variables
    const status = useSelector(state => state.user.status)


     // state variables
     const [state,setState] = useState({email:'',password:''})
     const [error,setError] = useState({email:'',password:''})
 
     //useRef variables
     const emailRef = useRef(null)
     const passwordRef = useRef(null)

     //check status of logging
     useEffect(()=>{
         if(status==='LOGGED_IN'){
             navigate('/dashboard')
         }
     }) 
 
     //handler to perform validation operation
     const handler = e =>{
         let name = e.target.name
         switch(name){
             case 'email':
                 setError({...error,email:RegForEmail.test(emailRef.current.value)?'':'Error'})
                 setState({...state,email:emailRef.current.value})
                 break
 
             case 'password':
                 setError({...error,password:RegForPassword.test(passwordRef.current.value)?'':'Error'})
                 setState({...state,password:passwordRef.current.value})
                 break
 
             default:
         }
     }
 
     //form submit function to store data to database
     const formSubmit = e => {
         e.preventDefault()
         if(state.email!=='' && state.password!==''){
             if(error.email==='' && error.password===''){
                 loginuser(state).then(res => {
                     if(res.data.err===0){
                        dispatch(userLogin(res.data.token))
                        alert(res.data.msg)
                        navigate('/dashboard')
                     }else alert(res.data.msg)
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
                    <Typography textAlign='center' variant="h6"><LoginIcon sx={{fontSize:70}}/></Typography>
                    <form onSubmit={e => formSubmit(e)}>
                        <TextField fullWidth sx={{my:1}} type="text" label="Email" variant="standard" name="email" inputRef={emailRef} onChange={e => handler(e)} />
                        <TextField fullWidth sx={{my:1}} type="text" label="Password" variant="standard" name="password" inputRef={passwordRef} onChange={e => handler(e)} />
                        <Button type="submit" sx={{float:'right',mt:3}} variant="contained">Login</Button>
                        <Button onClick={()=> window.location.replace('/register')} sx={{mt:3}} variant="text">Not a User? Sign Up</Button>
                    </form>
                </Paper>
            </ThemeProvider>
            

        </div>
    )
}

export default Login
