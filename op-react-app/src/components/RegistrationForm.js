// src/components/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import Popup from './Popup';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    balance: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable for popup message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend API
      const response = await axios.post('http://localhost:5000/api/register', formData); // Replace with your backend API URL
      console.log('User registration successful:', response.data); 
        setIsSubmitted(true);
      // Optionally, you can redirect to a success page or display a success message here
    } catch (error) {
      console.error('Error registering user:', error);
      // Optionally, you can show an error message to the user here
    }
  };
    const handleClosePopup = () => {
    setIsSubmitted(false);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="balance">e₹ Balance</label>
          <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
        {isSubmitted && <Popup/>}
    </div>
  );
};

export default RegistrationForm;

