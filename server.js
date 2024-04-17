const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_SERVICE_URL = process.env.API_SERVICE_URL;

// Middleware for checking the Authorization header
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Assumes the format is "Bearer token"
        // Verify the token against the expected API key
        if (token === process.env.API_KEY) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized access: Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized access: No credentials sent' });
    }
}

// Proxy endpoint configuration
const proxyOptions = {
    target: API_SERVICE_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        [`^/api`]: '',
    },
    onProxyReq: (proxyReq, req, res) => {
        // Set a new authorization header for the outgoing request to the API
        proxyReq.setHeader('Authorization', `Bearer ${process.env.NEW_API_AUTH_TOKEN}`);
    }
};

// Use the authentication middleware
app.use(authMiddleware);

// Use the configured proxy middleware
app.use('/api', createProxyMiddleware(proxyOptions));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
