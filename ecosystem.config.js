/**
 * PM2 ecosystem file
 *  pm2 start ecosystem.config.js          # start all
 *  pm2 stop  ecosystem.config.js --only backend,frontend
 *  pm2 logs                               # live logs
 */
module.exports = {
    apps: [
        /* ─────────────  BACKEND (Express)  ───────────── */
        {
            name: 'backend',          // pm2 name → pm2 logs backend
            cwd: './backend',         // <root>/backend
            script: 'npm',
            args: 'start', 
            interpreter: 'node',      // allow ES-modules (.mjs)
            watch: ['src'],           // hot reload on changes (dev only)
        },

        /* ─────────────  FRONTEND (Vite)  ───────────── */
        {
            name: 'frontend',
            cwd: './frontend',        // <root>/frontend
            script: 'npm',
            args: 'run dev',          // change to 'run preview' after build
            interpreter: 'none',      // run plain shell command
            watch: false,             // Vite handles HMR itself
        },
    ]
};