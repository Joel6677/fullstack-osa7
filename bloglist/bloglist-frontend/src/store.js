import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    login: loginReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))