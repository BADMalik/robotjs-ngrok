var robot = require("robotjs");
const path = require('path');

const express = require('express')
const app = express();
var cors = require('cors')
app.use(cors({origin: 'http://localhost:3000'}));
// Speed up the mouse.
// var http = require('http');

// http.createServer(function (req, res) {
// }).listen(8080);


app.get('/', (req, res) => {
    // console.log('aa');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.send('aaa')
//     robot.setMouseDelay(3);
// // // // var twoPI = Math.PI * 2.0;   
//     var screenSize = robot.getScreenSize();
//     var height = (screenSize.height);
//     var width = screenSize.width;
// //     var x = 10000;
    // robot.moveMouse(width/2,height);
    // robot.moveMouseSmooth(width/2.5,( height/2.5),.001);
    // robot.mouseClick();
    // robot.moveMouseSmooth(width/1.6,( height/1.5),.001);
    // robot.mouseClick();
    res.send(true)
    return 0;
    //     res.send('')
    // res.send('hello world')
});
  app.listen(3000, function() {
    console.log("server start at port 3000"); // The server object listens on port 3000
});

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});