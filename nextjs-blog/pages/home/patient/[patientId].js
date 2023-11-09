import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import withAuth from '../../../components/withAuthentication';


const PatientDetail = () => {
  const [patient, setPatient] = useState(null);
  //const {bloodPressureData, setBloodPressureData} = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { patientId } = router.query;

  useEffect(() => {
    if (patientId) {
      //Fetch patient data
      fetch(`https://api.kaspergaupmadsen.no/Patients/${patientId}`, {
        method: "GET",
        credentials: "include",
      })
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
      <h1>Patient Details</h1>
      <table className="table table-striped table-hover custom-table">
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

      <h2>Blood Pressure Data for {patient.first_name}</h2>
      {patient.patient_blood_pressure_data && patient.patient_blood_pressure_data.length > 0 ? (
        <table className="table table-striped custom-table table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Systolic</th>
              <th>Diastolic</th>
              <th>Pulse</th>
            </tr>
          </thead>
          <tbody>
            {patient.patient_blood_pressure_data.map((record, index) => (
              <tr key={index}>
                <td>{record.timestamp}</td>
                <td>{record.systolic}</td>
                <td>{record.diastolic}</td>
                <td>{record.pulse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No blood pressure data found.</div>
      )}
    
    </>
  );
};

export default withAuth(PatientDetail);
