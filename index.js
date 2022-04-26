
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import verificationRoutes from './routes/verificationRoutes.js';
import conectarDB from './config/db.js';

const app = express();
const port = 3000;

dotenv.config();

conectarDB()

app.use(express.json());
app.use(cors());

app.use('/api/verification', verificationRoutes)



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

