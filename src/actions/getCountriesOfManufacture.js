import axios from "axios";
import {setCurrentCountry, setIsFetching, updateInputCountry} from "../reducers/countryOfManufactureTableReducer";
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
        () => {
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

export const deleteCountryOfManufacture = (id) => async (dispatch) => {
    dispatch(setIsFetching(true))
    await axios.delete(API_URL + `deleteCountryOfManufacture/${id}`)
}

export const getCurrentCountry = (id) => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const area = await axios.get(API_URL + `getCurrentCountryOfManufacture/${id}`);
        dispatch(setCurrentCountry(area.data.country))
    }
};

export const updateCurrentInputCountry = (input) => {
    return async (dispatch) => {
        dispatch(updateInputCountry(input))
    }
};

export const updateCurrentCountry = (country, id) => (dispatch) => {
    dispatch(setIsFetching(true))
    const updatedCountry = axios.put(API_URL + `updateCountryOfManufacture/${id}`, {country})
    return updatedCountry.then(
        () => {
            dispatch({
                type: SET_MESSAGE,
                payload: "Country updated successful!",
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
