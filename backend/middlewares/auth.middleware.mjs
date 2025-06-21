import dotenv from 'dotenv';
dotenv.config();



export default function withAuth(req, res, next) {
    const API_KEY = process.env.API_KEY || 'super-secret-demo-key';
    const token = req.header('x-api-key');
    if (token !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}
