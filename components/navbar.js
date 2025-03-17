"use client";

import { useState } from 'react'
import styles from '../styles/navbar.module.css'



export default function Navbar() {
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
        <img src="/notification-bell.jpg" alt="Notifications" className={styles.notificationBell} />
        <img src="/profile-placeholder.jpg" alt="Profile" className={styles.profilePic} />
      </div>
      </nav>
    );
  }