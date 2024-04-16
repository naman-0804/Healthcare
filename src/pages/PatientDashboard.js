import React from 'react';
import { Link } from 'react-router-dom';
import ListAppointments from './List_Appointment'; 
import './patientdashboard.css';
import supabase from '../config/supabaseClient';
import { useState, useEffect } from 'react';
import Listprescription from './List_prescription';
 

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase.from('appointement').select('*');
        if (data) {
          setAppointments(data);
        }
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    fetchAppointments();
  }, []);
  return (
    <div className="dash">
      <header className="pathead">
        <h1 className="pattitle">Patient Dashboard</h1>
      </header>
      <br />
      <div><h2 className="pat-titles">Upcoming Appointments:</h2></div>

      <div class="table-container">
    <div class="table-header">
      <div>Date</div>
      <div>Department</div>
    </div>

    {appointments.map(appointment => (
          <div class="table-row" key={appointment.id}>
            <div>{appointment.date}</div>
            <div>{appointment.dept}</div>
          </div>
        ))}
    </div>
    <div className="dashboardPat">
    <div class="card-pat">
        <h2>Appointments</h2>
        <div>Schedule an Appointment.</div>
        <div class="add-appoint">
        <Link to="/AppointmentScheduling">Schedule Appointment</Link><div class="appoint-ani"></div>
        <Listprescription/>

      {}
      </div>
    </div>

    <div class="card-pat">
        <h2>Patients</h2>
        <p>View and manage your patient records.</p>
        <a href="http://127.0.0.1:5000/video_feed">Video Call for mute</a>
    </div>
    </div>
      
      <ListAppointments appointments={appointments} setAppointments={setAppointments} /> {/* */}
    </div>
  );
}

export default PatientDashboard;
