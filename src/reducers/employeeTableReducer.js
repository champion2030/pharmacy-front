import {
    GET_POTENTIAL_DATA_TO_DELETE_BY_EMPLOYEE,
    SET_ALL_EMPLOYEES,
    SET_CURRENT_PAGE_EMPLOYEE,
    SET_EMPLOYEES,
    SET_IS_FETCHING
} from "../actions/types";

const defaultState = {
    employees: [],
    allEmployees: [],
    totalCount: 0,
    currentPageEmployee: 1,
    isFetching: true,
    potentialDataToDeleteByEmployee: {
        deliveries: 0
    }
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
        case SET_CURRENT_PAGE_EMPLOYEE:
            return {
                ...state,
                currentPageEmployee: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_EMPLOYEE:
            return {
                ...state,
                potentialDataToDeleteByEmployee: action.payload
            }
        default:
            return state
    }
}

export const setEmployees = (employees) => ({type: SET_EMPLOYEES, payload: employees})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPageEmployee = (page) => ({type: SET_CURRENT_PAGE_EMPLOYEE, payload: page})
export const setAllEmployees = (allEmployees) => ({type: SET_ALL_EMPLOYEES, payload: allEmployees})
export const setPotentialDataToDeleteByEmployee = (potentialDataToDeleteByEmployee) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE_BY_EMPLOYEE,
    payload: potentialDataToDeleteByEmployee
})
