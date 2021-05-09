import {
    SET_CURRENT_PAGE_FINAL_QUERY_WITH_DATA_AND_GROUPS,
    SET_CURRENT_PAGE_FINAL_QUERY_WITH_SUBQUERY,
    SET_CURRENT_PAGE_FINAL_REQUEST_WITHOUT_CONDITION,
    SET_CURRENT_PAGE_QUERY_WITH_DATA_CONDITIONS,
    SET_CURRENT_PAGE_QUERY_WITH_GROUP_CONDITIONS,
    SET_FINAL_QUERY_WITH_DATA_AND_GROUPS,
    SET_FINAL_QUERY_WITH_SUBQUERY,
    SET_FINAL_REQUEST_WITHOUT_CONDITION,
    SET_IS_FETCHING_FINAL_QUERY_WITH_DATA_AND_GROUPS, SET_IS_FETCHING_FINAL_QUERY_WITH_SUBQUERY,
    SET_IS_FETCHING_FINAL_REQUEST_WITHOUT_CONDITION,
    SET_IS_FETCHING_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    SET_IS_FETCHING_QUERY_WITH_DATA_CONDITIONS,
    SET_QUERY_ON_WRAP_UP_QUERY,
    SET_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    SET_QUERY_WITH_DATA_CONDITIONS
} from "../actions/types";

