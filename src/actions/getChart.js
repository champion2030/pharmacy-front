import axios from "axios";
import authHeader from "../services/auth-header";
import {set3DDiagram, setDiagramInfo} from "../reducers/chartTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getChart = () => async (dispatch) => {
    const response = await axios.get(API_URL + `diagram`, {headers: authHeader()})
    dispatch(setDiagramInfo(response.data))
}

export const get3DChart = () => async (dispatch) => {
    const response = await axios.get(API_URL + `get3DDiagram`, {headers: authHeader()})
    dispatch(set3DDiagram(response.data))
}