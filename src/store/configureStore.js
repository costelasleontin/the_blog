import {createStore, combineReducers} from 'redux';
import counterReducer from '../reducers/counterReducer';
import filterReducer from '../reducers/filterReducer';

export default ()=>{
    const store = createStore(combineReducers(
        {
            counter:counterReducer,
            filter:filterReducer
        }
    ));
    return store;
};