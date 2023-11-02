import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserLogin.css";


const UserLogin = () => {
    const [userdata, setuserdata] = useState({email:'',password:''})
    const [error, setError] = useState(null);

    function handlechange(event){
        const {name,value} = event.target 
        setuserdata(prevuserdat =>{
          return {
            ...prevuserdat,
            [name] : value
          }
        } )
      }
    
    console.log(userdata)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(userdata)
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userdata)
            })

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
              } else {
                console.log('Login successful');
                window.location.href = '/Content';
              }
        } catch (error) {
            console.log(error);
        }
    }

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
                <Link className="create-account-link" to={"/UserSignup"}><strong>Create Account</strong></Link>
            </div>
        </form>
        </div>
        </div>
    </div>
    </div>
    </div>
    );
}


export default UserLogin;