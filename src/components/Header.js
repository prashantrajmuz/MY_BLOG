import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom';
import { authActions } from '../store';

const Header = () => {
    const dispatch = useDispatch();
const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const [value, setValue] = useState();
  return (
    <AppBar 
        position="sticky"  
    sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(112,112,233,1) 35%, rgba(0,212,255,1) 100%)"}}>
        <Toolbar>
            <Typography varient="h4">
               BlogsApp 
            </Typography>
           { isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
                <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                    <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                </Tabs>   
            </Box>}
            
            <Box display="flex" marginLeft="auto">
              { !isLoggedIn && (
                <>
                {" "}
                 <Button LinkComponent={Link} 
                 to="/auth" 
                 variant="contained" 
                 sx={{margin:1,borderRadius:10}} 
                 color="warning"
                 >
                 LOGIN or SIGNUP
                 </Button>
              
                </>
                )}
               { isLoggedIn && (
                <Button 
                onClick= {() => dispatch(authActions.logout())}
                LinkComponent={Link} 
                to="/auth" 
                variant="contained" 
                sx={{margin:1,borderRadius:10}} 
                color="warning"
                >
                Logout
                </Button> 
           ) }
            </Box>
        </Toolbar>
      
    </AppBar>
   
  );
  
};

export default Header;