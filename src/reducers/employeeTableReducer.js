import {SET_ALL_EMPLOYEES, SET_CURRENT_PAGE, SET_EMPLOYEES, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    employees: [],
    allEmployees: [],
    totalCount: 0,
    currentPage: 1,
    isFetching: true
}

export default function employeeReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.employees,
                totalCount: action.payload.totalCount,
                isFetching: false
            }
        case SET_ALL_EMPLOYEES:
            return {
                ...state,
                allEmployees: action.payload,
                isFetching: false
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

export const setEmployees = (employees) => ({type: SET_EMPLOYEES, payload: employees})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, payload: page})
export const setAllEmployees = (allEmployees) => ({type: SET_ALL_EMPLOYEES, payload: allEmployees})
