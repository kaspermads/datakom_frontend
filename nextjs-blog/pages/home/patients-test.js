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
        <ul>
            {patients.map((patient, index) => (
            <li key={index}>
                {patient.first_name} {patient.last_name} - Birthdate:{" "}
                {patient.birthDate} - {patient.address} - {patient.phone} - {patient.added_by}
            </li>
            ))}
          </ul>
    </>
    );
};

export default withAuth(Patients);
