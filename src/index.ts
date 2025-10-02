import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import redisTestRouter from './routes/redisTest';
import chatRouter from './routes/chat';
import restaurantCrudRouter from './routes/restaurantCrud';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(redisTestRouter);
app.use(chatRouter);
app.use(restaurantCrudRouter);

app.get('/', (req, res) => res.send('🚀 Restaurant AI API is running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
