// app/admin/createUser/page.js

"use client";

import { useState } from 'react';

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('USER'); // Default role is 'USER'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    const res = await fetch('/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // If using authentication
      },
      body: JSON.stringify({ email, password, name, role }),
    });

    const data = await res.json();

    if (res.status === 201) {
      setSuccessMessage('User created successfully!');
      setError('');
    } else {
      setError(data.message || 'An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Create New User</h1>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
