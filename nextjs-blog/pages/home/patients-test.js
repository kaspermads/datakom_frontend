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

  return (
      <>
      
          
      <h5>Patients List</h5>
      
      <table>
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
              <tr key={patient.id}>
                <td>
                  <Link href={`/home/patient/${patient.id}`}>
                    <a>{patient.id}</a>
                  </Link>
                </td>
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
