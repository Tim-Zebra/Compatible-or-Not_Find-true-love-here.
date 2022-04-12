// Global variables for API pull
var loveAPIObject = null;
var dateAPIObject = null;
var weatherAPIObject = null;

// Get love compatibility API
// example pull https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John'
const loveAPIObject = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
		'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
	}
};

fetch('https://love-calculator.p.rapidapi.com/getPercentage?', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

// Joke API
// example pull https://www.boredapi.com/api/activity
const dateAPIObject = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'https://www.boredapi.com/api/activity',
		'X-RapidAPI-Key': ''
	}
};

fetch('https://www.boredapi.com/api/activity', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



