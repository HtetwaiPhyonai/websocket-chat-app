<template>
    <nav class="navbar">
      <div class="navbar-left">
        <span class="app-name">ChatApp</span>
      </div>
      <div class="navbar-right">
        <img class="avatar" src="" alt="User" />
        <!-- Optionally, add a dropdown for profile/logout -->
      </div>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    height: 64px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .app-name {
    color: #2563eb;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #22d3ee;
  }
  </style>