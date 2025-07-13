const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

app.use(cors());

app.use(express.json()); // add this at top

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});

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
    try {      
        
  const saltRound=10;
 const hashedPassword = await bcrypt.hash(password, saltRound);
    
  
        const newUser= new Userinfo({
    name:name,
    email:email,
    password:hashedPassword,
})

const savedUser= await newUser.save();


        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (err) {
        res.status(500).json({ message: "Error saving user", error: err });
    }


});


app.post("/login",async (req,res)=>{

    try{
    const {email,password}=req.body;
    console.log(email,password);

// check email 
const user= await Userinfo.findOne({email});    

if(!user){
    return res.status(401).json({message:"User not found"});
}
// check password
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(401).json({message:"Invalid password"});
}
res.status(200).json({message:"Login Successful", user:user.email});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Login error",error:error});
    }
})


