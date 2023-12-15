import React, { useState, useContext } from "react";
import Patients from "./patients-test";
import AddPatient from "./add-patient";
import { AuthContext } from "../../components/AuthContext";
import withAuth from "../../components/withAuthentication";


function Dashboard() {
  const [activePage, setActivePage] = useState("patients");
  const { isAuthenticated } = useContext(AuthContext);


  const DashboardContent = () => {
    switch (activePage) {
      case "patients":
        return <Patients />;
      case "add-patient":
        return <AddPatient />;
      default:
        return <Patients />;
    }
  };


  return isAuthenticated ? <main>{DashboardContent()}</main> : <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
}
export default withAuth(Dashboard);
