import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component is controlled by its parent via the `value` and `onChange` props.
function ActivitySelector({ value, onChange }) {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Ensure this is the correct URL for your endpoint that returns the list of all activities
                const response = await axios.get('http://127.0.0.1:5000/get_all_activities');

                // This logic handles cases where the backend returns the array directly
                // or inside another object property.
                if (response.data && Array.isArray(response.data)) {
                    setActivities(response.data);
                } else if (response.data && response.data.activities) {
                    setActivities(response.data.activities);
                } else {
                    console.warn("Received data is not in a recognized format:", response.data);
                }
            } catch (err) {
                setError('Failed to load activities.');
                console.error("Error fetching activities:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
    }, []); // The empty array [] ensures this runs only once.

    if (isLoading) return <p>Loading activities...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <select
            id='activity-select'
            name="activity" // This name must match the key in the parent component's state
            value={value}
            onChange={onChange}
        >
            <option value="" disabled>--Please Choose an Activity--</option>
            {activities.map((activity) => (
                // This is the most critical line.
                // The 'value' is explicitly set to the numeric act_id.
                // The text displayed to the user is the Title.
                <option key={activity.Act_id} value={activity.Act_id}>
                    {activity.Title}
                </option>
            ))}
        </select>
    );
}

export default ActivitySelector;