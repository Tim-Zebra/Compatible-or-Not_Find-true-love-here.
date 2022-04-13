// Global variables for API pull
var loveAPIObject = ''
var dateAPIObject = ''
var weatherAPIObject = ''

// Get love compatibility API
// example pull https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John'
const loveAPI = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
		'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
	}
};

fetch('https://love-calculator.p.rapidapi.com/getPercentage?', loveAPI)
	.then(response => response.json())
	.then(response => console.log(response))
	.then(function (response){
		loveAPIObject = response;
		console.log(loveAPIInfo);
	})
	.catch(err => console.error(err));

// Joke API
// example pull https://www.boredapi.com/api/activity
const dateAPI = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'https://www.boredapi.com/api/activity',
		'X-RapidAPI-Key': ''
	}
};

fetch('https://www.boredapi.com/api/activity', dateAPI)
	.then(response => response.json())
	.then(response => console.log(response))
	.then(function (response){
		dateAPIObject = response;
		console.log(dateAPIObject);
	})
	.catch(err => console.error(err));

// progress bar
function updateProgressBar(progressBar, value) {
	progressBar.querySelector(".progress-fill").style.width = `${value}%`;
	progressBar.querySelector(".progress-text").textContent = `${value}%`;
  }
  
  const myProgressBar = document.querySelector(".progress");
  // test, need to pass love value to replace 55
  updateProgressBar(myProgressBar, 55);

document.getElementById('#btn').addEventListener(onclick, updateProgressBar);