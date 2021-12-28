import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//reducers
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer
})

const store = createStore(rootReducer,composeWithDevTools())

export default store