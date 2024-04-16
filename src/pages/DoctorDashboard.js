import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorDashboard.css';
import Patient from './patient';
import ListAppointments from './List_Appointment';

function DoctorDashboard() {
  return (
    <div className="docdash">
      <header className="dochead">
      <h1 className="doctitle">Doctor Dashboard</h1>
      </header>
      <div className="containerDoc">
      <div className="dashboardDoc">
      <div class="card-prec">
        <h2>Prescriptions</h2>
        <p>View and manage your patient prescriptions.</p>
        <div class="add-prescription">
        <Link to="/Prescription">Add prescription</Link>
        <div class="pill-animation"></div>
      {}
      </div>
      </div>
      <div class="card">
        <h2>Patients</h2>
        <p>View and manage your patient records.</p>
        <div class="all-patient">
        <Patient/>
      </div>
      </div>
      <div class="card">
        <h2>Appointments</h2>
        <p>Schedule and manage your appointments.</p>
        <div class="all-patient">
        <ListAppointments/>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;