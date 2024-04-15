import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/signinform';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AppointmentScheduling from './pages/Appointement';
import Prescription from './pages/Prescription';
function Navigation() {
  const location = useLocation();

  return (
    <nav>
      <ul>
        {location.pathname === "/" && (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
        {location.pathname === "/" && (
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/PatientDashboard" element={<PatientDashboard />} />
          <Route path="/AppointmentScheduling" element={<AppointmentScheduling />} />
          <Route path="/Prescription" element={<Prescription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
