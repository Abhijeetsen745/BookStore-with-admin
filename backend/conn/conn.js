import mongoose from "mongoose";
import 'dotenv/config'

const conn = async () => {
    try {
        await mongoose.connect(process.env.URI);
        console.log("database connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

export default conn;