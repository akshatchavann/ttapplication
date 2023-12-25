import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserSignup.css";


const UserSignup = () => {
    const [userdata, setuserdata] = useState({firstname: '', lastname: '', email:'',phoneNumber:0,password:'',confirmPassword:"",admin: false})
    const [error, setError] = useState(null);
    console.log(userdata)
    
    function handlechange(event) {
      const { name, value } = event.target;
      setuserdata(prevUserData => {
          return {
              ...prevUserData,
              [name]: value
          };
      });
    }
    
    async function handleSubmit(event){
        try{
            event.preventDefault()
            const dataToSend = {
              ...userdata,
              email: userdata.email.toLowerCase(),
          };

          if (userdata.password !== userdata.confirmPassword) {
            alert('Passwords do not match');
            setError('Passwords do not match');
            return;
          }

            console.log("submitted")
            console.log(userdata)
            const response = await fetch('https://ttapplication-backend.vercel.app/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message)
                setError(errorData.message);
              } else {
                console.log('Signup successful');
                window.location.href = '/UserLogin';
              }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    }
    console.log(userdata)
    return (
        <div>
        <div className='container'>
          <div className="form-container">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className='fieldContainer'>
              <label>
                First Name:
                <input onChange={handlechange} name="firstname" value={userdata.firstname} className='firstitem' type="text" required/>
              </label>
            </div>
            <div className='fieldContainer'>
              <label>
                Last Name:
                <input onChange={handlechange} name="lastname" value={userdata.lastname} className='lastname' type="text" required/>
              </label>
            </div>
            <div className='fieldContainer'>
              <label>
                Email:
                <input onChange={handlechange} name="email" value={userdata.email} className='email' type="text" required/>
              </label>
            </div>
            <div className='fieldContainerLong'>
              <label>
                Phone Number:
                <input onChange={handlechange} name="phoneNumber" value={userdata.phoneNumber === 0 ? '' : userdata.phoneNumber} className='email' type="number" inputMode="numeric" required/>
              </label>
            </div>
            <div className='fieldContainerLong'>
              <label>
                Password:
                <input onChange={handlechange} name="password" value={userdata.password} className='password' type="text" required/>
              </label>
            </div>
            <div className='fieldContainerLong'>
              <label>
                Confirm Password:
                <input onChange={handlechange} name="confirmPassword" value={userdata.confirmPassword} className='confirmPassword' type="text" required/>
              </label>
            </div>
          <div className="signupFlex">
            <button className="btn btn-primary mt-10" type="submit" >Create Account</button>
          </div>
          </form>
        </div>
        <div className='mt-1'>
              <p className='login'>Already a user? <Link to={"/UserLogin"}><strong className='login'>Login here</strong></Link></p>
          </div>
        </div>
        </div>
      )
}


export default UserSignup;
