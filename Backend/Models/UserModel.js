import { Schema,model } from "mongoose";
//create a user Schema with validation
//name email,dob,mobile number
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:[true,"Email already Exists"]
    },
    dateOfBirth:{
        type:Date,
        required:[true,"Date of Birth is Required"]
    },
    
        mobileNumber:{
            type:Number
        },
        //for soft delete
        status:{
            type:Boolean,
            default:true
        }
    
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
})
//create a user model for User Schema
export const UserModel=model("user",userSchema);