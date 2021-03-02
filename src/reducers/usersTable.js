import {SET_USERS} from "../actions/types";

const defaultState = {
    users: [],
    isFetching : true
}

export default function userReducer(state = defaultState, action){
    switch (action.type){
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, payload: users})