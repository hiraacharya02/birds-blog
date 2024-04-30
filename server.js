const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    let filePath = '';

    // Routing based on URL
    if (req.url === '/' || req.url === '/index.html') {
        filePath = 'index.html';
    } else if (req.url === '/about.html') {
        filePath = 'about.html';
    } else if (req.url === '/contact.html') {
        filePath = 'contact.html';
    } else if (req.url === '/styles.css') {
        filePath = 'styles.css';
    } else if (req.url.startsWith('/images/')) { // Handle image file request
        filePath = req.url.slice(1); // Remove the leading slash
    } else {
        // Handle 404 Not Found for other URLs
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        return;
    }

    // Read the file
    const fileExtension = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg'
    }[fileExtension] || 'text/plain';

    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            // Handle file read error
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Internal Server Error</h1>');
        } else {
            // Serve the file with appropriate content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log("Server running...");
});