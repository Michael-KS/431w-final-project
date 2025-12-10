import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


function UserLoginPage() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

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
        //alert(`Login attempt with Email: ${data.email}, Password: ${data.password}`);
        try{
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email: data.email,
                password: data.password
            });

            console.log('Login Success:', response.data.message);
            login(response.data.profile)
            navigate('/user-dashboard');

        } catch (err) {
            if (err.response && err.response.data){
                setError(err.response.data.error);
            }
            else {
                setError('an error yo');
            }
        }


        
       
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Please Login to Continue!</h1>
            {error && <p>{error}</p>}
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
                </div>
                <button type='submit'>Login</button>
        </form>
    );

}

export default UserLoginPage;

