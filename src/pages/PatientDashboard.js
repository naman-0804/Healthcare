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
        <div className="preetitle">Scheduling an Appointment with a Doctor is just one CLICK AWAY</div>
        <div class="add-appoint">
        <Link to="/AppointmentScheduling">Schedule Appointment</Link><div class="appoint-ani"></div>
      
      </div>
    </div>

    <div class="card-pat">
    <Listprescription/>
    </div>
    <div class="card-pat">
        <h2>Consultation</h2>
        <div className="preetitle">Talk to your Doctor NOW</div>  
        <br />
        <div class="add-vid">
        <a href="http://127.0.0.1:5000/video_feed">Virtual Consultation (Sign Language)</a>
        <div class="vid-ani"></div>
        </div> 
    </div>
    
    </div>
    </div>
  );
}

export default PatientDashboard;
