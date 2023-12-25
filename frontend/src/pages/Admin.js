import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [formData, setFormData] = useState({ question: '', bio:'', category: '', tweetboolean: false, tweetURL: '', contentboolean:false, contentURL:'', password: '' , left: '', right: '',mid: '', creator:""});
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};


  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== 'asdfAc12345') {
      setError('Invalid password');
      return;
    }
    try {
      console.log("submitted");
      console.log(formData);
      const response = await fetch('https://ttapplication-backend.vercel.app/api/questions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        console.log('Question submitted successfully');
        alert('Question submitted successfully')
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(formData);

  return (
    <div>
      <div>Admin can create questions here</div>
      <form onSubmit={handleSubmit}>
        <div className='fieldContainer'>
        <div className='formgroup'>
            <textarea
                className='textarea'
                name="creator"
                placeholder="Your Name"
                value={formData.creator}
                onChange={handleInputChange}
                style={{ height: "2em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                className='textarea'
                name="question"
                placeholder="Question"
                value={formData.question}
                onChange={handleInputChange}
                style={{ height: "10em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                className='textarea'
                name="bio"
                placeholder="~3 sentence description"
                value={formData.bio}
                onChange={handleInputChange}
                style={{ height: "10em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                name="category"
                placeholder="Category (e.g. Abortion, Israel-Palestine, Climate Change, etc.)"
                value={formData.category}
                onChange={handleInputChange}
            />
          </div>
          <div className='formgroup'>
            <label className='checkboxLabel'>
            Include Tweet URL
                <input
                    type="checkbox"
                    name="tweetboolean"
                    checked={formData.tweetboolean}
                    onChange={handleInputChange}
                />
                
            </label>
          </div>

          <div className='formgroup'>
            {(
                <input
                    className='inputField'
                    type="text"
                    name="tweetURL"
                    placeholder="Tweet URL"
                    value={formData.tweetURL}
                    onChange={handleInputChange}
                />
            )}
          </div>
          <div className='formgroup'>
            <label className='checkboxLabel'>
                Include Other Content URL:
                <input
                    type="checkbox"
                    name="contentboolean"
                    checked={formData.contentboolean}
                    onChange={handleInputChange}
                />
            </label>
          </div>
          <div className='formgroup'>
            { (
                <input
                    className='inputField'
                    type="text"
                    name="contentURL"
                    placeholder="Other Content URL"
                    value={formData.contentURL}
                    onChange={handleInputChange}
                />
            )}
            </div>
            <div className='formgroup'>
            <label className='form-label'>
                Left Tag:
                <input
                    className='inputField'
                    type="text"
                    name="left"
                    placeholder="Left Tag"
                    value={formData.left}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            <div className='formgroup'>
            <label className='form-label'>
                Mid Tag:
                <input
                    className='inputField'
                    type="text"
                    name="mid"
                    placeholder="Mid Tag"
                    value={formData.mid}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            
            <div className='formgroup'>
            <label className='form-label'>
                Right Tag:
                <input
                    className='inputField'
                    type="text"
                    name="right"
                    placeholder="Right Tag"
                    value={formData.right}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            <div className='formgroup'>
            <label className='form-label'>
                Password:
                <input
                    className='inputField'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            <button type="submit" className='submitButton'>Submit</button>
            <Link to={`/AdminPortal`}>
                <button>See all Questions</button>
            </Link>
            <Link to={`/AdminHome`}>
                <button>Back to Admin Home</button>
            </Link>
        </div>
    </form>

      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Admin;
