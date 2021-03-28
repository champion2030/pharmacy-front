import axios from "axios";
import {setIsFetching} from "../reducers/countryOfManufactureTableReducer";
import {SET_MESSAGE} from "./types";
import {setCountries} from "../reducers/countryOfManufactureTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getCountries = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const countries = await axios.get(API_URL + `getCountryOfManufacture`);
        dispatch(setCountries(countries.data))
    }
};

export const createNewCountry = (country) => (dispatch) => {
    dispatch(setIsFetching(true))
    const newCountry = axios.post(API_URL + `createCountryOfManufacture`, {country})
    return newCountry.then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Country created successful!",
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.error

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );

};
