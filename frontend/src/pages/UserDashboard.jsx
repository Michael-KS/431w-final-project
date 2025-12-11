import React, {useState} from "react";
import axios from "axios";
import './UserDashboard.css'
import { useAuth } from "../context/AuthContext";
import ActivitySelector from "../components/ActivitySelector";
import EventSelector from "../components/EventSelector";

const ProfileTabContent = () =>{
    const {user} = useAuth();
    const [data, setData] = useState({
        username: '',
        password: '',
        location: '',
        gender: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const {name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const response = await axios.put('http://127.0.0.1:5000/update_profile', {
                email: user.Email,
                username: data.username,
                password: data.password,
                location: data.location,
                gender: data.gender
            });

            setSuccess('Update Successful!');

        } catch (err) {
            setError('you inputed an invalid entry');
        } 
    };
        return (
            <form onSubmit={handleSubmit}>
            <h2>Update Your Profile?</h2>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <div>
            <label htmlFor="username" style={{display: "block"}}>Username</label>
            <input
                type = 'text'
                id='username'
                name='username'
                value = {data.username}
                onChange = {handleChange}
                placeholder="username"
                required
                />
            <label htmlFor="password" style={{display:'block'}}>Password</label>
            <input 
                type='password'
                id='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder="password"
                required
                />
            <label htmlFor="location" style={{display:'block'}}>Location</label>
            <input 
                type='text'
                id='location'
                name='location'
                value={data.location}
                onChange={handleChange}
                placeholder="location"
                required
                />
            <label htmlFor="gender" style={{display:'block'}}>Gender</label>
            <input 
                type='text'
                id='gender'
                name='gender'
                value={data.gender}
                onChange={handleChange}
                placeholder="gender"
                required
                />
                </div>
                    {error && <p>{error}</p>}
                <button type='submit'>Submit</button>
        </form>
        );
};

const GetProfileTabContent = () => {
    const {user} = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState('');

    const handleClick = async () => {

        setError('');
        setProfileData(null);

        try {
            const response = await axios.get(`http://127.0.0.1:5000/get_profile`, {   
                params: {
                email: user.Email 
                }
          });
          
          if (response.data.status === 'success') {
            setProfileData(response.data.profile); 
          }
   
        } catch (err) {
          if (err.response && err.response.data) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred while fetching the profile.");
          }
    }
    };
    return (
        <div>
            <h4>Click the button!</h4>
            <button onClick={handleClick}>View My Profile</button>
            {profileData && (<div>
                <h4>Profile Details:</h4>
                <p><strong>Username:</strong> {profileData.Username}</p>
                <p><strong>Password:</strong> {profileData.Password}</p>
                <p><strong>Location:</strong> {profileData.Location}</p>
                <p><strong>Gender:</strong> {profileData.Gender}</p>
                </div>
            )}
        </div>
    );
};

const ViewEventsTabContent = () =>{
    const {user} = useAuth();
    const [eventData, seteventData] = useState(null);
    const [error, setError] = useState('');

    const handleClick = async () => {

        setError('');
        seteventData(null);

        try {
            const response = await axios.get(`http://127.0.0.1:5000/get_events_by_host`, {   
                params: {
                host_email: user.Email 
                }
          });
          
          if (response.data.status === 'success') {
            seteventData(response.data.events); 
          }
   
        } catch (err) {
          if (err.response && err.response.data) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred while fetching the events.");
          }
    }
    };
    return (
        <div>
            <h4>Click the button!</h4>
            <button onClick={handleClick}>View Events Hosted By Me</button>
            {eventData && (
                eventData.map((event,index) => (
                    <div>
                    <p><strong>----Event ID:</strong> {event.e_id}<strong>----</strong></p>   
                    <p><strong>Date:</strong> {event.Date}</p>
                    <p><strong>Status:</strong> {event.Status}</p>
                    <p><strong>Activity:</strong> {event.Title}</p>
                    <p><strong>Location:</strong> {event.Location}</p>  
                    </div>
                ))
            )}
            

        </div>
    );
}

const EventTabContent = () => {
    const {user} = useAuth();
    const [data, setData] = useState({
        date: '',
        status: '',
        activity: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const {name, value } = e.target;
        console.log(`Input changed! Name: "${name}", Captured Value: "${value}", Type of Value: ${typeof value}`);
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const response = await axios.post('http://127.0.0.1:5000/add_event', {
                host_email: user.Email,
                date: data.date,
                status: data.status,
                act_id: data.activity
            });

            console.log('Update Success:', response.data.message);
            setSuccess("Event Added!");

        } catch (err) {
            setError('you inputed an invalid entry');
        }   
    };

    return (
        <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <div>
            <h3>Create an Event</h3>
            <div>
                <label htmlFor="date" style={{display: "block"}}>Date</label>
                <input
                    type = 'text'
                    id='date'
                    name='date'
                    value = {data.date}
                    onChange = {handleChange}
                    placeholder="date"
                    required
                    />
                <label htmlFor="status" style={{display: "block"}}>Status</label>
                <input
                    type = 'text'
                    id='status'
                    name='status'
                    value = {data.status}
                    onChange = {handleChange}
                    placeholder="status"
                    required
                    />
                <h4>Choose Activity:</h4>
                <label htmlFor="activity-select">Activity</label>
                <ActivitySelector
                    value={data.activity}
                    onChange={handleChange}/>
            </div>

        </div>

        <button type="submit">Create Event</button>
        </form>
    );
};

