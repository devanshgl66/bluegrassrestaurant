import * as ActionTypes from './ActionType'
import cookie from 'react-cookies'
export const Login=(state={login:cookie.load('login')||'false',available:false,username:cookie.load('user'),loading:false},action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,login:cookie.load('login'),username:cookie.load('user')})
        case ActionTypes.AVAILABLEUSERNAME:
            return({...state,...action.payload})
        default:
            return state
    }
}