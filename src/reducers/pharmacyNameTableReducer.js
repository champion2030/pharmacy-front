import {
    GET_POTENTIAL_DATA_TO_DELETE_BY_PHARMACY_NAME,
    SET_CURRENT_PHARMACY_NAME,
    SET_IS_FETCHING,
    SET_NAMES,
    UPDATE_INPUT_PHARMACY_NAME
} from "../actions/types";

const defaultState = {
    names: [],
    isFetching: true,
    name: "",
    potentialDataToDeleteByPharmacyName: {
        pharmacy: 0,
        employee: 0,
        deliveries: 0
    }
}

export default function pharmacyNameReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_NAMES:
            return {
                ...state,
                names: action.payload,
                isFetching: false
            }
        case SET_CURRENT_PHARMACY_NAME:
            return {
                ...state,
                name: action.payload
            }
        case UPDATE_INPUT_PHARMACY_NAME:
            return {
                ...state,
                name: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_PHARMACY_NAME:
            return {
                ...state,
                potentialDataToDeleteByPharmacyName: action.payload
            }
        default:
            return state
    }
}

export const setNames = (names) => ({type: SET_NAMES, payload: names})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPharmacyName = (name) => ({type: SET_CURRENT_PHARMACY_NAME, payload: name})
export const updateInputPharmacyName = (input) => ({type: UPDATE_INPUT_PHARMACY_NAME, payload: input})
export const setPotentialDataToDeleteByPharmacyName = (potentialDataToDeleteByPharmacyName) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE_BY_PHARMACY_NAME,
    payload: potentialDataToDeleteByPharmacyName
})