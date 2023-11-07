import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from '../../components/layout';

import withAuth from '../../components/withAuthentication'



function getCSRFToken() {
    const csrfToken = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    return csrfToken ? csrfToken[2] : null;
}



const AddPatient = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');


    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        fetch('https://api.kaspergaupmadsen.no/api/register-patient/', {
            credentials: 'include'
        }).then(() => {
            setCsrfToken(getCSRFToken());
        });
    }, []); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formattedBirthDate = birthDate.split('/').reverse().join('-');
        
        const patientData = {first_name: firstName, last_name: lastName, birthDate: formattedBirthDate, address: address, phone_number: phoneNumber};

        // Perform the API call
        try {
            const response = await fetch('https://api.kaspergaupmadsen.no/api/register-patient/', {
            //const response = await fetch('http://localhost:8000/api/register-patient/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({ patientData }),
                credentials: 'include',
            });


            if (response.ok) {
                Router.push('/home/dashboard/');

            } else {
                const errData = await response.json();
                setError(errData.detail || 'An error occurred while adding the patient.');
            }
            
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Layout>
            <h1>Register a new patient</h1>
            {error && <p className="error">Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div className ="mb-3">
                    <label className = "form-label">First Name</label>
                    <input
                        type="text"
                        className = "form-control"
                        
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                    />
                </div>
                <div className ="mb-3">
                    <label className = "form-label">Last Name</label>
                    <input
                        type="text"
                        className = "form-control"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        required
                    />
                </div>
                    <div className="mb-3">
                        <label className="form-label">Birthdate</label>
                        <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required    
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </Layout>
        </>
    );
};

export default withAuth(AddPatient);
