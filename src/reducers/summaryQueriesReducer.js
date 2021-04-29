import {
    SET_CURRENT_PAGE_QUERY_WITH_DATA_CONDITIONS, SET_IS_FETCHING_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    SET_IS_FETCHING_QUERY_WITH_DATA_CONDITIONS, SET_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    SET_QUERY_WITH_DATA_CONDITIONS
} from "../actions/types";

const defaultState = {
    queryWithDataCondition: [],
    currentPageQueryWithDataCondition: 1,
    totalCountQueryWithDataCondition: 0,
    isFetchingQueryWithDataCondition: true,

    queryWithConditionForGroups: [],
    isFetchingQueryWithConditionForGroups: true
}

export default function summaryQueries(state = defaultState, action) {
    switch (action.type) {
        case SET_QUERY_WITH_DATA_CONDITIONS:
            return {
                ...state,
                queryWithDataCondition: action.payload.requestResult,
                totalCountQueryWithDataCondition: action.payload.totalCount,
                isFetchingQueryWithDataCondition: false
            }
        case SET_CURRENT_PAGE_QUERY_WITH_DATA_CONDITIONS:
            return {
                ...state,
                currentPageQueryWithDataCondition: action.payload
            }
        case SET_IS_FETCHING_QUERY_WITH_DATA_CONDITIONS:
            return {
                ...state,
                isFetchingQueryWithDataCondition: action.payload
            }
        case SET_QUERY_WITH_CONDITIONS_FOR_GROUPS:
            return {
                ...state,
                queryWithConditionForGroups: action.payload,
                isFetchingQueryWithConditionForGroups: false
            }
        case SET_IS_FETCHING_QUERY_WITH_CONDITIONS_FOR_GROUPS:
            return {
                ...state,
                isFetchingQueryWithConditionForGroups: action.payload
            }
        default:
            return state
    }
}

export const setQueryWithDataCondition = (queryWithDataCondition) => ({
    type: SET_QUERY_WITH_DATA_CONDITIONS,
    payload: queryWithDataCondition
})

export const setCurrentPageQueryWithDataCondition = (currentPageQueryWithDataCondition) => ({
    type: SET_CURRENT_PAGE_QUERY_WITH_DATA_CONDITIONS,
    payload: currentPageQueryWithDataCondition
})

export const setIsFetchingQueryWithDataCondition = (bool) => ({
    type: SET_IS_FETCHING_QUERY_WITH_DATA_CONDITIONS,
    payload: bool
})

export const setQueryWithConditionForGroups = (queryWithConditionForGroups) => ({
    type: SET_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    payload: queryWithConditionForGroups
})

export const setIsFetchingQueryWithConditionForGroups = (bool) => ({
    type: SET_IS_FETCHING_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    payload: bool
})