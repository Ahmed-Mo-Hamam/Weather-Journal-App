// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const Cors = require('cors');

// Start up an instance of app
const app = express();
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(Cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port,() => {
    console.log(`the Node server is running on port ${port}`);
});
// do get and post routes 
app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/postdata', (req, res) => {
    projectData = {
        temperature : req.body.temperature,
        date : req.body.date,
        feelings : req.body.feelings
    };
    console.log(projectData);
    res.send(projectData);
});
