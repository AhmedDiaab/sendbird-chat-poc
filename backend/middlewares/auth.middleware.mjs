const API_KEY = process.env.API_KEY || 'super-secret-demo-key';

export default function withAuth(req, res, next) {
    const token = req.header('x-api-key');
    if (token !== API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}
