import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const labelStyles = {mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}
const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id =  useParams().id;
  const [inputS, setinputS] = useState({
    
  })
 
 const handleChange=(e)=>{
  setinputS((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
}))
 }
  const fetchDetails = async()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err));
    const data = res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setinputS({title:data.blog.title,description:data.blog.description,image:data.blog.image})
  });
  },[id]);
  const sendRequest = async()=>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputS.title,description:inputS.description
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log(inputS);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs"));
  }
  return (
    <div><form onSubmit={handleSubmit}>
    <Box
    border={3} 
    borderColor="green" 
    borderRadius={10} 
    boxShadow="10px 10px 20px #ccc" 
    padding={3} 
    margin={"auto"}
    marginTop={3} 
    display="flex" 
    flexDirection="column" 
    width={"60%"}
    >
      <Typography fontWeight={"bold"} padding={3} color="grey" variant="h2" textAlign={"center"}>Post Your Blog</Typography>
      <InputLabel sx={labelStyles}>Title</InputLabel>
      <TextField name="title" onChange={handleChange} value={inputS.title} margin="auto" variant="outlined" />
      <InputLabel sx={labelStyles}>Description</InputLabel>
      <TextField name="description" onChange={handleChange} value={inputS.description} margin="auto" variant="outlined"/>
      
      <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning"  type="submit">Submit</Button>
    </Box>
  </form></div>
  )
}

export default BlogDetails;