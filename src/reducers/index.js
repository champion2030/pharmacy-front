import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import userReducer from "./usersTable";
import formOfIssueReducer from "./formOfIssueTable";

export default combineReducers({
    auth,
    message,
    userReducer,
    formOfIssueReducer
});
