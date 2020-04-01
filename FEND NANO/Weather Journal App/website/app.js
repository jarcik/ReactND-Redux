//base url for weather website
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//api key from weather website
const apiKey = '&appid=3705546a600014b8521e0328f44e6494';


/* Declaring functions */

//fetch data from weather api
const getWeather = async (baseURL, zipCode, key) => {
    //fetch data
    const res = await fetch(baseURL + zipCode + key)
    try {
        //get data from json
        const data = await res.json();
        if(data.cod == 404) throw(data.message);
        console.log(data)
        //return recieved data
        return data;
    } catch (error) {
        //deal with the error
        console.log('getWeather error: ', error);
        errorHandling(`There was and error: ${error}`)
    }
}

//post recieved and user data to server
const postData = async (url = '', data = {}) => {
    //body of the response
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)   
    });

    try {
        //wait for data from server
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('postData error: ', error);
        errorHandling('There was and error. Please, try it again.');
    }
}

//get current date for the server daata
const getCurrentDate = () => {
    let d = new Date();
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}

//click generate event
const clickGenerate = e => {
    //entered zipcode
    const zipCode = document.getElementById('zip').value;
    //entered feelings
    const feeling = document.getElementById('feelings').value;
    //hide potencially visible error block
    hideErrorMessage();

    if(!zipCode || !feeling) {
        errorHandling('ZipCode and Your feelings are important. Please fill it, thank you.');
        return;
    }

    //get weather
    getWeather(baseURL, zipCode, apiKey)
        //post data to server
        .then(function (data) {
            console.log(data);
            postData('/addProjectData', { temperature: data.main.temp, date: getCurrentDate(), feelings: feeling });
        })
        //update ui
        .then(updateUI)
}

//update IU based on recieved data
const updateUI = async () => {
    //request to server for user data input
    const request = await fetch('/weatherData');
    try {
        //wait for all data from server
        const allData = await request.json();
        //fill the UI with user data
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('content').innerHTML = `How do you feel? ${allData.feelings}`;

    } catch (error) {
        console.log('update UI error: ', error);
        errorHandling('There was and error. Please, try it again.');
    }
}   

//error handling
const errorHandling = errorMessage => {
    let errorElement = document.getElementById('errorMessage');
    errorElement.innerHTML = errorMessage;
    errorElement.style.display = 'block';
}

//hide potencially visible error message
const hideErrorMessage = () => {    
    let errorElement = document.getElementById('errorMessage');
    errorElement.innerHTML = '';
    errorElement.style.display = 'none';
}

//set event listener for click on generate button
document.getElementById('generate').addEventListener('click', clickGenerate);