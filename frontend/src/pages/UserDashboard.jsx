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
            const response = await axios.post('http://127.0.0.1:5000/update_profile', {
                email: user.email,
                username: data.username,
                password: data.password,
                location: data.location,
                gender: data.gender
            });

            console.log('Update Success:', response.data.message);

        } catch (err) {
            if (err.response && err.response.data){
                setError(err.response.data.error);
            }
            else {
                setError('you inputed an invalid entry');
            }
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
                />
            <label htmlFor="password" style={{display:'block'}}>Password</label>
            <input 
                type='password'
                id='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder="password"
                />
            <label htmlFor="location" style={{display:'block'}}>Location</label>
            <input 
                type='text'
                id='location'
                name='location'
                value={data.location}
                onChange={handleChange}
                placeholder="location"
                />
            <label htmlFor="gender" style={{display:'block'}}>Gender</label>
            <input 
                type='text'
                id='gender'
                name='gender'
                value={data.gender}
                onChange={handleChange}
                placeholder="gender"
                />
                </div>
                <button type='submit'>Submit</button>
        </form>
        );
};

const GetProfileTabContent = () => {
    const {user} = useAuth();
    const [showInfo, setShowInfo] = useState(false);

    const handleClick = async () => {
        try {
        const response = await axios.get(`http://127.0.0.1:5000/api/profile`, {
            params: {
              email: user.email 
            }
          });
          
          if (response.data.status === 'success') {
            setProfileData(response.data.profile); // Store the fetched profile in our state
          }
   
        } catch (err) {
          if (err.response && err.response.data) {
            setError(err.response.data.message);
          } else {
            setError("An error occurred while fetching the profile.");
          }
    }
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