const defaultState = {
    queryWithDataCondition: [],
    currentPageQueryWithDataCondition: 1,
    totalCountQueryWithDataCondition: 0,
    isFetchingQueryWithDataCondition: true,

    queryWithConditionForGroups: [],
    currentPageFinalQueryWithGroup: 1,
    totalCountFinalQueryWithGroup: 0,
    isFetchingQueryWithConditionForGroups: true,

    finalQueryWithDataAndGroup: [],
    currentPageFinalQueryWithDataAndGroup: 1,
    totalCountFinalQueryWithDataAndGroup: 0,
    isFetchingFinalQueryWithDataAndGroup: true,

    finalRequestWithoutCondition: [],
    currentPageFinalRequestWithoutCondition: 1,
    totalCountFinalRequestWithoutCondition: 0,
    isFetchingFinalRequestWithoutCondition: true,

    queryOnWrapUpQuery: {
        id: 0,
        medicine_name: "",
        form_of_issue: "",
        pharmacological_group: "",
        firm_name: "",
        supplier_price: 0
    },

    finalQueryWithSubquery: [],
    currentPageFinalQueryWithSubquery: 1,
    totalCountFinalQueryWithSubquery: 0,
    isFetchingFinalQueryWithSubquery: true,
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
                queryWithConditionForGroups: action.payload.requestResult,
                totalCountFinalQueryWithGroup: action.payload.totalCount,
                isFetchingQueryWithConditionForGroups: false
            }
        case SET_CURRENT_PAGE_QUERY_WITH_GROUP_CONDITIONS:
            return {
                ...state,
                currentPageFinalQueryWithGroup: action.payload
            }
        case SET_IS_FETCHING_QUERY_WITH_CONDITIONS_FOR_GROUPS:
            return {
                ...state,
                isFetchingQueryWithConditionForGroups: action.payload
            }
        case SET_FINAL_QUERY_WITH_DATA_AND_GROUPS:
            return {
                ...state,
                finalQueryWithDataAndGroup: action.payload.requestResult,
                totalCountFinalQueryWithDataAndGroup: action.payload.totalCount,
                isFetchingFinalQueryWithDataAndGroup: false
            }
        case SET_CURRENT_PAGE_FINAL_QUERY_WITH_DATA_AND_GROUPS:
            return {
                ...state,
                currentPageFinalQueryWithDataAndGroup: action.payload
            }
        case SET_IS_FETCHING_FINAL_QUERY_WITH_DATA_AND_GROUPS:
            return {
                ...state,
                isFetchingFinalQueryWithDataAndGroup: action.payload
            }
        case SET_FINAL_REQUEST_WITHOUT_CONDITION:
            return {
                ...state,
                finalRequestWithoutCondition: action.payload.requestResult,
                totalCountFinalRequestWithoutCondition: action.payload.totalCount,
                isFetchingFinalRequestWithoutCondition: false
            }
        case SET_CURRENT_PAGE_FINAL_REQUEST_WITHOUT_CONDITION:
            return {
                ...state,
                currentPageFinalRequestWithoutCondition: action.payload
            }
        case SET_IS_FETCHING_FINAL_REQUEST_WITHOUT_CONDITION:
            return {
                ...state,
                isFetchingFinalRequestWithoutCondition: action.payload
            }
        case SET_QUERY_ON_WRAP_UP_QUERY:
            return {
                ...state,
                queryOnWrapUpQuery: action.payload
            }
        case SET_FINAL_QUERY_WITH_SUBQUERY:
            return {
                ...state,
                finalQueryWithSubquery: action.payload.requestResult,
                totalCountFinalQueryWithSubquery: action.payload.totalCount,
                isFetchingFinalQueryWithSubquery: false
            }
        case SET_CURRENT_PAGE_FINAL_QUERY_WITH_SUBQUERY:
            return {
                ...state,
                currentPageFinalQueryWithSubquery: action.payload
            }
        case SET_IS_FETCHING_FINAL_QUERY_WITH_SUBQUERY:
            return {
                ...state,
                isFetchingFinalQueryWithSubquery: action.payload
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

export const setCurrentPageFinalQueryWithGroup = (currentPageFinalQueryWithGroup) => ({
    type: SET_CURRENT_PAGE_QUERY_WITH_GROUP_CONDITIONS,
    payload: currentPageFinalQueryWithGroup
})

export const setIsFetchingQueryWithConditionForGroups = (bool) => ({
    type: SET_IS_FETCHING_QUERY_WITH_CONDITIONS_FOR_GROUPS,
    payload: bool
})

export const setFinalQueryWithDataAndGroup = (finalQueryWithDataAndGroup) => ({
    type: SET_FINAL_QUERY_WITH_DATA_AND_GROUPS,
    payload: finalQueryWithDataAndGroup
})

export const setCurrentPageFinalQueryWithDataAndGroup = (currentPageFinalQueryWithDataAndGroup) => ({
    type: SET_CURRENT_PAGE_FINAL_QUERY_WITH_DATA_AND_GROUPS,
    payload: currentPageFinalQueryWithDataAndGroup
})

export const setIsFetchingFinalQueryWithDataAndGroup = (bool) => ({
    type: SET_IS_FETCHING_FINAL_QUERY_WITH_DATA_AND_GROUPS,
    payload: bool
})

export const setFinalRequestWithoutCondition = (finalRequestWithoutCondition) => ({
    type: SET_FINAL_REQUEST_WITHOUT_CONDITION,
    payload: finalRequestWithoutCondition
})

export const setCurrentPageFinalRequestWithoutCondition = (currentPageFinalRequestWithoutCondition) => ({
    type: SET_CURRENT_PAGE_FINAL_REQUEST_WITHOUT_CONDITION,
    payload: currentPageFinalRequestWithoutCondition
})

export const setIsFetchingFinalRequestWithoutCondition = (bool) => ({
    type: SET_IS_FETCHING_FINAL_REQUEST_WITHOUT_CONDITION,
    payload: bool
})

export const setQueryOnWrapUpQuery = (queryOnWrapUpQuery) => ({
    type: SET_QUERY_ON_WRAP_UP_QUERY,
    payload: queryOnWrapUpQuery
})

export const setFinalQueryWithSubquery = (finalQueryWithSubquery) => ({
    type: SET_FINAL_QUERY_WITH_SUBQUERY,
    payload: finalQueryWithSubquery
})

export const setCurrentPageFinalQueryWithSubquery = (currentPageFinalQueryWithSubquery) => ({
    type: SET_CURRENT_PAGE_FINAL_QUERY_WITH_SUBQUERY,
    payload: currentPageFinalQueryWithSubquery
})

export const setIsFetchingFinalQueryWithSubquery = (bool) => ({
    type: SET_IS_FETCHING_FINAL_QUERY_WITH_SUBQUERY,
    payload: bool
})