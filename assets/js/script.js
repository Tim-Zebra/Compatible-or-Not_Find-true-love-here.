// Global variables for API pull
var loveAPIObject = null;
var jokeAPIObject = null;
var weatherAPIObject = null;

// Get love compatibility API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
		'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
	}
};

fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


