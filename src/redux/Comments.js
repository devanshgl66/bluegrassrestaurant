//This file contains seperate reducers for comments
import {COMMENTS} from '../shared/comments'
import * as ActionType from './ActionType'

export const Comments=(state=COMMENTS,action)=>{
    switch(action.type){
        case ActionType.ADD_COMMENTS:
            var comments=action.payload
            comments.id=state.length
            comments.date=new Date().toISOString()
            console.log(comments)
            //it should return a new immutable state and should not change the given state in any way
            console.log(state.concat(comments))
            return state.concat(comments)
        default:
            return state
    }
}