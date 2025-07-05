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
        const user = new Userinfo({ name, email, password });
        
  const saltRound=10;
 const hashedPassword = await bcrypt.hash(password, saltRound);

  

  
       
  
        const user1=new Userinfo({
    name:name,
    email:email,
    password:hashedPassword,
})
const savedUser= await user1.save();


        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (err) {
        res.status(500).json({ message: "Error saving user", error: err });
    }


});



