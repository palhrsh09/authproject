import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
         console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
         console.log(error.message,"Error connecting to MongoDB")
          process.exit(1)  
    }
}