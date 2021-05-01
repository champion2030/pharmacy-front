import axios from "axios";
import {
    setCurrentPageFinalQueryWithDataAndGroup,
    setCurrentPageQueryWithDataCondition, setFinalQueryWithDataAndGroup,
    setIsFetchingFinalQueryWithDataAndGroup,
    setIsFetchingQueryWithConditionForGroups,
    setIsFetchingQueryWithDataCondition,
    setQueryWithConditionForGroups,
    setQueryWithDataCondition
} from "../reducers/summaryQueriesReducer";

const API_URL = "http://localhost:8080/api/";

export const getQueryWithDataCondition = (currentPage, perPage, start_date, finish_date) => {
    return async (dispatch) => {
        dispatch(setIsFetchingQueryWithDataCondition(true))
        const requestResult = await axios.post(API_URL + `queryWithDataCondition?page=${currentPage}&limit=${perPage}`, {
            start_date,
            finish_date
        });
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0) {
            dispatch(setCurrentPageQueryWithDataCondition(requestResult.data.totalPages))
        } else if (requestResult.data.totalPages === 0) {
            dispatch(setCurrentPageQueryWithDataCondition(1))
        }
        dispatch(setQueryWithDataCondition(requestResult.data))
    }
}

export const getQueryWithConditionForGroups = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingQueryWithConditionForGroups(true))
        const requestResult = await axios.get(API_URL + `queryWithConditionForGroups`)
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
        });
        if (currentPage > requestResult.data.totalPages && requestResult.data.totalPages !== 0) {
            dispatch(setCurrentPageFinalQueryWithDataAndGroup(requestResult.data.totalPages))
        } else if (requestResult.data.totalPages === 0) {
            dispatch(setCurrentPageFinalQueryWithDataAndGroup(1))
        }
        dispatch(setFinalQueryWithDataAndGroup(requestResult.data))
    }
}