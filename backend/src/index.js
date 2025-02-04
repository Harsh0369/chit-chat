import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connect} from './lib/db.js'

dotenv.config();



const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use("/api/users",messageRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
    });