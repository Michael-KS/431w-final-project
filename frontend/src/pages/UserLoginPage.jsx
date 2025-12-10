import React, {useState} from "react";


function UserLoginPage() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Login attempt with Email: ${data.email}, Password: ${data.password}`);
        setData({
            email: '',
            password: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Please Login to Continue!</h1>
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

