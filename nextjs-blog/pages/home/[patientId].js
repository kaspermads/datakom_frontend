import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/navbar';
import withAuth from '../../components/withAuthentication';

const PatientDetail = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { patientId } = router.query;

  useEffect(() => {
    if (patientId) {
      fetch(`https://api.kaspergaupmadsen.no/Patients/${patientId}`)
        .then((response) => response.json())
        .then((data) => {
          setPatient(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        });
    }
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>No patient data found.</div>;
  }

  return (
    <>
         
      <h5>Patient Data</h5>
      <table>
              <tbody>
                  <tr>
                      <th>ID</th>
                      <td>{patient.id}</td>
                  </tr>
                  <tr>
                      <th>First Name</th>
                      <td>{patient.first_name}</td>
                    </tr>
                  <tr>
                      <th>Last Name</th>
                      <td>{patient.last_name}</td>
                  </tr>
                  <tr>
                      <th>Address</th>
                      <td>{patient.adress}</td>
                  </tr>
                  <tr>
                      <th>Phone Number</th>
                      <td>{patient.phone}</td>
                  </tr>
                  <tr>
                      <th>Date of Birth</th>
                      <td>{patient.date_of_birth}</td>
                  </tr>
                  <tr>
                      <th>Added by</th>
                      <td>{patient.added_by}</td>
                  </tr>
              </tbody>
      </table>

    
    </>
    );
};

export default withAuth(PatientDetail);

