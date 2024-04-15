import React from 'react';
import { Link } from 'react-router-dom';
import ListAppointments from './List_Appointment'; 

function PatientDashboard() {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <Link to="/AppointmentScheduling">Schedule Appointment</Link>
      <br></br>
      <a href="http://127.0.0.1:5000/video_feed">Video Call for mute</a>
      <br></br>
      
      <ListAppointments /> {/* */}
    </div>
  );
}

export default PatientDashboard;
