// Prescription.js
import React, { useState } from 'react';
import supabase from '../config/supabaseClient';
import './pres.css';
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
    <div className="pre">
      <div className="container-pres">
      <h1 className="prestitle">Add Prescription</h1>
      <form className="pres-text" onSubmit={handlePrescriptionSubmit}>
        <label className="form-group" htmlFor="pat_id">Patient ID:</label>
        <input type="text" id="pat_id" name="pat_id" value={prescriptionData.pat_id} onChange={handleChange} required /><br />
        <br />
        <label className="form-group" htmlFor="doc_id">Doctor ID:</label>
        <input type="text" id="doc_id" name="doc_id" value={prescriptionData.doc_id} onChange={handleChange} required /><br />
        <br />
        <label className="form-group" htmlFor="medicine">Medicine:</label>
        <input type="text" id="Medicine" name="Medicine" value={prescriptionData.Medicine} onChange={handleChange} required /><br />
        <br />
        <label className="form-group" htmlFor="consumption">Consumption:</label>
        <input type="text" id="Consumption" name="Consumption" value={prescriptionData.Consumption} onChange={handleChange} required /><br />
        <br />
        <button className="btn-upl-pres" type="submit">Upload Prescription</button>
      </form>
      </div>
    </div>
  );
}

export default Prescription;
