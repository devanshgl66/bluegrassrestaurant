import * as ActionTypes from './ActionType'
import cookie from 'react-cookies'
export const Login=(state={login:cookie.load('login')||'false',available:false,username:cookie.load('user')},action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,login:cookie.load('login')||'false',username:cookie.load('user')})
        case ActionTypes.AVAILABLEUSERNAME:
            return({...state,available:action.payload})
        default:
            return state
    }
}