import axios from "axios";
import {setForms, setIsFetching} from "../reducers/formOfIssueTable";

const API_URL = "http://localhost:8080/api/";

export const getForms = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true))
        const forms = await axios.get(API_URL + `formOfIssues`);
        dispatch(setForms(forms.data))
    }
};
