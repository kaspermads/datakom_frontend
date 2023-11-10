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
    fetch("https://api.kaspergaupmadsen.no/Patients/")
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
    return <div>Loading...</div>;
  }

  const handleRowClick = (patientId) => {
    Router.push(`/home/patient/${patientId}`);
  };

  return (
      <>      
      <table class = "table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>s
            <th scope = "col">First Name</th>
            <th scope = "col">Last Name</th>
            <th scope = "col">Date of Birthd</th>
          </tr>
        </thead>
        <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} onClick = {() => handleRowClick(patient.id)}>
                <th scope = "row">{patient.id}</th>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>  
                <td>{patient.birthDate}</td>
              </tr>

            ))}
        </tbody>
      </table>

    </>
    );
};

export default withAuth(Patients);
