import {createStore, combineReducers} from 'redux';
import counterReducer from '../reducers/counterReducer';
import filterReducer from '../reducers/filterReducer';
import postsReducer from '../reducers/postsReducer';
import usersReducer from '../reducers/usersReducer';
import loginReducer from '../reducers/loginReducer';

export default ()=>{
    const store = createStore(combineReducers(
        {
            posts:postsReducer,
            counter:counterReducer,
            filter:filterReducer,
            users:usersReducer,
            login:loginReducer
        }
    ));
    return store;
};