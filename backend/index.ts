import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todo';
import userRouter from './routes/user';

dotenv.config();

const app = express();
const port = Number(process.env.PORT);
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
