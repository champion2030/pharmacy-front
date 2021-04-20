import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import UsersTable from "../usersTable/UsersTable";
import SignIn from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import FormOfIssueTable from "../formOfIssueTable/FormOfIssueTable";
import PharmacologicalGroupTable from "../pharmacologicalGroupTable/PharmacologicalGroupTable";
import CountryOfManufactureTable from "../countryOfManufactureTable/CountryOfManufactureTable";
import TypeOfPropertyTable from "../typeOfPropertyTable/TypeOfPropertyTable";
import PharmacyNameTable from "../pharmacyName/PharmacyNameTable";
import AreaTable from "../areaTable/AreaTable";
import ReasonForReturnTable from "../reasonForReturnTable/ReasonForReturnTable";
import ManufacturerFirmTable from "../manufacturerFirmTable/ManufacturerFirmTable";
import MedicineTable from "../medicineTable/MedicineTable";
import PharmacyTable from "../pharmacyTable/PharmacyTable";
import EmployeeTable from "../employeeTable/EmployeeTable";
import DeliveriesTable from "../deliveriesTable/DeliveriesTable";
import AreaUpdate from "../areaTable/AreaUpdate";
import CountryOfManufactureUpdate from "../countryOfManufactureTable/CountryOfManufactureUpdate";
import FormOfIssueUpdate from "../formOfIssueTable/FormOfIssueUpdate";
import PharmacologicalGroupUpdate from "../pharmacologicalGroupTable/PharmacologicalGroupUpdate";
import PharmacyNameUpdate from "../pharmacyName/PharmacyNameUpdate";
import ReasonForReturnUpdate from "../reasonForReturnTable/ReasonForReturnUpdate";
import TypeOfPropertyUpdate from "../typeOfPropertyTable/TypeOfPropertyUpdate";
import ManufactureFirmAddOrEdit from "../manufacturerFirmTable/ManufactureFirmAddOrEdit";
import MedicineAddOrEdit from "../medicineTable/MedicineAddOrEdit";
import PharmacyAddOrEdit from "../pharmacyTable/PharmacyAddOrEdit";
import EmployeeAddOrEdit from "../employeeTable/EmployeeAddOrEdit";
import DeliveriesAddOrEdit from "../deliveriesTable/DeliveriesAddOrEdit";
import FirstRequestTable from "../requestsTables/firstRequest/FirstRequestTable";
import SecondRequestTable from "../requestsTables/secondRequest/SecondRequestTable";
import ThirdRequestTable from "../requestsTables/thirdRequest/ThirdRequestTable";
import ProtectedRoute from "../commonComponents/ProtectedRoute"
import Unauthorized from "../commonComponents/Unauthorized";
import NewDeliver from "../pharmacyTable/NewDeliver";

const Content = () => {

    return (
        <Switch>
            <Route exact path={["/login"]} component={SignIn}/>
            <Route path="/login" component={SignIn}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute path="/profile" component={Profile}/>
            <ProtectedRoute path="/users" component={UsersTable}/>
            <ProtectedRoute path="/formOfIssue" component={FormOfIssueTable}/>
            <ProtectedRoute path="/pharmacologicalGroup" component={PharmacologicalGroupTable}/>
            <ProtectedRoute path="/countryOfManufacture" component={CountryOfManufactureTable}/>
            <ProtectedRoute path="/typeOfProperty" component={TypeOfPropertyTable}/>
            <ProtectedRoute path="/pharmacyName" component={PharmacyNameTable}/>
            <ProtectedRoute path="/area" component={AreaTable}/>
            <ProtectedRoute path="/reasonForReturn" component={ReasonForReturnTable}/>
            <ProtectedRoute path="/manufacturerFirms" component={ManufacturerFirmTable}/>
            <ProtectedRoute path="/medicines" component={MedicineTable}/>
            <ProtectedRoute path="/pharmacy" component={PharmacyTable}/>
            <ProtectedRoute path="/employee" component={EmployeeTable}/>
            <ProtectedRoute path="/deliveries" component={DeliveriesTable}/>
            <ProtectedRoute path="/currentArea/:id" component={AreaUpdate}/>
            <ProtectedRoute path="/currentCountry/:id" component={CountryOfManufactureUpdate}/>
            <ProtectedRoute path="/currentFormOfIssue/:id" component={FormOfIssueUpdate}/>
            <ProtectedRoute path="/currentPharmacologicalGroup/:id" component={PharmacologicalGroupUpdate}/>
            <ProtectedRoute path="/currentPharmacyName/:id" component={PharmacyNameUpdate}/>
            <ProtectedRoute path="/currentReasonForReturn/:id" component={ReasonForReturnUpdate}/>
            <ProtectedRoute path="/currentTypeOfProperty/:id" component={TypeOfPropertyUpdate}/>
            <ProtectedRoute path="/currentFirm/:id/:action" component={ManufactureFirmAddOrEdit}/>
            <ProtectedRoute path="/currentMedicine/:id/:action" component={MedicineAddOrEdit}/>
            <ProtectedRoute path="/currentPharmacy/:id/:action" component={PharmacyAddOrEdit}/>
            <ProtectedRoute path="/currentEmployee/:id/:action" component={EmployeeAddOrEdit}/>
            <ProtectedRoute path="/currentDeliver/:id/:action" component={DeliveriesAddOrEdit}/>
            <ProtectedRoute path="/firstRequest" component={FirstRequestTable}/>
            <ProtectedRoute path="/secondRequest" component={SecondRequestTable}/>
            <ProtectedRoute path="/thirdRequest" component={ThirdRequestTable}/>
            <ProtectedRoute path="/newDeliverForCurrentPharmacy/:id" component={NewDeliver}/>
            <Route exact path='/unauthorized' component={Unauthorized} />
            <Redirect to="/login"/>
        </Switch>
    )
}

export default Content;