// src/components/Dashboard.jsx
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import postService from "../../services/postService";

const Dashboard = ({ user }) => {
 const [allpost,setallpost] =  useState([])

 useEffect(() => {
  
    const fetchposts = async ({user}) => {
      try {
        const userData = await postService.allposts({user});
        setallpost(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchposts({user});
  
}, []);

    return (
      <main>
        <h1>Welcome,{user.username}</h1>
        <h2>Posts</h2>
        <Link to='/addPost'>Add new post</Link>
        {allpost?.map((post) => {
        return  <div key={post._id}>
            <h2>{post.content}</h2>
            
          </div>
       } )}
      </main>
    );
  };
  
  export default Dashboard;