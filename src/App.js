import Header from "./components/Header";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";





function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  },[dispatch])
  return <React.Fragment>
    <header>
      <Header />
     
    </header>
    <main>
        <Routes>
         { !isLoggedIn ? <Route path="/auth" element={<Auth />}/> :
         <>
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/myBlogs" element={<UserBlogs />}/>
          <Route path="/myBlogs/:id" element={<BlogDetails />}/>
          <Route path="/blogs/add" element={<AddBlog />}/>{" "}
          </>
          }
        </Routes>
    </main>
  </React.Fragment>;
    
}

export default App;
