import express from 'express';
import 'dotenv/config';
import { connectToDB } from "./config/database.js";
import bodyParser from 'body-parser';
import formRoutes from './routes/formRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

//connect to database
connectToDB();

// applying middlewares
app.use(bodyParser.json()); //  middleware to parse body data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);    // allowing all origins to access the server

// form route import
app.use('/api/form', formRoutes);

// default route
app.use('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is up and running..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
