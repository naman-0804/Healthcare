import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import './signinform.css';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data: doctors, error: doctorError } = await supabase
        .from('doctor')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (doctors) {
        alert('Doctor sign in successful!');
  
        navigate('/DoctorDashboard'); 
        return;
      }

  
      const { data: patients, error: patientError } = await supabase
        .from('patient')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (patients) {
        alert('Patient sign in successful!');
        navigate('/PatientDashboard');
        return;
      }

      throw new Error('User not found or invalid credentials.');

    } catch (error) {
      console.error('Error signing in:', error.message);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="signIN">
    <div className="container1">
    <div className="form1">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label className="labels1" htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label className="labels1" htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Sign In</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default SignInForm;
