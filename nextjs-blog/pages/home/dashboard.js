
import Router from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import Patients from './patients-test';
import AddPatient from './add-patient'; 
import Layout from '../../components/navbar';
import { AuthContext } from '../../components/AuthContext';
import withAuth from '../../components/withAuthentication'




function Dashboard() {
  
  const [activePage, setActivePage] = useState('patients');
  const { isAuthenticated } = useContext(AuthContext);
  const dashboardStyle = {
    display: 'flex',         // Use the Flexbox layout
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically
    height: '100vh',          // Full viewport height
    textAlign: 'center'       // Center text for any direct child
  };
  
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
 
      <Layout setActivePage={setActivePage}>
        <main style = {dashboardStyle}>
          {DashboardContent()}
        </main>
      </Layout>
    ) :
      <>
        Loading{''}
      </>


    
  );
  
}
export default withAuth(Dashboard);
