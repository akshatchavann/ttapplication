import React, { useState } from 'react';

const Admin = () => {
  const [formData, setFormData] = useState({ question: '', bio:'', category: '', tweetURL: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          placeholder="Question"
          value={formData.question}
          onChange={handleInputChange}
        />
        <textarea
          type="text"
          name="bio"
          placeholder="Bio for question"
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
          type="text"
          name="tweetURL"
          placeholder="Tweet URL"
          value={formData.tweetURL}
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
