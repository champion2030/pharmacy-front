import {
    SET_COUNTRIES,
    SET_CURRENT_COUNTRY,
    SET_IS_FETCHING,
    UPDATE_INPUT_COUNTRY
} from "../actions/types";

const defaultState = {
    countries: [],
    isFetching: true,
    country: ""
}

export default function countryOfManufactureReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                isFetching: false
            }
        case SET_CURRENT_COUNTRY:
            return {
                ...state,
                country: action.payload
            }
        case UPDATE_INPUT_COUNTRY:
            return {
                ...state,
                country: action.payload
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
export const setCurrentCountry = (country) => ({type: SET_CURRENT_COUNTRY, payload: country})
export const updateInputCountry = (input) => ({type: UPDATE_INPUT_COUNTRY, payload: input})
