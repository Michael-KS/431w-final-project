import React, {useState} from "react";
import axios from "axios";
import './UserDashboard.css'

const ProfileTabContent = () =>{
    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',
        location: '',
        gender: ''
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
            const response = await axios.post('http://127.0.0.1:5000/register', {
                email: data.email,
                username: data.username,
                password: data.password,
                location: data.location,
                gender: data.gender
            });

            console.log('Registration Success:', response.data.message);
            setSuccess("Profile Added!");
            setData({
                email: '', username: '', password: '', location: '', gender: ''
            });
        } catch (err) {
            setError('you inputed an invalid entry');
        }   
    };

    return (
        <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <div>
            <h3>Register A New Profile</h3>
            <div>
                <label htmlFor="email" style={{display: "block"}}>Email</label>
                <input
                    type = 'text'
                    id='email'
                    name='email'
                    value = {data.email}
                    onChange = {handleChange}
                    placeholder="email"
                    required
                    />
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
                <label htmlFor="password" style={{display: "block"}}>Password</label>
                <input
                    type = 'text'
                    id='password'
                    name='password'
                    value = {data.password}
                    onChange = {handleChange}
                    placeholder="password"
                    required
                    />
                <label htmlFor="location" style={{display: "block"}}>Location</label>
                <input
                    type = 'text'
                    id='location'
                    name='location'
                    value = {data.location}
                    onChange = {handleChange}
                    placeholder="location"
                    required
                    />
                <label htmlFor="gender" style={{display: "block"}}>Gender</label>
                <input
                    type = 'text'
                    id='gender'
                    name='gender'
                    value = {data.gender}
                    onChange = {handleChange}
                    placeholder="gender"
                    required
                    />   
            </div>

        </div>

        <button type="submit">Register Profile</button>
        </form>
    );
}


const DeleteProfileTabContent = () =>{
     const [data, setData] = useState({
        email: '',
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

        if(!data.email){
            setError("Please Enter An Email");
            return;
        }

        try{
            const response = await axios.delete('http://127.0.0.1:5000/delete_profile', {
                params: {
                email: data.email
                }
            });

            console.log('Registration Success:', response.data.message);
            setSuccess("Profile Deleted!");
            setData({
                email: ''
            });
        } catch (err) {
            setError('That email does not exist');
        }   
    };

    return (
        <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <div>
            <h3>Delete An Profile</h3>
            <div>
                <label htmlFor="email" style={{display: "block"}}>Email</label>
                <input
                    type = 'text'
                    id='email'
                    name='email'
                    value = {data.email}
                    onChange = {handleChange}
                    placeholder="email"
                    required
                    />
            </div>

        </div>

        <button type="submit">Delete Profile</button>
        </form>
    );
};







function AdminLandingPage() {
    const [activeTab, setActiveTab] = useState('profile')

    const renderTabContent = () => {
        if(activeTab === 'deleteprofile'){
            return <DeleteProfileTabContent/>;
        } 
        return <ProfileTabContent/>;

    };

    return (
        <div className="tabs">
            <h1>Admin Landing Page</h1>

            <div className="tab-nav">
                <button
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
                >Create Profile</button>
                <button
                className={activeTab === 'deleteprofile' ? 'active' : ''}
                onClick={() => setActiveTab('deleteprofile')}
                >Delete Profile</button>
                </div>
                <div className="tab-content">
                    {renderTabContent()}</div></div>
    );
}

export default AdminLandingPage;