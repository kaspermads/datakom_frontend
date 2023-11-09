import React, { useState, useEffect } from "react";
import Router from 'next/router';
import styles from '../../components/layout.module.css';
import Link from 'next/link';
import Layout from "../../components/navbar";
import withAuth from '../../components/withAuthentication'



const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState('');

  const router = useRouter();
  const handleRowClick = (patientId) => {
    router.push(`/home/patient/${patientId}`);
  };

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
      <table class = "table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope = "col">First Name</th>
            <th scope = "col">Last Name</th>
            <th scope = "col">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <Link href={`/home/patient/${patient.id}`}>
              <a>
              <tr key={patient.id}>
                <th scope="row">{patient.id}</th>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.birthDate}</td>
              </tr>
              </a>
              </Link>

            ))}
        </tbody>
      </table>

    </>
    );
};

export default withAuth(Patients);


<Link href={`/home/patient/${patient.id}`}>
                    <a>{patient.id}</a>
                  </Link>