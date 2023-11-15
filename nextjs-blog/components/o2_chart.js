import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import withAuth from './withAuthentication'



const OxygenSaturationChart = ({ patient_blood_oxygen_saturation_data }) => {

    const data = {
        labels: patient_blood_oxygen_saturation_data.map((data) => new Date(data.timestamp).toLocaleDateString()),
        datasets :[
            {
                label: "Saturation",
                data: patient_blood_oxygen_saturation_data.map((data) => data.oxygen_saturation),
                fill: false,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Oxygen Saturation Chart",
            },
        },
    };
    return <Line data={data} options={options} />;
};
    export default withAuth(OxygenSaturationChart);