import React, { useState, useEffect } from "react";
import Router from 'next/router';
import styles from '../../components/layout.module.css';
import Link from 'next/link';
import Layout from "../../components/navbar";
import withAuth from '../../components/withAuthentication'



const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState('');
  

  useEffect(() => {
    fetch("https://api.kaspergaupmadsen.no/Patients/", {
      method: "GET",
      credentials: "include",
    })
      
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div class="spinner-grow" role="status">
           <span class="sr-only">Loading...</span>
           </div>;
  }
  const handleRowClick = (patientId) => {
    Router.push(`/home/patient/${patientId}`);
  };


  return (
      <>
      <div className = "dashboardContainers">
      <h5>Patients List</h5>
      
      <table className = "table table-striped table-sm table-hover w-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} onClick={() => handleRowClick(patient.id)}>
                <td>{patient.id}</td>

                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>  
                <td>{patient.birthDate}</td>
              </tr>

            ))}
        </tbody>
      </table>
      </div>
    </>
    );
};

export default withAuth(Patients);
