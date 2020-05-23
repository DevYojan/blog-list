const config = require('./utils/config');
const http = require('http');
const app = require('./app');

require('dotenv').config();

app.listen(config.PORT, () => {
	console.log('App started at port 3000');
});
