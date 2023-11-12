import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { connectDB } from './src/db.js';
import authRoutes from './src/routes/auth/index.js';
import assessmentAdminRoutes from './src/routes/assesment/admin/index.js';
import assessmentUserRoutes from './src/routes/assesment/index.js';

import authMiddleware from './src/middlewares/auth.js';

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