import React from 'react';
import { Link } from 'react-router-dom';
import ListAppointments from './List_Appointment'; // Import the ListAppointments component

function PatientDashboard() {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <Link to="/AppointmentScheduling">Schedule Appointment</Link>
      <ListAppointments /> {/* Render the ListAppointments component */}
    </div>
  );
}

export default PatientDashboard;
