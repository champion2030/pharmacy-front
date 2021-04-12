import {SET_CURRENT_PAGE_DELIVERS, SET_DELIVERIES, SET_IS_FETCHING} from "../actions/types";

const defaultState = {
    deliveries: [],
    totalCount: 0,
    currentPageDelivers: 1,
    isFetching: true
}

export default function deliveriesReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_DELIVERIES:
            return {
                ...state,
                deliveries: action.payload.deliveries,
                totalCount: action.payload.totalCount,
                isFetching: false
            }
        case SET_CURRENT_PAGE_DELIVERS:
            return {
                ...state,
                currentPageDelivers: action.payload
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

export const setDeliveries = (deliveries) => ({type: SET_DELIVERIES, payload: deliveries})
export const setIsFetching = (bool) => ({type: SET_IS_FETCHING, payload: bool})
export const setCurrentPageDelivers = (page) => ({type: SET_CURRENT_PAGE_DELIVERS, payload: page})