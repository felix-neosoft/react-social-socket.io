import axios from 'axios'

//Server URL
const MAIN_URL = "http://localhost:4000/api"

export function adduser(data){
    return axios.post(`${MAIN_URL}/user`,data)
}

export function loginuser(data){
    return axios.get(`${MAIN_URL}/user?email=${data.email}&password=${data.password}`)
}

export function getpost(){
    return axios.get(`${MAIN_URL}/post`)
}