import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import withAuth from './withAuthentication'



const BloodPressureChart = ({ patient_blood_pressure_data }) => {

    const data = {
        labels: patient_blood_pressure_data.map((data) => new Date(data.timestamp).toLocalDateString()),
        datasets :[
            {
                label: "Systolic",
                data: patient_blood_pressure_data.map((data) => data.systolic),
                fill: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
            {
                label: "Diastolic",
                data: patient_blood_pressure_data.map((data) => data.diastolic),
                fill: false,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };
    return <Line data={data} options={options} />;
};
    export default withAuth(BloodPressureChart);