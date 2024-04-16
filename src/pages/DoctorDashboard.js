import React from 'react';
import { Link } from 'react-router-dom';
import ListAppointments from './List_Appointment'; 
import Patient from './patient';
function DoctorDashboard() {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <Link to="/Prescription">Add prescription</Link>
      <ListAppointments/>
      <Patient/>
    </div>
  );
}

export default DoctorDashboard;