const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const port = 3110;
//routes
var index = require('./routes/index');
var appointments = require('./routes/appointments');
//
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//static folders
app.use(express.static(path.join(__dirname, 'client')));
//api
//const api = require('./server/routes/api');
//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//dist
app.use(express.static(path.join(__dirname, 'dist')));
//api 
app.use('/api', index);
app.use('/api', appointments)
//app.use('/api', api);
//send all req to angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
//set port
//const port = process.env.PORT || '3001';

//app.set('port', port);

//const server = http.createServer(app);

//server.listen(port, () => console.log('Running on localhost:${port}'));

app.listen(port, function() {
    console.log('Server started on port ' + port);
});