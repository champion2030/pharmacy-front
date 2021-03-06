import {
    GET_POTENTIAL_DATA_TO_DELETE_BY_FIRM,
    SET_ALL_FIRMS, SET_CURRENT_FIRM,
    SET_CURRENT_PAGE_FIRM,
    SET_FIRMS,
    SET_IS_FETCHING_FIRM
} from "../actions/types";

const defaultState = {
    manufacturerFirms: [],
    allManufacturerFirms: [],
    totalCount: 0,
    currentPageFirm: 1,
    isFetchingFirm: true,
    potentialDataToDeleteByFirm: {
        medicine: 0,
        deliveries: 0
    },
    currentFirm: {}
}

export default function manufacturerFirmReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FIRMS:
            return {
                ...state,
                manufacturerFirms: action.payload.manufacturerFirms,
                totalCount: action.payload.totalCount,
                isFetchingFirm: false
            }
        case SET_ALL_FIRMS:
            return {
                ...state,
                allManufacturerFirms: action.payload,
            }
        case SET_CURRENT_PAGE_FIRM:
            return {
                ...state,
                currentPageFirm: action.payload
            }
        case SET_IS_FETCHING_FIRM:
            return {
                ...state,
                isFetchingFirm: action.payload
            }
        case GET_POTENTIAL_DATA_TO_DELETE_BY_FIRM:
            return {
                ...state,
                potentialDataToDeleteByFirm: action.payload
            }
        case SET_CURRENT_FIRM:
            return {
                ...state,
                currentFirm: action.payload,
                isFetchingFirm: false
            }
        default:
            return state
    }
}

export const setFirms = (manufacturerFirms) => ({type: SET_FIRMS, payload: manufacturerFirms})
export const setAllFirms = (allManufacturerFirms) => ({type: SET_ALL_FIRMS, payload: allManufacturerFirms})
export const setIsFetchingFirm = (bool) => ({type: SET_IS_FETCHING_FIRM, payload: bool})
export const setCurrentPageFirm = (page) => ({type: SET_CURRENT_PAGE_FIRM, payload: page})
export const setPotentialDataToDeleteByFirm = (potentialDataToDeleteByFirm) => ({type: GET_POTENTIAL_DATA_TO_DELETE_BY_FIRM, payload: potentialDataToDeleteByFirm})
export const setCurrentFirm = (currentFirm) => ({type: SET_CURRENT_FIRM, payload: currentFirm})
