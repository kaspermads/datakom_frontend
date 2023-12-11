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


  return isAuthenticated ? <main>{DashboardContent()}</main> : <>Loading{""}</>;
}
export default withAuth(Dashboard);
