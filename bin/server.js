const http = require('http');

const config = require('../config/config');

// Import Express app object
const app = require('../app');

// Set port of the app
var port = config.port;
app.set('port', port);
// Creating http server using the Express app as a requests handler
const server = http.createServer(app);

// Running the server and start listening to requests
server.listen(port);
