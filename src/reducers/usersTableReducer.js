import {SET_ALL_USERS, SET_CURRENT_PAGE, SET_IS_FETCHING, SET_USERS} from "../actions/types";

const defaultState = {
    users: [],
    allUsers: [],
    totalCount: 0,
    currentPage: 1,
    isFetching: true
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload.users,
                totalCount: action.payload.totalCount,
                isFetching: false
            }
        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, payload: users})
export const setAllUsers = (allUsers) => ({type: SET_ALL_USERS, payload: allUsers})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page})
