//This file contains seprate reducer function for Leaders
import * as ActionTypes from './ActionType'


export const Leaders=(state={isLoading:true,leaders:[],errMsg:null},action)=>{
    switch(action.type){
        case ActionTypes.LEADER_LOADING:
            return {...state,isLoading:true,errMsg:null}
        case ActionTypes.ADD_LEADERS:
            return {...state,isLoading:false,errMsg:null,leaders:action.payload}
        case ActionTypes.LEADER_FAILED:
            return {...state,isLoading:false,errMsg:action.payload}
        default:
            return state
    }
}