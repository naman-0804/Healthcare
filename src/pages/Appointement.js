import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import './appointmentScheduling.css';

function AppointmentScheduling() {
  const [pat_id, setpat_id] = useState('');
  const [date, setDate] = useState('');
  const [dept, setDept] = useState('');

  const handleAppointmentSchedule = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('appointement').insert([
        { pat_id: pat_id, date: date, dept: dept }
      ]);

      if (error) {
        throw error;
      }

      alert('Appointment scheduled successfully!');

    } catch (error) {
      console.error('Error scheduling appointment:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="appoint">
      <div className="container2">
      <div className="appoint-form">
      <h1 className="appointtitle">Schedule Appointment</h1>
      <form onSubmit={handleAppointmentSchedule}>
        <label htmlFor="pat_id">Patient ID:</label>
        <input type="text" id="pat_id" placeholder="Enter PatientID" value={pat_id} onChange={(e) => setpat_id(e.target.value)} required /><br />
        <label htmlFor="appointment-date">Appointment Date:</label>
        <input type="date" id="appointment-date" value={date} onChange={(e) => setDate(e.target.value)} required /><br />
        <label htmlFor="department">Department:</label>
        <input type="text" placeholder="Enter Department Name" id="department" value={dept} onChange={(e) => setDept(e.target.value)} required /><br />
        <button className="btn-sch" type="submit">Schedule Appointment</button>
      </form>
      </div>
      </div>
    </div>
  );
}

export default AppointmentScheduling;
