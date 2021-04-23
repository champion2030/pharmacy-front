import {
    GET_ALL_EMPLOYEE_FOR_CURRENT_PHARMACY,
    GET_POTENTIAL_DATA_TO_DELETE_BY_EMPLOYEE,
    SET_ALL_EMPLOYEES, SET_CURRENT_EMPLOYEE,
    SET_CURRENT_PAGE_EMPLOYEE,
    SET_EMPLOYEES,
    SET_IS_FETCHING_EMPLOYEE
} from "../actions/types";

const defaultState = {
    employees: [],
    allEmployees: [],
    allEmployeesForCurrentPharmacy: [],
    totalCount: 0,
    currentPageEmployee: 1,
    isFetchingEmployee: true,
    potentialDataToDeleteByEmployee: {
        deliveries: 0
    },
    currentEmployee: {}
}

export default function employeeReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.employees,
                totalCount: action.payload.totalCount,
                isFetchingEmployee: false
            }
        case SET_ALL_EMPLOYEES:
            return {
                ...state,
                allEmployees: action.payload,
            }
        case SET_CURRENT_PAGE_EMPLOYEE:
            return {
                ...state,
                currentPageEmployee: action.payload
            }
        case SET_IS_FETCHING_EMPLOYEE:
            return {
                ...state,
                isFetchingEmployee: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_EMPLOYEE:
            return {
                ...state,
                potentialDataToDeleteByEmployee: action.payload
            }
        case GET_ALL_EMPLOYEE_FOR_CURRENT_PHARMACY:
            return {
                ...state,
                allEmployeesForCurrentPharmacy: action.payload
            }
        case SET_CURRENT_EMPLOYEE:
            return {
                ...state,
                currentEmployee: action.payload,
                isFetchingEmployee: false
            }
        default:
            return state
    }
}

export const setEmployees = (employees) => ({type: SET_EMPLOYEES, payload: employees})
export const setIsFetchingEmployee = (bool) => ({type: SET_IS_FETCHING_EMPLOYEE, payload: bool})
export const setCurrentPageEmployee = (page) => ({type: SET_CURRENT_PAGE_EMPLOYEE, payload: page})
export const setAllEmployees = (allEmployees) => ({type: SET_ALL_EMPLOYEES, payload: allEmployees})
export const setPotentialDataToDeleteByEmployee = (potentialDataToDeleteByEmployee) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE_BY_EMPLOYEE,
    payload: potentialDataToDeleteByEmployee
})
export const setEmployeeForCurrentPharmacy = (employeesForCurrentPharmacy) => ({type: GET_ALL_EMPLOYEE_FOR_CURRENT_PHARMACY, payload: employeesForCurrentPharmacy})
export const setCurrentEmployee = (currentEmployee) => ({type: SET_CURRENT_EMPLOYEE, payload: currentEmployee})