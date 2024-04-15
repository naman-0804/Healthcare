// Prescription.js
import React, { useState } from 'react';
import supabase from '../config/supabaseClient';

function Prescription() {
  const [prescriptionData, setPrescriptionData] = useState({
    pat_id: '',
    doc_id: '',
    Medicine: '',
    Consumption: ''
  });

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('prescription').insert([prescriptionData]);

      if (error) {
        throw error;
      }

      console.log('Prescription submitted successfully:', data);
      alert('Prescription submitted successfully!');
      
      // Clear the form after submission
      setPrescriptionData({
        pat_id: '',
        doc_id: '',
        Medicine: '',
        Consumption: ''
      });

    } catch (error) {
      console.error('Error submitting prescription:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Add Prescription</h2>
      <form onSubmit={handlePrescriptionSubmit}>
        <label htmlFor="pat_id">Patient ID:</label><br />
        <input type="text" id="pat_id" name="pat_id" value={prescriptionData.pat_id} onChange={handleChange} required /><br />
        <label htmlFor="doc_id">Doctor ID:</label><br />
        <input type="text" id="doc_id" name="doc_id" value={prescriptionData.doc_id} onChange={handleChange} required /><br />
        <label htmlFor="medicine">Medicine:</label><br />
        <input type="text" id="Medicine" name="Medicine" value={prescriptionData.Medicine} onChange={handleChange} required /><br />
        <label htmlFor="consumption">Consumption:</label><br />
        <input type="text" id="Consumption" name="Consumption" value={prescriptionData.Consumption} onChange={handleChange} required /><br />
        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
}

export default Prescription;
