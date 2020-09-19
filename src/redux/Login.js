import * as ActionTypes from './ActionType'
import cookie from 'react-cookies'
var initState={
    login:cookie.load('user')?true:false,
    username:cookie.load('user'),
    token:cookie.load('token'),
    loading:false,
    errmsg:null
}
export const Login=(state=initState,action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,
                ...action.payload,
                login:cookie.load('user')?true:false,
                username:cookie.load('user'),
                token:cookie.load('token')
            })
        default:
            return state
    }
}