// Global variables for API pull
var loveAPIObject = ''
var dateAPIObject = ''
var weatherAPIObject = ''

// Get love compatibility API
// example pull https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John'
 compatibilityForm
// Returns both names, a percentage, and some...comment
// const optionsLove = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
// 	}
// };

// fetch('https://love-calculator.p.rapidapi.com/getPercentage?', optionsLove)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// // Joke API
// // example pull https://www.boredapi.com/api/activity
// const optionsBored = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'https://www.boredapi.com/api/activity',
// 		'X-RapidAPI-Key': ''
// 	}
// };

// fetch('https://www.boredapi.com/api/activity', optionsBored)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Form Submission//////////////////////////////////////
// Sets variable for Form Submissions
var compatibilityFormEl = $('#compatibilityForm');
var firstNameEl = $('#firstName');
var secondNameEl = $('#secondName');
var compatibilitySectionEl = $('#compatibilitySection');


// API result placeholder
var fetchedScore = 36;
// Gets input from user
function getUserInput (event) {
    event.preventDefault();
	// defined variables
    var obj = {};
    var firstName = '';
	var secondName = '';

    // Catches if no names are input. If no names, then do nothing
    if ((firstNameEl.val() !== '') && (secondNameEl.val() !== '')) {
        // Stores user search as an object
        var firstName = firstNameEl.val().toLowerCase();
        var secondName= secondNameEl.val().toLowerCase();

        // Capitalizes first letter of name
		firstName = capitalizeFirstLetter(firstName);
		secondName = capitalizeFirstLetter(secondName);
    }
    firstNameEl.val('');
    secondNameEl.val('');

    obj.name1 = firstName;
    obj.name2 = secondName;

    return obj;
}

// Takes in a single string of letters
function capitalizeFirstLetter (word) {
	var newWord = '';
	var arr = word.split('');

	arr[0] = arr[0].toUpperCase();
	newWord = arr.join('');

	return newWord;
}

// Returns compatibility as an object with both names and a score
function createCompatibilityObj (nameOne, name2, score)

// Listens for the form submit button to be pressed
compatibilityFormEl.on('submit', getUserInput);

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