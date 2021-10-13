
// Personal API Key for OpenWeatherMap API
const apiKey = '1ea33dd6a2c1ca2c61ddd61b2be7a895';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// select elements from DOM and put them into variables
const zipElem = document.getElementById('zip');
const feelingsElem = document.getElementById('feelings');
const dateElem = document.getElementById('date');
const tempElem = document.getElementById('temp');
const contentElem = document.getElementById('content');
const buttonElem = document.getElementById('generate');

// Event listener to add function to existing HTML DOM element
buttonElem.addEventListener('click', generate);


/* Function called by event listener */
function generate (){
    const zipValue = zipElem.value;
    const feelingsValue = feelingsElem.value;
    getWeather(baseUrl, zipValue, apiKey)
    .then((weatherData) => {
        postData('/postdata', {
            temperature : weatherData.main.temp,
            date :newDate,
            feelings : feelingsValue
        });
        addInfo();

    });

}
//get data from api -----------------------------
async function getWeather(baseUrl, zipValue, apiKey) {
    
    try{
        const res = await fetch(baseUrl+zipValue+'&appid='+apiKey);
        const data = await res.json();
        return data;
    }
    catch(error){
        alert("wrong zip");
        console.log("error", error);
    }
}

//post data to server ------------------------
async function postData (url='', data={}) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      return response.json(); // parses JSON response into native JavaScript objects
    }
//update UI ------------------------------
async function addInfo () {
    const res = await fetch ('all');
    try {
        const resJson = await res.json();
        tempElem.innerHTML = `temperature is: ${resJson.temperature}`;
        dateElem.innerHTML = `date is : ${resJson.date}`;
        contentElem.innerHTML = `I feel  ${resJson.feelings}`;
    }
    catch(error) {
        console.log("error", error)
    }
}



