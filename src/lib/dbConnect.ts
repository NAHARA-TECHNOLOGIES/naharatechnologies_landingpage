// import mongoose from "mongoose"

// export const connectDB =async () =>{
//     if(mongoose.connection.readyState >= 1){
//         return;
//     }
//     try{
//         if (!process.env.MONGO_URI) {
//             throw new Error("MONGO_URI is not defined");
//           }
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("connection successful")
//     }catch(error){
//         console.log("connection to db failed",error)
//         throw new Error("Failed to connect to db");
//     }
// }
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO_URI environment variable.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s timeout
      connectTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected successfully");

  } catch (error: any) {
    console.error("MongoDB Connection Error:");

    // DNS / Network Issues
    if (error.message.includes("getaddrinfo") || error.message.includes("ENOTFOUND")) {
      console.error("• Cause: Cannot resolve MongoDB host (DNS issue or no internet).");
      console.error("• Fix: Check your internet or 0.0.0.0/0 IP whitelist in MongoDB Atlas.");
    }

    // Authentication Issues
    if (error.message.includes("Authentication failed")) {
      console.error("• Cause: Invalid username or password in connection string.");
      console.error("• Fix: Verify MongoDB credentials in Atlas.");
    }

    // Timeout Issues
    if (error.message.includes("timed out")) {
      console.error("• Cause: Connection timed out, likely network/firewall blocking.");
      console.error("• Fix: Allow access in MongoDB Network Access or switch to Google DNS (8.8.8.8).");
    }

    // Invalid Connection String / SRV Lookup Issues
    if (error.message.includes("SRV") || error.message.includes("URI")) {
      console.error("• Cause: Incorrect MongoDB connection string format.");
      console.error("• Fix: Ensure URI follows: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/dbname");
    }

    // Fallback for unknown errors
    console.error("• Raw Error:", error.message);

    throw new Error("Failed to connect to database.");
  }
};
