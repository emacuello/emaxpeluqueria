import express from 'express';
import morgan from 'morgan';
import router from './routes/indexRouter';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { SECRET_KEY } from './config/envs';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: SECRET_KEY!,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.use(router);
