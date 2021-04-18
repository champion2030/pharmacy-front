import {GET_POTENTIAL_DATA_TO_DELETE_BY_MEDICINE, SET_ALL_MEDICINE, SET_CURRENT_PAGE_MEDICINE, SET_IS_FETCHING, SET_MEDICINE} from "../actions/types";

const defaultState = {
    medicines: [],
    allMedicines: [],
    totalCount: 0,
    currentPageMedicine: 1,
    isFetching: true,
    potentialDataToDeleteByMedicine: {
        deliveries: 0
    }
}

export default function medicineReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MEDICINE:
            return {
                ...state,
                medicines: action.payload.medicines,
                totalCount: action.payload.totalCount,
                isFetching: false
            }
        case SET_ALL_MEDICINE:
            return {
                ...state,
                allMedicines: action.payload,
                isFetching: false
            }
        case SET_CURRENT_PAGE_MEDICINE:
            return {
                ...state,
                currentPageMedicine: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_MEDICINE:
            return {
                ...state,
                potentialDataToDeleteByMedicine: action.payload
            }
        default:
            return state
    }
}

export const setMedicine = (medicines) => ({type: SET_MEDICINE, payload: medicines})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPageMedicine = (page) => ({type: SET_CURRENT_PAGE_MEDICINE, payload: page})
export const setAllMedicine = (allMedicines) => ({type: SET_ALL_MEDICINE, payload: allMedicines})
export const setPotentialDataToDeleteByMedicine = (potentialDataToDeleteByMedicine) => ({type: GET_POTENTIAL_DATA_TO_DELETE_BY_MEDICINE, payload: potentialDataToDeleteByMedicine})

