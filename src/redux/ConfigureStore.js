import {} from 'react-redux'
import { createStore } from 'redux'
import { initialState,Reducer } from './reducers'

export const ConfigStore=()=>{
    const store=createStore(Reducer,initialState)
    return store;
}