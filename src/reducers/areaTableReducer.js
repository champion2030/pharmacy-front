import {GET_POTENTIAL_DATA_TO_DELETE_BY_AREA, SET_AREAS, SET_CURRENT_AREA, SET_IS_FETCHING, UPDATE_INPUT} from "../actions/types";

const defaultState = {
    areas: [],
    isFetching: true,
    name_of_area: "",
    potentialDataToDeleteByArea: {
        deliveries: 0,
        employee: 0,
        pharmacy: 0
    }
}

export default function areaReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_AREAS:
            return {
                ...state,
                areas: action.payload,
                isFetching: false
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_CURRENT_AREA:
            return {
                ...state,
                name_of_area: action.payload
            }
        case UPDATE_INPUT:
            return {
                ...state,
                name_of_area: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_AREA:
            return {
                ...state,
                potentialDataToDeleteByArea: action.payload
            }
        default:
            return state
    }
}

export const setAreas = (areas) => ({type: SET_AREAS, payload: areas})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentArea = (area) => ({type: SET_CURRENT_AREA, payload: area})
export const updateInput = (input) => ({type: UPDATE_INPUT, payload: input})
export const setPotentialDataToDeleteByArea = (potentialDataToDeleteByArea) => ({type: GET_POTENTIAL_DATA_TO_DELETE_BY_AREA, payload: potentialDataToDeleteByArea})



