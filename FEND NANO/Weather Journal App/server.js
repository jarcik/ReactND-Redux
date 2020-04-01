//Setup empty JS object to act as endpoint for all routes
projectData = {};

//Express to run server and routes
const express = require('express');
//start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
//Cors for cross origin allowance
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//use cors
app.use(cors());

//init the main project folder
app.use(express.static('website'));

/* setup server */
//port
const port = 3000;
//server instance
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

//GET request returns the project data
app.get('/weatherData', getProjectData);
//POST request add incoming data
app.post('/addProjectData', storeProjectData);

//get project data from server
function getProjectData (req, res) {
    res.send(JSON.stringify(projectData));
}

//store project data to server
function storeProjectData(req, res) {    
    let data = {
        temperature: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings
    };
    projectData = data;
}