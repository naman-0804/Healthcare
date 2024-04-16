import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import './signUpForm.css'

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [userType, setUserType] = useState('patient');
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Insert user data into the appropriate table based on user type
      if (userType === 'doctor') {
        await supabase.from('doctor').insert([
          { email, password, Name }
        ]);
      } 
      if (userType === 'patient') {
        await supabase.from('patient').insert([
          { email, password, Name }
        ]);
      }
      alert('Sign up successful!');
      setSignedUp(true);
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  if (signedUp) {
    return (
      <div>
        {userType === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
      </div>
    );
  }

  return (
    <div className="signUP">
    <div className="container">
      <div className="form">
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className="labels" htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label className="labels" htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <label className="labels" htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Enter your Name" value={Name} onChange={(e) => setName(e.target.value)} required /><br />
        <label className="labels" htmlFor="user-type">Are you a: </label>
        <select id="user-type" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select><br />
        <button className="btn" data-replace=" You are almost done :)" type="submit"><span>Sign Up</span></button>
      </form>
      </div>
    </div>  
    </div>
  );
}

export default SignUpForm;
