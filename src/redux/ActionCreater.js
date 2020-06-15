import * as ActionTypes from './ActionType'

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