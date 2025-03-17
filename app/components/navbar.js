// app/navbar.js

"use client";  // This is required for client-side logic

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  // Next.js useRouter hook
import { getAuthToken, clearAuthToken } from '../../utils/auth';  // Auth helpers
import styles from '../../styles/navbar.module.css';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();  // Use useRouter from the App Router for navigation

  // Check authentication status on component mount
  useEffect(() => {
    const token = getAuthToken();  // Your token could be from cookies or localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    clearAuthToken();  // Clear the auth token
    setIsAuthenticated(false);  // Update state
    router.push('/signin');  // Redirect to the sign-in page
  };

  const handleSignIn = () => {
    router.push('/signin');  // Redirect to sign-in page
  };

  // Navigate to the admin add account page when the notification bell is clicked
  const handleNotificationClick = () => {
    router.push('/admin/createUser');  // Navigate to the admin add account page
  };

  return (
    <nav className={styles.navbar}>
      {/* Left: Company Logo */}
      <div className={styles.left}>
        <img src="/Logo-Ashunya.png" alt="Company Logo" className={styles.logo} />
      </div>

      {/* Middle: Search Bar */}
      <div className={styles.middle}>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
      </div>

      {/* Right: Notification Bell & Profile Picture */}
      <div className={styles.right}>
        {/* Click the notification bell to go to the admin add account page */}
        <img 
          src="/notification-bell.jpg" 
          alt="Notifications" 
          className={styles.notificationBell} 
          onClick={handleNotificationClick}  // Navigate to the admin add account page
        />

        {isAuthenticated ? (
          <div>
            <img
              src="/signed-in-user.png"  // Replace with the actual user's profile picture
              alt="User Profile"
              className={styles.profilePic}
              onClick={handleSignOut}  // Sign out on click
            />
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div>
            <img
              src="/signed-out-user.png"  // Placeholder image when not signed in
              alt="Sign In"
              className={styles.profilePic}
              onClick={handleSignIn}  // Redirect to sign-in
            />
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        )}
      </div>
    </nav>
  );
}
