import React, {useState} from "react";
import axios from "axios";
import './UserDashboard.css'
import { useAuth } from "../context/AuthContext";

const ProfileTabContent = () =>{
    const {user} = useAuth();
    const [data, setData] = useState({
        username: '',
        password: '',
        location: '',
        gender: '',
    });
    const [error, setError] = useState('');
    

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

            console.log('Update Success:', response.data.message);

        } catch (err) {
            setError('you inputed an invalid entry');
        } 
    };
        return (
            <form onSubmit={handleSubmit}>
            <h2>Update Your Profile?</h2>
            {error && <p>{error}</p>}
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

        console.log("Just before API call, user object is:", user);
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

const ActivitiesTabContent = () =>(
    <div>
        <h3>Activities</h3>
    </div>
)

const EventTabContent = () => (
    <div>
        <h3>Events</h3>
    </div>
)

const ReviewTabContent = () => (
    <div>
        <h3>Reviews</h3>
    </div>
)

const TopTenTabContent = () => (
    <div>
        <h3>Top10</h3>
    </div>
)

function UserDashboard() {
    const [activeTab, setActiveTab] = useState('profile')

    const renderTabContent = () => {
        if(activeTab === 'activities'){
            return <ActivitiesTabContent/>;
        } else if(activeTab === 'events'){
            return <EventTabContent/>;
        } else if(activeTab === 'reviews'){
            return <ReviewTabContent/>;
        } else if(activeTab === 'top'){
            return <TopTenTabContent/>;
        } else if(activeTab === 'getprofile'){
            return <GetProfileTabContent/>;
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
                className={activeTab === 'activities' ? 'active' : ''}
                onClick={() => setActiveTab('activities')}
                >Activities</button>
                <button
                className={activeTab === 'events' ? 'active' : ''}
                onClick={() => setActiveTab('events')}
                >Events</button>
                <button
                className={activeTab === 'reviews' ? 'active' : ''}
                onClick={() => setActiveTab('reviews')}
                >Reviews</button>
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