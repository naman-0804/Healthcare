import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

function ListAppointments() {
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
    <div>
      
    </div>
  );
}

export default ListAppointments;
