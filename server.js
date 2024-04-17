const express = require("express");
const dotenv = require("dotenv");
const httpProxy = require("http-proxy");
dotenv.config();

// Create Express Server
const app = express();
const server = require("http").createServer(app);

// Environment Variables
const PORT = process.env.PORT || 8080;
const API_SERVICE_URL = process.env.API_SERVICE_URL;

// Proxy Server Options
const options = {
   target: API_SERVICE_URL,
   changeOrigin: true,
   ws: true,
   pathRewrite: {
      [`^/graphql`]: "",
   },
   onProxyReq: (proxyReq, req, res) => {
      // Set a new authorization header for the outgoing request to the API
      proxyReq.setHeader("Authorization", `Bearer ${process.env.INKEEP_API_KEY}`);
   },
};

const proxy = httpProxy.createProxyServer(options);

// Handle all requests
app.all("/*", (req, res) => {
 console.log("Request ALL");
 proxy.web(req, res);
});

// Handle WebSocket upgrade requests
server.on("upgrade", (req, socket, head) => {
 console.log("connecting");
 proxy.ws(req, socket, head);
});

// Start the server
server.listen(PORT, () => {
 console.log(`Starting proxy server at:${PORT}`);
});
