import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URL = process.env.MONGODB_URL;
export const connectToDB = () => {
    mongoose.connect(DB_URL)
        .then(() => {
            console.log("Connection to database successful.");
        })
        .catch((error) => {
            console.log("Error occured while connecting to Database.");
            console.log(error);
            process.exit(1);
        })
}