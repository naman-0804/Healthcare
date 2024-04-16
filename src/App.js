import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/signinform';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import AppointmentScheduling from './pages/Appointement';
import Prescription from './pages/Prescription';
import Listprescription from './pages/List_prescription';
import './App.css';
import Chatbot from './chatbot';

function Navigation() {
  const location = useLocation();

  return (
    <div className="Home">
      <div className="header">
        <h1 className="abc">MedHub360</h1>
        <div className="logo-home"></div></div>

        <div className='card-pat1'>
          <p className="tet1">ChatBot 24*7</p>
          <Chatbot />
        </div>
    <nav >
        {location.pathname === "/" && (
            <Link to="/signup"><div className="link1">Sign Up</div></Link>
        )}
        {location.pathname === "/" && (
            <Link to="/signin"><div className="link2">Log In</div></Link>
        )}
    </nav>  
    </div>      
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
          <Route path="/Listprescription" element={<Listprescription/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
