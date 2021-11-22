import {combineReducers,createStore} from "redux";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
    usersReducer
})

export default function configureStore(){
    return createStore(reducers)
}