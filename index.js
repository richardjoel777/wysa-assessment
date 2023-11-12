import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { connectDB } from './db.js';
import authRoutes from './routes/auth/index.js';
import assessmentAdminRoutes from './routes/assesment/admin/index.js';
import assessmentUserRoutes from './routes/assesment/index.js';

import authMiddleware from './middlewares/auth.js';

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/assessment/admin/questions', authMiddleware, assessmentAdminRoutes);
app.use('/assessment/', assessmentUserRoutes);


app.listen(5000, () => console.log('Server is running on port 5000'));