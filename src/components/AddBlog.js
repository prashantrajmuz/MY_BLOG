import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const labelStyles = {mb:1,mt:2,fontSize:"15px",fontWeight:"bold"}
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputS, setinputS] = useState({
    title:"",
    description:"",
    image:""
  });
 
 const handleChange=(e)=>{
  setinputS((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value,
}));
 };
 const sendRequest = async()=>{
  const res = await axios.post("http://localhost:5000/api/blog/add",{
    title:inputS.title,
    description:inputS.description,
    image:inputS.image,
    user:localStorage.getItem("userId"),
  }).catch((err)=>console.log(err));
  const data = await res.data;
  return data;
};
 const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(inputS);
  sendRequest().then((data)=>console.log(data)).then(()=>navigate("/blogs"));
 }
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        width={"50%"}
        >
          <Typography fontWeight={"bold"} 
          padding={3} 
          color="grey" 
          variant="h2"
           textAlign={"center"}
           >
           Post Your Blog
           </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField 
          required
          name="title"
           onChange={handleChange} 
           value={inputS.title} 
           margin="auto" 
           variant="outlined" 
           />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField 
          noWrap={false}
          paragraph={true}
          required
          name="description" 
          onChange={handleChange} 
          value={inputS.description} 
          margin="auto" 
          variant="outlined"/>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField 
         
          required
          name="image" 
          onChange={handleChange} 
          value={inputS.image}  
          margin="auto" 
          variant="outlined"/>
          <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning"  type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog;