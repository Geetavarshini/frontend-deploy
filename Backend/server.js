import exp from 'express'
import { UserApp } from './APIS/UserAPI.js'
import { connect } from 'mongoose'
import {config} from 'dotenv'
import cors from 'cors'
//read env variable
config();
console.log("DB URL Check:", process.env.DB_URL);
//create HTTp server
const app=exp()

//add cors
app.use(cors({origin:['http://localhost:5173',"https://use-management-app-nine.vercel.app/add-user"],credentials:true}))

//Add body Parser middleware
app.use(exp.json())

//forward res to UserApi if Path starts with/user-api
app.use('/user-api',UserApp)

//connect to database

async function connectDb() {
    try {
        if (!process.env.DB_URL) {
            throw new Error("DB_URL is missing from .env file");
        }
        await connect(process.env.DB_URL);
        console.log("Connected To database");
        
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (err) {
        console.error("Database Connection Error Detail:", err.message); // This will tell you exactly WHY it failed
    }
}
connectDb()
//add error handling middleware

app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});