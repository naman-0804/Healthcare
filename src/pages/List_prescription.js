import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

const Listprescription = () => {
    const [pat_id, setPatId] = useState('');
    const [prescriptions, setPrescriptions] = useState([]);
    
    useEffect(() => {
        async function fetchPrescriptions() {
            try {
                // Fetch prescriptions for the specific pat_id from Supabase
                const { data, error } = await supabase
                    .from('prescription')
                    .select('*')
                    .eq('pat_id', pat_id);

                if (error) {
                    throw error;
                }

                // Update state with fetched prescriptions
                setPrescriptions(data || []);
            } catch (error) {
                console.error('Error fetching prescriptions:', error.message);
            }
        }

        if (pat_id) {
            fetchPrescriptions();
        }
    }, [pat_id]); // Fetch prescriptions when pat_id changes

    const handleInputChange = (e) => {
        setPatId(e.target.value);
    };

    return (
        <div>
            <h2>Prescription List</h2>
            <label htmlFor="pat_id">Enter Patient ID:</label>
            <input 
                type="text" 
                id="pat_id" 
                name="pat_id" 
                value={pat_id} 
                onChange={handleInputChange} 
            />
            <ul>
                {prescriptions.map(prescription => (
                    <li key={prescription.pre_id}>
                        <strong>Medicine:</strong> {prescription.Medicine},  
                        <strong> Consumption:</strong> {prescription.Consumption}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Listprescription;
