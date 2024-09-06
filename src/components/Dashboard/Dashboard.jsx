// src/components/Dashboard.jsx

import { useState,useEffect } from "react";
import postService from "../../services/postService";

const Dashboard = ({ user }) => {
 const [allpost,setallpost] =  useState([])

 useEffect(() => {
  if (user && user._id) {
    const fetchposts = async () => {
      try {
        const userData = await postService.allposts();
        setallpost(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchposts();
  }
}, [user]);

    return (
      <main>
        <h1>Welcome, {user.username}</h1>
        {allpost.map((post) => (
          <div key={post._id}>
            <h3>{post.content}</h3>
            <p></p>
          </div>
        ))}
      </main>
    );
  };
  
  export default Dashboard;