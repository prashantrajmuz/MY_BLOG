import User from "../models/User.js";
import bcrypt from 'bcryptjs';
export const getAllUsers = async(req,res,next)=>{
    let users;
    try {
       users = await User.find(); 
    } catch (err) {
      return  console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "User not found."});
    }
    return res.status(200).json({users});
};

export const signup = async (req,res,next)=>{
    const {name,email,password} = req.body;


    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }
    if(existingUser){
        return res.status(400).json({message: "User already exists! Login Instead"});
    }
    const hashedpassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password:hashedpassword,
        blogs:[],
    });
     
    


    try {
       await user.save();
    } catch (error) {
      return  console.log(error);
    }
    return res.status(201).json({user})
};

export const login = async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({message: "User Not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
    return res.status(400).json({message: "Password incorrect"});
    }
    return res.status(200).json({message: "Login Successful",user: existingUser});
}