import {
    SET_CURRENT_DELIVER,
    SET_CURRENT_PAGE_DELIVERS,
    SET_DELIVERIES,
    SET_DELIVERIES_FOR_CURRENT_PHARMACY,
    SET_IS_FETCHING_DELIVERIES
} from "../actions/types";

const defaultState = {
    deliveries: [],
    deliversForCurrentPharmacy: [],
    totalCount: 0,
    currentPageDelivers: 1,
    isFetchingDeliveries: true,
    currentDeliver: {}
}

export default function deliveriesReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_DELIVERIES:
            return {
                ...state,
                deliveries: action.payload.deliveries,
                totalCount: action.payload.totalCount,
                isFetchingDeliveries: false
            }
        case SET_DELIVERIES_FOR_CURRENT_PHARMACY:
            return {
                ...state,
                deliversForCurrentPharmacy: action.payload,
                isFetchingDeliveries: false
            }
        case SET_CURRENT_PAGE_DELIVERS:
            return {
                ...state,
                currentPageDelivers: action.payload
            }
        case SET_IS_FETCHING_DELIVERIES:
            return {
                ...state,
                isFetchingDeliveries: action.payload
            }
        case SET_CURRENT_DELIVER:
            return {
                ...state,
                currentDeliver: action.payload,
                isFetchingDeliveries: false
            }
        default:
            return state
    }
}

export const setDeliveries = (deliveries) => ({type: SET_DELIVERIES, payload: deliveries})
export const setIsFetchingDeliveries = (bool) => ({type: SET_IS_FETCHING_DELIVERIES, payload: bool})
export const setCurrentPageDelivers = (page) => ({type: SET_CURRENT_PAGE_DELIVERS, payload: page})
export const setDeliversForCurrentPharmacy = (deliversForCurrentPharmacy) => ({type: SET_DELIVERIES_FOR_CURRENT_PHARMACY, payload: deliversForCurrentPharmacy})
export const setCurrentDeliver = (currentDeliver) => ({type: SET_CURRENT_DELIVER, payload: currentDeliver})