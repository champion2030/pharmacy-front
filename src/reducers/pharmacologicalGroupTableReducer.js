import {
    SET_CURRENT_PHARMACOLOGICAL_GROUP,
    SET_GROUPS,
    SET_IS_FETCHING,
    UPDATE_INPUT_PHARMACOLOGICAL_GROUP
} from "../actions/types";

const defaultState = {
    groups: [],
    isFetching: true,
    pharmacological_group: ""
}

export default function pharmacologicalGroupReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_GROUPS:
            return {
                ...state,
                groups: action.payload,
                isFetching: false
            }
        case SET_CURRENT_PHARMACOLOGICAL_GROUP:
            return {
                ...state,
                pharmacological_group: action.payload
            }
        case UPDATE_INPUT_PHARMACOLOGICAL_GROUP:
            return {
                ...state,
                pharmacological_group: action.payload
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

export const setGroups = (groups) => ({type: SET_GROUPS, payload: groups})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPharmacologicalGroup = (pharmacological_group) => ({type: SET_CURRENT_PHARMACOLOGICAL_GROUP, payload: pharmacological_group})
export const updateInputPharmacologicalGroup = (input) => ({type: UPDATE_INPUT_PHARMACOLOGICAL_GROUP, payload: input})
