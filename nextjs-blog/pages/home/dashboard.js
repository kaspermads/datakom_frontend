
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import Patients from './patients-test';
import AddPatient from './add-patient'; 
import Layout from '../../components/navbar';
import { AuthContext } from '../../components/AuthContext';
import withAuth from '../../components/withAuthentication'




function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const activePage = router.pathname.includes("add-patient") ? "add-patient" : "patients";
 
  
  const DashboardContent = () => {
    switch (activePage) {
      case 'patients':
        return <Patients />;
      case 'add-patient':
        return <AddPatient />;
      default:
        return <Patients />;
    }
    };

  return (
  
    isAuthenticated ? (
 
        <main>
          {DashboardContent()}
        </main>
    ) :
      <>
        Loading{''}
      </>


    
  );
  
}
export default withAuth(Dashboard);
