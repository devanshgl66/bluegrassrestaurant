import * as ActionTypes from './ActionType'

export const Login=(state={login:false},action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,login:action.payload.login})
        default:
            return state
    }
}