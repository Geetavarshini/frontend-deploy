import exp from 'express'
import { UserModel } from '../Models/UserModel.js'
//create a mini-express app
 export const UserApp=exp.Router()
//user api routes

//create a user
UserApp.post('/users', async (req, res, next) => {
    try {
        console.log("Incoming user:", req.body);
        const newUser = new UserModel(req.body);
        let user = await newUser.save();
        res.status(201).json({ message: "User Created", payload: user });
    } catch (error) {
        // send the error directly to  middleware!
        next(error); 
    }
});

//read all users
UserApp.get('/users',async(req,res)=>{
    let allUsers=await UserModel.find()
    //send res
    res.status(200).json({message:"All Users",payload:allUsers})
})

//read a user by id
// get request handler route using id
UserApp.get('/users/:id',async(req,res)=>{
    //read id from url parameter
    let userId=req.params.id//params returns an obj
    console.log(userId)
    //read user by id
    let user= await UserModel.findById(userId);
    //send response 
    if(!user){
        return res.status(404).json({message:"User Not Found"});
    }
    res.status(200).json({message:'User',payload:user })
    

})

//delete a user by id
UserApp.delete('/users/:id',async(req,res)=>{
    //get user object id
    let userId=req.params.id;
    //update user in db
    let updatedUserDoc=await UserModel.findByIdAndUpdate(userId,{$set:{status:false}},{new:true});
    //send res
    if (!updatedUserDoc) {
            return res.status(404).json({message: "User Not Found"});
        }

    res.status(200).json({message:"Updated user",payload:updatedUserDoc});
})

//activate the user change the status to true
UserApp.patch("/users/:id",async(req,res)=>{
     //get user object id
    let userId=req.params.id;
    //update user in db
    let updatedUserDoc=await UserModel.findByIdAndUpdate(userId,{$set:{status:true}},{new:true});
    //send res
    if (!updatedUserDoc) {
            return res.status(404).json({message: "User Not Found"});
        }

    res.status(200).json({message:"Updated user",payload:updatedUserDoc});
})

//update a user by id
UserApp.put("/users/:id", async (req, res) => {
    try {
        let userId = req.params.id;

        let updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({
            message: "User Updated",
            payload: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});