import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Check if the email and password match a doctor record
      const { data: doctors, error: doctorError } = await supabase
        .from('doctor')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (doctors) {
        alert('Doctor sign in successful!');
        // Navigate to DoctorDashboard
        navigate('/DoctorDashboard'); // Redirect to DoctorDashboard
        return;
      }

      // Check if the email and password match a patient record
      const { data: patients, error: patientError } = await supabase
        .from('patient')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (patients) {
        alert('Patient sign in successful!');
        // Navigate to PatientDashboard
        navigate('/PatientDashboard');
        return;
      }

      // If neither doctor nor patient found, display error
      throw new Error('User not found or invalid credentials.');

    } catch (error) {
      console.error('Error signing in:', error.message);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
