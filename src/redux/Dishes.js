//This file contains seprate reducer for dishes
//reducer is a function which takes action and state and return a new modified state
import * as ActionType from './ActionType'
export const Dishes=(state={
        isLoading:true,
        dishes:[],
        errMsg:null
    },action)=>{
    switch(action.type){
        case ActionType.ADD_DISHES:
            return {isLoading:false,dishes:action.payload,errMsg:null}
        case ActionType.DISHES_FAILED:
            return {...state,isLoading:false,errMsg:action.payload}
        case ActionType.DISHES_LOADING:
            return {...state,isLoading:true,dishes:[],errMsg:null}
        case ActionType.REFRESH_DISH:
            var dish=state.dishes.map((dish)=>{
                if (dish.id===action.payload.id)
                    return action.payload
                else
                    return dish
            })
            // console.log()
            return{...state,dishes:dish}
            // return state
        default:
            return state
    }
}