import {} from 'react-redux'
import { createStore, combineReducers ,applyMiddleware} from 'redux'
import {Dishes} from './Dishes'
import {Leaders} from './Leaders'
import {Promotions} from './Promotions'
import {Comments} from './Comments'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
export const ConfigStore=()=>{
    const store=createStore(combineReducers({
        //Dishes,Leaders,Promotions,Comments are seperate reducers for each.
        dishes:Dishes,
        leaders:Leaders,
        promotions:Promotions,
        comments:Comments,
    }),applyMiddleware(thunk,logger))
    return store;
}