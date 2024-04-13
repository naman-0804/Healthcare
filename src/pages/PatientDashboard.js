import React from 'react';
import { Link } from 'react-router-dom';

function PatientDashboard() {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <Link to="/AppointmentScheduling">Schedule Appointment</Link>
    </div>
  );
}

export default PatientDashboard;
