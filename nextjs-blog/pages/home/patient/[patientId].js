import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/navbar';
import withAuth from '../../../components/withAuthentication';
import styles from '../../../components/layout.module.css';


const PatientDetail = () => {
  const [patient, setPatient] = useState(null);
  //const {bloodPressureData, setBloodPressureData} = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { patientId } = router.query;

  useEffect(() => {
    if (patientId) {
      //Fetch patient data
      fetch(`https://api.kaspergaupmadsen.no/Patients/${patientId}`), {
        method: "GET",
        credentials: "include",
      }
        .then((response) => response.json())
        .then((data) => {
          setPatient(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        });
      
      //Fetch blood pressure data
      //fetch(`https://api.kaspergaupmadsen.no/patient/${patientId}/bloodpressure/`), {
     //   method: "GET",
    //    credentials: "include",
   //   }
   //     .then((response) => response.json())
    //    .then((data) => {
     //     setBloodPressureData(data);
     //     setLoading(false);
     //   })
    //    .catch((error) => {
     /////     console.error("Error fetching blood pressure data:", error);
     //     setLoading(false);
    //    });
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
      <h1>Patient Details</h1>
      <table class = "table table-striped">
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
                      <td>{patient.address}</td>
                  </tr>
                  <tr>
                      <th>Phone Number</th>
                      <td>{patient.phone}</td>
                  </tr>
                  <tr>
                      <th>Date of Birth</th>
                      <td>{patient.birthDate}</td>
                  </tr>
                  <tr>
                      <th>Added by</th>
                      <td>{patient.added_by}</td>
                  </tr>
              </tbody>
      </table>


   
      

    
</>
    )
};

export default withAuth(PatientDetail);
