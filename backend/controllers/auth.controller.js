import  {User} from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"

export const signup = async (req, res) => {
   const { email, name, password } = req.body;
 
   try {
     if (!email || !password || !name) {
       throw new Error("All Fields are required");
     }
 
     const userExist = await User.findOne({ email });
     if (userExist) {
       return res.status(400).json({ success: false, message: "User Already exists" });
     }
 
     const hashedPassword = await bcrypt.hash(password, 10);
     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
 
     const user = new User({
       email,
       password: hashedPassword,
       name,
       verificationToken,
       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
     });
 
     await user.save();
 
     generateTokenAndSetCookie(res, user._id);
 
     res.status(201).json({
       success: true,
       message: "User Created Successfully",
       user: {
         ...user._doc,
         password: undefined,
       },
     });
 
   } catch (error) {
      console.log(error,"error coming ")
     res.status(400).json({ success: false, message: error.message });
   }
 };
 

export const login = async (req,res) => {
    res.send("singmnuo route")
}

export const logout = async (req,res) => {
    res.send("singmnuo route")
}
