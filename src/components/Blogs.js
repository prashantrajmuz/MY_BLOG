import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const sendRequest = async ()=>{
        const res = await axios.get(`http://localhost:5000/api/blog`).catch(err=>console.log(err));
        const data = await res.data;
        return data;
    }
    useEffect(()=>{
        sendRequest().then(data=>setBlogs(data.blogs));
    },[])
    console.log(blogs);
  return (
    <div>
        { blogs && blogs.map((blogs,index)=>(
            <Blog 
            id={blogs._id}
            isUser = {localStorage.getItem("userId")===blogs.user._id}
            title={blogs.title} 
            description={blogs.description} 
            imageURL={blogs.image} 
            userName={blogs.user.name} 
            />
        ))}
    </div>
  )
}

export default Blogs;