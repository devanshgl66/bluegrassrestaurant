//This file contains seperate reducers for comments
import * as ActionType from './ActionType'

export const Comments=(state={ errMess: null, comments:[]},action)=>{
    switch(action.type){
        case ActionType.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        
            case ActionType.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        
            case ActionType.ADD_COMMENT:
                var comment = action.payload;
                return { ...state, comments: state.comments.concat(comment)};
        default:
            return state
    }
}