import React from 'react';
import { Link } from 'react-router-dom';
function DoctorDashboard() {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <Link to="/Prescription">Add prescription</Link>
      {}
    </div>
  );
}

export default DoctorDashboard;