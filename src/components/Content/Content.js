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
import FirstRequestTable from "../requestsTables/firstRequest/FirstRequestTable";
import SecondRequestTable from "../requestsTables/secondRequest/SecondRequestTable";
import ThirdRequestTable from "../requestsTables/thirdRequest/ThirdRequestTable";
import ProtectedRoute from "../commonComponents/ProtectedRoute"
import Unauthorized from "../commonComponents/Unauthorized";
import NewDeliver from "../pharmacyTable/NewDeliver";
import AddNewManufactureFirm from "../manufacturerFirmTable/AddNewManudactureFirm/AddNewManufactureFirm";
import AddNewMedicine from "../medicineTable/AddNewMedicine/AddNewMedicine";
import MedicineViewOrEdit from "../medicineTable/MedicineViewOrEdit/MedicineViewOrEdit";
import ManufactureFirmViewOrEdit from "../manufacturerFirmTable/ManufactureFirmViewOrEdit/ManufactureFirmViewOrEdit";
import DeliveriesViewOrEdit from "../deliveriesTable/DeliveriesViewOrEdit/DeliveriesViewOrEdit";
import AddNewDeliver from "../deliveriesTable/AddNewDeliver/AddNewDeliver";
import AddNewEmployee from "../employeeTable/AddNewEmployee/AddNewEmployee";
import EmployeeViewOrEdit from "../employeeTable/EmployeeViewOrEdit/EmployeeViewOrEdit";
import AddNewPharmacy from "../pharmacyTable/AddNewPharmacy/AddNewPharmacy";
import PharmacyViewOrEdit from "../pharmacyTable/PharmacyViewOrEdit/PharmacyViewOrEdit";
import DateRequests from "../requestsTables/dateRequests/DateRequests";
import QueryWithDataConditionTable from "../summaryQueriesTable/QueryWithDataCondition/QueryWithDataConditionTable";
import QueryWithConditionForGroupsTable
        from "../summaryQueriesTable/QueryWithConditionForGroups/QueryWithConditionForGroupsTable";
import FinalQueryWithConditionForDataAndGroupsTable
        from "../summaryQueriesTable/FinalQueryWithConditionForDataAndGroups/FinalQueryWithConditionForDataAndGroupsTable";
import FinalRequestWithoutConditionTable
        from "../summaryQueriesTable/FinalRequestWithoutCondition/FinalRequestWithoutConditionTable";
import QueryOnWrapUpQueryTable from "../summaryQueriesTable/QueryOnWrapUpQuery/QueryOnWrapUpQueryTable";
import FinalQueryWithSubqueryTable from "../summaryQueriesTable/FinalQueryWithSubquery/FinalQueryWithSubqueryTable";

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
                    <ProtectedRoute path="/currentFirm/:id/:action" component={ManufactureFirmViewOrEdit}/>
                    <ProtectedRoute path="/currentMedicine/:id/:action" component={MedicineViewOrEdit}/>
                    <ProtectedRoute path="/currentPharmacy/:id/:action" component={PharmacyViewOrEdit}/>
                    <ProtectedRoute path="/currentEmployee/:id/:action" component={EmployeeViewOrEdit}/>
                    <ProtectedRoute path="/currentDeliver/:id/:action" component={DeliveriesViewOrEdit}/>
                    <ProtectedRoute path="/firstRequest" component={FirstRequestTable}/>
                    <ProtectedRoute path="/secondRequest" component={SecondRequestTable}/>
                    <ProtectedRoute path="/thirdRequest" component={ThirdRequestTable}/>
                    <ProtectedRoute path="/newDeliverForCurrentPharmacy/:id" component={NewDeliver}/>
                    <ProtectedRoute path="/addNewFirm" component={AddNewManufactureFirm}/>
                    <ProtectedRoute path="/addNewMedicine" component={AddNewMedicine}/>
                    <ProtectedRoute path="/addNewDeliver" component={AddNewDeliver}/>
                    <ProtectedRoute path="/addNewEmployee" component={AddNewEmployee}/>
                    <ProtectedRoute path="/addNewPharmacy" component={AddNewPharmacy}/>
                    <ProtectedRoute path="/dateRequests" component={DateRequests}/>
                    <ProtectedRoute path="/queryWithDataCondition" component={QueryWithDataConditionTable}/>
                    <ProtectedRoute path="/queryWithConditionForGroups" component={QueryWithConditionForGroupsTable}/>
                    <ProtectedRoute path="/finalQueryWithConditionForGroupsAndData" component={FinalQueryWithConditionForDataAndGroupsTable}/>
                    <ProtectedRoute path="/finalQueryWithoutCondition" component={FinalRequestWithoutConditionTable}/>
                    <ProtectedRoute path="/queryOnWrapUpQuery" component={QueryOnWrapUpQueryTable}/>
                    <ProtectedRoute path="/finalQueryWithSubquery" component={FinalQueryWithSubqueryTable}/>
                    {/*<ProtectedRoute path="/diagrams" component={ChartsTable}/>*/}
                    <Route exact path='/unauthorized' component={Unauthorized} />
                    <Redirect to="/login"/>
            </Switch>
        )
}

export default Content;