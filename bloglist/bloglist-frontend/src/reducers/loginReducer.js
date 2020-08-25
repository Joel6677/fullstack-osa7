import loginService from '../services/login'
import storage from '../utils/storage'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        case 'LOGGED_USER':
            return action.data
        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {

        
        let user = null


        user = await loginService.login({
            username, password
        })
        storage.saveUser(user)

        dispatch({
            type: 'LOGIN',
            data: user
        })

    }

   
}

export const logout = () => {
    
    return dispatch => {
        storage.logoutUser()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const loggedUser = (user) => {
    return dispatch => {
        dispatch({
            type: 'LOGGED_USER',
            data: user
        })
    }
}

export default reducer