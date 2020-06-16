//This file contains action used in project
//action are js object which contain data that need to be changed.

//Every action must contain 'type' and 'payload' key.
import * as ActionTypes from './ActionType'
import { DISHES } from '../shared/dishes'

//addComments is a action.
export const addComments=(dishId,comments,author,rating)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:{
        dishId:dishId,
        comment:comments,
        author:author,
        rating:rating
    }
})
export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
})

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})
export const dishesFailed=(errMsg)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errMsg
})

//This is a redux thunk so it will return a function as action
//This action will call dish loading action and after 2 second will load add dishes
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true))

    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000);
}