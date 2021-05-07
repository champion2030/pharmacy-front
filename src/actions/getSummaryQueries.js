import axios from "axios";
import {
    setCurrentPageFinalQueryWithDataAndGroup,
    setCurrentPageFinalQueryWithGroup,
    setCurrentPageFinalRequestWithoutCondition,
    setCurrentPageQueryWithDataCondition,
    setFinalQueryWithDataAndGroup, setFinalRequestWithoutCondition,
    setIsFetchingFinalQueryWithDataAndGroup, setIsFetchingFinalRequestWithoutCondition,
    setIsFetchingQueryWithConditionForGroups,
    setIsFetchingQueryWithDataCondition,
    setQueryWithConditionForGroups,
    setQueryWithDataCondition
} from "../reducers/summaryQueriesReducer";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/api/";

export const getQueryWithDataCondition = (currentPage, perPage, start_date, finish_date) => {
    return async (dispatch) => {
        dispatch(setIsFetchingQueryWithDataCondition(true))
        const requestResult = await axios.post(API_URL + `queryWithDataCondition?page=${currentPage}&limit=${perPage}`, {
            start_date,
            finish_date
        }, {headers: authHeader()});
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0) {
            dispatch(setCurrentPageQueryWithDataCondition(requestResult.data.totalPages))
        } else if (requestResult.data.totalPages === 0) {
            dispatch(setCurrentPageQueryWithDataCondition(1))
        }
        dispatch(setQueryWithDataCondition(requestResult.data))
    }
}

export const getQueryWithConditionForGroups = (currentPage, perPage, manufacturerFirmId) => {
    return async (dispatch) => {
        dispatch(setIsFetchingQueryWithConditionForGroups(true))
        const requestResult = await axios.post(API_URL + `queryWithConditionForGroups?page=${currentPage}&limit=${perPage}`, {manufacturerFirmId},
            {headers: authHeader()})
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0) {
            dispatch(setCurrentPageFinalQueryWithGroup(requestResult.data.totalPages))
        } else if (requestResult.data.totalPages === 0) {
            dispatch(setCurrentPageFinalQueryWithGroup(1))
        }
        dispatch(setQueryWithConditionForGroups(requestResult.data))
    }
}

export const getFinalQueryWithDataAndGroups = (currentPage, perPage, start_date, finish_date, manufacturerFirmId) => {
    return async (dispatch) => {
        dispatch(setIsFetchingFinalQueryWithDataAndGroup(true))
        const requestResult = await axios.post(API_URL + `finalQueryWithDataAndGroup?page=${currentPage}&limit=${perPage}`, {
            start_date,
            finish_date,
            manufacturerFirmId
        }, {headers: authHeader()});
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0) {
            dispatch(setCurrentPageFinalQueryWithDataAndGroup(requestResult.data.totalPages))
        } else if (requestResult.data.totalPages === 0) {
            dispatch(setCurrentPageFinalQueryWithDataAndGroup(1))
        }
        dispatch(setFinalQueryWithDataAndGroup(requestResult.data))
    }
}



export const getFinalRequestWithoutCondition = (currentPage, perPage) => {
    return async (dispatch) => {
        dispatch(setIsFetchingFinalRequestWithoutCondition(true))
        const requestResult = await axios.get(API_URL + `finalRequestWithoutCondition?page=${currentPage}&limit=${perPage}`,{headers: authHeader()});
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0) {
            dispatch(setCurrentPageFinalRequestWithoutCondition(requestResult.data.totalPages))
        } else if (requestResult.data.totalPages === 0) {
            dispatch(setCurrentPageFinalRequestWithoutCondition(1))
        }
        dispatch(setFinalRequestWithoutCondition(requestResult.data))
    }
}