const ReviewTabContent = () => {
    const {user} = useAuth();
    const [data, setData] = useState({
        star_level: '',
        description: '',
        event: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const {name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const response = await axios.post('http://127.0.0.1:5000/add_review', {
                author_email: user.Email,
                star_level: data.star_level,
                description: data.description,
                e_id: data.event
            });

            console.log('Update Success:', response.data.message);
            setSuccess("Review Added!");

        } catch (err) {
            setError('you inputed an invalid entry');
        }   
    };

    return (
        <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <div>
            <h3>Create a Review</h3>
            <div>
                <label htmlFor="star_level" style={{display: "block"}}>star_level</label>
                <input
                    type = 'text'
                    id='star_level'
                    name='star_level'
                    value = {data.star_level}
                    onChange = {handleChange}
                    placeholder="star_level"
                    required
                    />
                <label htmlFor="description" style={{display: "block"}}>description</label>
                <input
                    type = 'text'
                    id='description'
                    name='description'
                    value = {data.description}
                    onChange = {handleChange}
                    placeholder="description"
                    required
                    />
                <h4>Choose Event:</h4>
                <label htmlFor="event-select">Event</label>
                <EventSelector
                    value={data.event}
                    onChange={handleChange}/>
            </div>

        </div>

        <button type="submit">Create Review</button>
        </form>
    );
}


const ViewReviewsTabContent = () => {
    const [data, setData] = useState({
        event: ''
    });
    const [reviewData, setReviewData] = useState(null);

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClick = async () => {

        setError('');
        setReviewData(null);

        try {
            const response = await axios.get(`http://127.0.0.1:5000/get_reviews_by_event`, {   
                params: {
                e_id: data.event
                }
          });
          
          if (response.data.status === 'success') {
            setReviewData(response.data.reviews); 
          }
   
        } catch (err) {
          if (err.response && err.response.data) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred");
          }
    }
    };

    return (
        <div>
            <h4>Choose Event:</h4>
                <label htmlFor="event-select">Event</label>
                <EventSelector
                    value={data.event}
                    onChange={handleChange}/>
                <p></p>
            <button onClick={handleClick}>View Reviews</button>
            {error && <p>{error}</p>}
            {reviewData && (
                reviewData.map((reviewData,index) => (
                    <div>
                    <p><strong>----Review ID:</strong> {reviewData.rev_id}<strong>----</strong></p>   
                    <p><strong>Author Email:</strong> {reviewData.Author_email}</p>
                    <p><strong>Star Level:</strong> {reviewData.star_level}</p>
                    <p><strong>Description:</strong> {reviewData.Description}</p>  
                    </div>
                ))
            )}

        </div>
    );
}

const TopTenTabContent = () => {
    const [eventData, seteventData] = useState(null);
    const [error, setError] = useState('');

    const handleClick = async () => {

        setError('');
        seteventData(null);

        try {
            const response = await axios.get(`http://127.0.0.1:5000/get_top_ten`, {   
          });
          
          if (response.data.status === 'success') {
            seteventData(response.data.outings); 
          }
   
        } catch (err) {
          if (err.response && err.response.data) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred while fetching the top ten.");
          }
    }
    };
    return (
        <div>
            <h4>Click the button!</h4>
            <button onClick={handleClick}>View Top 10</button>
            {eventData && (
                eventData.map((event,index) => (
                    <div>
                    <p><strong>----Act ID:</strong> {event.act_id}<strong>----</strong></p>   
                    <p><strong>Title:</strong> {event.title}</p>
                    <p><strong>Price:</strong> {event.price}</p>
                    <p><strong>Duration:</strong> {event.duration}</p>
                    <p><strong>Location:</strong> {event.location_name}</p>  
                    <p><strong>Event Count:</strong> {event.event_count}</p>  
                    <p><strong>Avg Rating:</strong> {event.avg_rating}</p>  
                    <p><strong>Review Count:</strong> {event.review_count}</p>  
                    </div>
                ))
            )}
            

        </div>
    );
}

function UserDashboard() {
    const [activeTab, setActiveTab] = useState('profile')

    const renderTabContent = () => {
        if(activeTab === 'viewevents'){
            return <ViewEventsTabContent/>;
        } else if(activeTab === 'events'){
            return <EventTabContent/>;
        } else if(activeTab === 'reviews'){
            return <ReviewTabContent/>;
        } else if(activeTab === 'top'){
            return <TopTenTabContent/>;
        } else if(activeTab === 'getprofile'){
            return <GetProfileTabContent/>;
        } else if(activeTab === 'viewreviews'){
            return <ViewReviewsTabContent/>;
        }
        return <ProfileTabContent/>;

    };

    return (
        <div className="tabs">
            <h1>User Dashboard</h1>

            <div className="tab-nav">
                <button
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
                >Update Profile</button>
                <button
                className={activeTab === 'getprofile' ? 'active' : ''}
                onClick={() => setActiveTab('getprofile')}
                >View Profile</button>
                <button
                className={activeTab === 'events' ? 'active' : ''}
                onClick={() => setActiveTab('events')}
                >Create Event</button>
                <button
                className={activeTab === 'viewevents' ? 'active' : ''}
                onClick={() => setActiveTab('viewevents')}
                >View Events</button>
                <button
                className={activeTab === 'reviews' ? 'active' : ''}
                onClick={() => setActiveTab('reviews')}
                >Reviews</button>
                <button
                className={activeTab === 'viewreviews' ? 'active' : ''}
                onClick={() => setActiveTab('viewreviews')}
                >View Reviews</button>
                <button
                className={activeTab === 'top' ? 'active' : ''}
                onClick={() => setActiveTab('top')}
                >Top10</button>
                </div>
                <div className="tab-content">
                    {renderTabContent()}</div></div>
    );
}

export default UserDashboard;