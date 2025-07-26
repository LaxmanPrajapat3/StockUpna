require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');

const JWT_SECRET=process.env.Secret_Key
app.use(cors(
    {
        origin: 'http://localhost:5173',  //frontend origin
        credentials:true // to allow cookies

}));
// middlewars 
app.use(express.json()); // add this at top
app.use(cookieParser());

function authenticateToken(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, JWT_SECRET, (err,user)=>{
        if(err){
            return res.sendStatus(403);
            
        }
        req.user=user;
            next();
    })
}


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});

// MongoDB connection
async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/Stockupna');

}

main().then(() => {
    console.log("Connection is Successful");
}).catch((err) => {
    console.log(err);
});

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const Userinfo=mongoose.model("Userinfo",userSchema);



//routes


app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    try {      
        const existing=await Userinfo.findOne({email});
        if(existing){
            return res.status(400).json({message:"Email already exists"});
        }


  const saltRound=10;
 const hashedPassword = await bcrypt.hash(password, saltRound);
    
  
        const newUser= new Userinfo({
    name:name,
    email:email,
    password:hashedPassword,
})

const savedUser= await newUser.save();


        res.status(201).json({ message: "User created successfully", user: savedUser.email });
    } catch (err) {
        res.status(500).json({ message: "Error saving user", error: err });
    }


});


app.post("/login",async (req,res)=>{
    const {email,password}=req.body;

    try{
   

// check email 
const user= await Userinfo.findOne({email});    

if(!user){
    return res.status(401).json({message:"User not found"});
}
// check password
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(401).json({message:"Invalid Credentials"});
}

// Generate token
const token= jwt.sign({id:user.id}, JWT_SECRET,{expiresIn:'12h'});

// Store token in http-only cokie
res.cookie("token",token,{
    httpOnly:true,
    secure:false,  // ! IMP Remenber for  me in Producation set IT true with https
    sameSite:'lax',
    maxAge:3600000*12 // 12 hour

});
res.status(200).json({message:"Login Successful", user:user.email});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Login error",error:error});
    }
})


// logout route

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message: "Logged out"});
});

app.get("/verify", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});