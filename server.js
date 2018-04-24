const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const port = 3110;
var cors = require('cors');
//routes
var index = require('./routes/index');
var appointments = require('./routes/appointments');
//
const app = express();
app.use(cors({origin: 'http://localhost:4200'}));
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

app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

// app.use(cors());
// app.use('/api/appointemnts', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//set port
//const port = process.env.PORT || '3001';

//app.set('port', port);

//const server = http.createServer(app);

//server.listen(port, () => console.log('Running on localhost:${port}'));

app.listen(port, function() {
    console.log('Server started on port ' + port);
});