import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" value={Name} onChange={(e) => setName(e.target.value)} required /><br />
        <label htmlFor="user-type">Are you a:</label><br />
        <select id="user-type" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
