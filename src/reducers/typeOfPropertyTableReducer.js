import {
    GET_POTENTIAL_DATA_TO_DELETE_BY_TYPE_OF_PROPERTY,
    SET_CURRENT_TYPE_PF_PROPERTY,
    SET_IS_FETCHING,
    SET_TYPES,
    UPDATE_INPUT_TYPE_OF_PROPERTY
} from "../actions/types";

const defaultState = {
    types: [],
    isFetching: true,
    name_of_property: "",
    potentialDataToDeleteByTypeOfProperty: {
        pharmacy: 0,
        employee: 0,
        deliveries: 0
    }
}

export default function typesOfPropertyReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TYPES:
            return {
                ...state,
                types: action.payload,
                isFetching: false
            }
        case SET_CURRENT_TYPE_PF_PROPERTY:
            return {
                ...state,
                name_of_property: action.payload
            }
        case UPDATE_INPUT_TYPE_OF_PROPERTY:
            return {
                ...state,
                name_of_property: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_TYPE_OF_PROPERTY:
            return {
                ...state,
                potentialDataToDeleteByTypeOfProperty: action.payload
            }
        default:
            return state
    }
}

export const setTypes = (types) => ({type: SET_TYPES, payload: types})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentTypeOfProperty = (name_of_property) => ({type: SET_CURRENT_TYPE_PF_PROPERTY, payload: name_of_property})
export const updateInputTypeOfProperty = (input) => ({type: UPDATE_INPUT_TYPE_OF_PROPERTY, payload: input})
export const setPotentialDataToDeleteByTypeOfProperty = (potentialDataToDeleteByTypeOfProperty) => ({
    type: GET_POTENTIAL_DATA_TO_DELETE_BY_TYPE_OF_PROPERTY,
    payload: potentialDataToDeleteByTypeOfProperty
})
