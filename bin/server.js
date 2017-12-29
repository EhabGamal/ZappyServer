const http = require('http');

// Import Express app object
const app = require('../app');

// Set port of the app
app.set('port', 3000);
// Creating http server using the Express app as a requests handler
const server = http.createServer(app);

// Running the server and start listening to requests
server.listen(3000);
