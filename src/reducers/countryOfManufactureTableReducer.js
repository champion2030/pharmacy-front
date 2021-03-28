import {SET_COUNTRIES, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    countries: [],
    isFetching: true
}

export default function countryOfManufactureReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                isFetching: false
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

export const setCountries = (countries) => ({type: SET_COUNTRIES, payload: countries})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
