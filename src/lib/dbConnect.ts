import mongoose from "mongoose"

export const connectDB =async () =>{
    if(mongoose.connection.readyState >= 1){
        return;
    }
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
          }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection successful")
    }catch(error){
        console.log("connection to db failed",error)
        throw new Error("Failed to connect to db");
    }
}