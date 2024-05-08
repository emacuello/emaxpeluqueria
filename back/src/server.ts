import express from 'express';
import morgan from 'morgan';
import router from './routes/indexRouter';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(router);
