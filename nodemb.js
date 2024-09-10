const http = require('http');
const fs = require('fs'); // Require the 'fs' module to read files
const path = require('path'); // Module to handle file paths
const PORT = 4000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Define the path to the HTML file
  const filePath = path.join(__dirname, 'microblogging.html');

  // Read the HTML file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Handle errors (e.g., file not found)
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
    } else {
      // Send the HTML file content with the correct header
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data); // Send the file content
    }
  });
});

// Start listening on the specified port
server.listen(PORT, (err) => {
  if (err) {
    console.error('Error occurred:', err);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
