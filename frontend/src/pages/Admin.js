import React, { useState } from 'react';

const Admin = () => {
  const [formData, setFormData] = useState({ question: '', bio:'', category: '', tweetboolean: false, tweetURL: '', contentboolean:false, contentURL:'', password: '' , left: '', right: '',mid: ''});
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
      <div>Admin goes here</div>
      <form onSubmit={handleSubmit}>
        <div className='fieldContainer'>

          <div className='formgroup'>
            <textarea
                className='textarea'
                name="question"
                placeholder="Question Name"
                value={formData.question}
                onChange={handleInputChange}
                style={{ height: "10em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                className='textarea'
                name="bio"
                placeholder="Question Bio"
                value={formData.bio}
                onChange={handleInputChange}
                style={{ height: "10em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                name="category"
                placeholder="Category"
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
        </div>
    </form>

      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Admin;
