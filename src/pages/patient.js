import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
function Patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // Make a query to fetch all patient profiles from the "patient" table
      const { data, error } = await supabase.from('patient').select('*');
      if (error) {
        throw error;
      }
      setPatients(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    }
  };

  return (
    <div>
      <h2>Patients</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.pat_id}>
              <strong>Name:</strong> {patient.Name}, <strong>Patient ID:</strong> {patient.pat_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Patient;
