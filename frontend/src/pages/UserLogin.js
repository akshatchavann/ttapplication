import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserLogin.css";
import { useEffect } from 'react';


const UserLogin = () => {
    const [userdata, setuserdata] = useState({email:'',password:''})
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    function handlechange(event) {
        const { name, value } = event.target;
        setuserdata(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            };
        });
      }
    
    console.log(userdata)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const dataToSend = {
                ...userdata,
                email: userdata.email.toLowerCase(),
            };
    
            const loginResponse = await fetch('https://ttapplication-backend.vercel.app/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (!loginResponse.ok) {
                const errorData = await loginResponse.json();
                alert(errorData.message);
                setError(errorData.message);
                return;
            }
            console.log('Login successful');
    
            const email = userdata.email.toLowerCase();
            const idResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/getUserId/${email}`);
            if (!idResponse.ok) {
                throw new Error('Failed to fetch user ID');
            }
            const data = await idResponse.json();
            console.log(data.userId);
    
            // Redirect to the DailyQuestion page with the fetched user ID
            window.location.href = `/DailyQuestion/${data.userId}`;
        } catch (error) {
            alert(error.message);
            setError(error.message);
        }
    };
    
    console.log(userdata)

    return (
        <div>
        <div className='signin-page'>
        <div className='signin-container'>
        <h1 id="title">Sign In</h1>
        <div className="anotherWrapper">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="Signin">
                    <div className='fieldContainerLong'>
                        <label>
                            Email:
                            <input onChange={handlechange} name="email" value={userdata.email} className='email' type="text" required/>
                        </label>
                    </div>
                    <div className='fieldContainerLong'>
                        <label>
                            Password:
                            <input onChange={handlechange} name="password" value={userdata.password} className='password' type="text" required/>
                        </label>
                    </div>
                </div>
            
            <div className="wrapperSignIn">
                <button className="btn btn-primary mt-10" type="submit">Submit</button>
            </div>
            <Link className="create-account-link" to={"/UserSignup"}><strong>Create Account</strong></Link>
        </form>
        </div>
        </div>
    </div>
    </div>
    </div>
    );
}


export default UserLogin;
