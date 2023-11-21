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
        <textarea
          type="text"
          name="question"
          placeholder="Question Name"
          value={formData.question}
          onChange={handleInputChange}
        />
        <textarea
          type="text"
          name="bio"
          placeholder="Question Bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
        <textarea
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <input
          type="checkbox"
          name="tweetboolean"
          checked={formData.tweetboolean}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tweetURL"
          placeholder="Tweet URL"
          value={formData.tweetURL}
          onChange={handleInputChange}
        />
        <input
          type="checkbox"
          name="contentboolean"
          checked={formData.contentboolean}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contentURL"
          placeholder="Other Content  URL"
          value={formData.contentURL}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="left"
          placeholder="left tag"
          value={formData.left}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="mid"
          placeholder="mid tag"
          value={formData.mid}
          onChange={handleInputChange}
        />        <input
        type="text"
        name="right"
        placeholder="right tag"
        value={formData.right}
        onChange={handleInputChange}
      />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Admin;
