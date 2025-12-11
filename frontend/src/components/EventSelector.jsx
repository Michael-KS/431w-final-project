import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";


function EventSelector({ value, onChange }) {
    const {user} = useAuth();
    const [events, setevents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchevents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/get_events_by_host`, {   
                params: {
                host_email: user.Email 
                }
          });
                if (response.data && Array.isArray(response.data)) {
                    setevents(response.data);
                } else if (response.data && response.data.events) {
                    setevents(response.data.events);
                } else {
                    console.warn("Received data is not in a recognized format:", response.data);
                }
            } catch (err) {
                setError('Failed to load events.');
                console.error("Error fetching events:", err);
            } 
        };

        fetchevents();
    }, []); 

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <select
            id='event-select'
            name="event" 
            value={value}
            onChange={onChange}
        >
            <option value="" disabled>--Please Choose an Event--</option>
            {events.map((event) => (
                <option key={event.e_id} value={event.e_id}>
                    {event.Date}
                </option>
            ))}
        </select>
    );
}

export default EventSelector;