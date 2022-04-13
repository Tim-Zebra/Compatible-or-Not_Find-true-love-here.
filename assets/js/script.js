// Global variables for API pull
var loveAPIObject = "";
var dateAPIObject = "";
var weatherAPIObject = "";
var ActivityApi = "";

// Get love compatibility API
// example pull https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John'
// const loveAPI = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
// 	}
// };

// fetch('https://love-calculator.p.rapidapi.com/getPercentage?', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// Joke API
// example pull https://www.boredapi.com/api/activity
const dateAPI = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'https://www.boredapi.com/api/activity',
		'X-RapidAPI-Key': ''
	}
};

fetch('https://www.boredapi.com/api/activity', optionsLove)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

// Bored Api Random Activity Generator 
// example pull https://rapidapi.com/dannyboy96s/api/random-activity-generator/
	Activity();
	function Activity() {
		const optionsActivityApi = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': 'random-activity-generator.p.rapidapi.com',
				'X-RapidAPI-Key': 'fbd5c241ffmsh7b20ec77aee88dfp1bd3f2jsncc309ee32ffd'
			}
		};
		
		fetch('https://random-activity-generator.p.rapidapi.com/v1/random-activity', optionsActivityApi)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));
	}

console.log

