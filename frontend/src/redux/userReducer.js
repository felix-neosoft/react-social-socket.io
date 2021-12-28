const USER_LOGIN = 'USER_LOGIN'

export const userLogin = (token) =>{
    return{
        type: USER_LOGIN,
        payload : token
    }
}


const initialValue = { status:'NOT_LOGGED', token : '' }

const userReducer = (state = initialValue,action) =>{
    switch(action.type){
        case USER_LOGIN: return {
            ...state,
            status: 'LOGGED_IN',
            token: action.payload
        }

        default: return state
    }
}

export default userReducer