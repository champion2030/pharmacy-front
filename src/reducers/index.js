import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import userReducer from "./usersTableReducer";
import formOfIssueReducer from "./formOfIssueTableReducer";
import countryOfManufactureReducer from "./countryOfManufactureTableReducer";
import typesOfPropertyReducer from "./typeOfPropertyTableReducer";
import pharmacyNameReducer from "./pharmacyNameTableReducer";
import areaReducer from "./areaTableReducer";
import reasonForReturnReducer from "./reasonForReturnTablereducer";
import pharmacologicalGroupReducer from "./pharmacologicalGroupTableReducer";
import manufacturerFirmReducer from "./manufacturerFirmTableReducer";
import medicineReducer from "./medicineTableReducer";
import pharmacyReducer from "./pharmacyTableReducer";
import employeeReducer from "./employeeTableReducer";

export default combineReducers({
    auth,
    message,
    userReducer,
    formOfIssueReducer,
    pharmacologicalGroupReducer,
    countryOfManufactureReducer,
    typesOfPropertyReducer,
    pharmacyNameReducer,
    areaReducer,
    reasonForReturnReducer,
    manufacturerFirmReducer,
    medicineReducer,
    pharmacyReducer,
    employeeReducer
});
