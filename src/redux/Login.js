import * as ActionTypes from './ActionType'
import cookie from 'react-cookies'
const login=cookie.load('login')
export const Login=(state={login:login,available:false},action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,login:cookie.load('login')})
        case ActionTypes.AVAILABLEUSERNAME:
            return({...state,available:action.payload})
        default:
            return state
    }
}