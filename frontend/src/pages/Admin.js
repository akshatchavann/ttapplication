import React, { useState } from 'react';

const Admin = () => {
  const [formData, setFormData] = useState({ question: '', category: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log("submitted");
      console.log(formData);
      const response = await fetch('http://localhost:3000/api/questions/create', {
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
        console.log('Signup successful');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>Admin goes here</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;
