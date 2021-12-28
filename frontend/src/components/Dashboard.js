import React, {useState, useRef, useEffect} from 'react'
import { createTheme, ThemeProvider, Container, Typography, Paper, TextField, Button, Toolbar, AppBar, Box, Card, CardContent, Divider, Menu, MenuItem} from '@mui/material'
import io from 'socket.io-client'
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';



import { getpost } from '../config/NodeServices'


//Custom Themes
const formTheme = createTheme({
    palette:{
        mode:'dark',
    }
})

const socket = io('http://localhost:4000', {transports: ['websocket']});

function Dashboard() {
    //redux variables
    const token = useSelector(state => state.user.token) || ''

    // state variables
    const [state, setState] = useState({email:'', name:'', comment:''})
    const [post,setPost] = useState([])

    // useNavigate -> change components
    const navigate = useNavigate()


    //useRef Variables
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const commentRef = useRef(null)

    
    useEffect(()=>{
        if(token!==''){
            const decode = jwt_decode(token)
            setState({...state,email:decode.uid,name:decode.name})
        } else logout()

        getpost().then(res =>{
            setPost(res.data)
        })
    },[post])

    const commenthandler = (e) =>{
        setState({...state,comment:e.target.value})
    }

    //get post function <- socket.io
    socket.on('get_post',({data})=>{
        setPost(data)
    })

    const logout = () =>{
        window.location.replace('/')
    }

    // add post function -> socket.io
    const addPost = () =>{
        const title = titleRef.current.value
        const description = descriptionRef.current.value
        if(title!=='' && description!==''){
            const email = state.email
            const name = state.name
            const comments = []
            socket.emit('add_post',{email,name,title,description,comments})
            titleRef.current.value = ''
            descriptionRef.current.value = ''
        } else alert('Input Fields must not be blank')
    }

    const addComment = (id) =>{
        const name = state.name
        const comment = state.comment
        if(comment!==''){
            socket.emit('add_comment',{id,name,comment})
            setState({...state,comment:''})
        }else alert('Comment Field is empty')
    }

    //user menu bar functions
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={formTheme}>
        <div className='index-dashboard' style={{paddingBottom:'100px'}} >
            <Box sx={{flexGrow:1}}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography sx={{flexGrow:1}} variant='h4'>React Social App</Typography>
                        <Button onClick={handleClick}>Welcome {state.name}</Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
            <Paper sx={{width:1/2, padding:3, mx:'auto', mt:5}} elevation={20}>
                <Container>
                    <Typography textAlign="center" variant="h4">Add Post</Typography>
                    <TextField  fullWidth label="Title"  variant="standard" inputRef={titleRef} />
                    <TextField sx={{my:2}} fullWidth label="Description" multiline maxRows={4} variant="standard" inputRef={descriptionRef} />
                    <Button onClick={()=> addPost()} sx={{my:2, marginLeft:'90%'}} variant="contained">Add</Button>
                </Container>
            </Paper>

            
            <Paper sx={{width:1/2, padding:3, mx:'auto',mt:5}} elevation={20}>
                <Typography sx={{mb:3}} textAlign='center' variant='h4'>Posts</Typography>
                {post.map((item,index)=>(
                    <Card key={index} sx={{my:3}}>
                    <CardContent>
                        
                        <Typography sx={{my:3}} variant="h5"><span className='dash-icon'>{item.name}</span>{item.title}</Typography>
                        <Typography sx={{width:'90%', mx:'auto'}} variant="h6">{item.description}</Typography>
                    </CardContent>
                    <div className='wrapper'>
                        <Accordion>
                            <AccordionSummary sx={{}}>
                                <Typography>{item.comments.length} Comments &#10148;</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Divider />
                                {item.comments.map((comment,id)=>(
                                    <div key={id}><Typography sx={{my:1}}><span className='comment-icon' >{comment.name}</span>{comment.comment}</Typography>
                                    <Divider /></div>
                                ))}
                                    <TextField sx={{width:'80%',ml:3, mt:2}} type="text" label="comment" variant="standard" onChange={(e)=>commenthandler(e)} value={state.comment} />
                                    <Button onClick={()=>addComment(item.pid)} sx={{ml:2, mt:3}} variant="outlined">Add</Button>               
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </Card>
                ))}
            </Paper>
        </div>
        <div className='footer'>
            <h3>Copyright &copy; 2021 | Created By Felix Mathew</h3>
        </div>
        
        </ThemeProvider>
    )
}

export default Dashboard
