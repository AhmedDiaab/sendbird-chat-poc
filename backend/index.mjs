import dotenv from 'dotenv';
import express from 'express';

import usersRouter from './routes/user.routes.mjs';
import chRouter from './routes/channel.routes.mjs';
import authRouter from './routes/auth.routes.mjs';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRouter);     // public
app.use('/users', usersRouter);   // protected by x-api-key
app.use('/channels', chRouter);   // protected by x-api-key

// Basic error handler
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API ready on :${PORT}`));
