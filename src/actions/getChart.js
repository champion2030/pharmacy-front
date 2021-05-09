import axios from "axios";
import authHeader from "../services/auth-header";
import {setDiagramInfo} from "../reducers/chartTableReducer";

const API_URL = "http://localhost:8080/api/";

export const getChart = () => async (dispatch) => {
    const response = await axios.get(API_URL + `diagram`, {headers: authHeader()})
    dispatch(setDiagramInfo(response.data))
}