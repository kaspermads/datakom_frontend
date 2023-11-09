
import Router from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import Patients from './patients-test';
import AddPatient from './add-patient'; 
import Layout from '../../components/navbar';
import { AuthContext } from '../../components/AuthContext';
import withAuth from '../../components/withAuthentication'

import MainNavigation from '../../components/Layout/MainNavigatin';




function Dashboard() {
  
  const [activePage, setActivePage] = useState('patients');
  const { isAuthenticated } = useContext(AuthContext);
  
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
 
      <MainNavigation setActivePage={setActivePage}>
        <main>
          {DashboardContent()}
        </main>
      </MainNavigation>
    ) :
      <>
        Loading{''}
      </>

  );
  
}
export default withAuth(Dashboard);
