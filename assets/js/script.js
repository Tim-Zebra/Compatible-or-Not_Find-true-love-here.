// Global variables for API pull
var loveAPIObject = ''
var dateAPIObject = ''
var jokeAPIObject = '';

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Form Submission//////////////////////////////////////
// Sets variable for Form Submissions
var compatibilityFormEl = $('#compatibilityForm');
var firstNameEl = $('#firstName');
var secondNameEl = $('#secondName');
var compatibilitySectionEl = $('#compatibilitySection');
var jokeCheckBoxSubmitEl = $('#jokeCheckBoxSubmit');

// API result placeholder
var fetchedScore = 36;
// Gets input from user
function getNamesInput (event) {
    event.preventDefault();
	// defined variables
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

        // Send Results to HTML
        var pEl = $("<p>" + fetchedScore + "<p>");

        compatibilitySectionEl.append(pEl);
    }
    firstNameEl.val('');
    secondNameEl.val('');

	console.log(firstName, "\n", secondName);

    // This gets the info from the checkboxes.
    getCheckBoxInfo();
}

function getJokeCriteriaInput () {
    // Assigns variables for categories of jokes
    var jokeProgrammingBoxCheck = document.getElementById('jokeProgrammingBox').checked;
    var jokeMiscBoxCheck = document.getElementById('jokeMiscBox').checked;
    var jokeDarkBoxCheck = document.getElementById('jokeDarkBox').checked;
    var jokePunBoxCheck = document.getElementById('jokePunBox').checked;
    var jokeSpookyBoxCheck = document.getElementById('jokeSpookyBox').checked;
    var jokeChristmasBoxCheck = document.getElementById('jokeChristmasBox').checked;

    var arrayBoxes = [jokeProgrammingBoxCheck, jokeMiscBoxCheck, jokeDarkBoxCheck, jokePunBoxCheck, jokeSpookyBoxCheck, jokeChristmasBoxCheck]
    var storedObject = {};
    
    // Checks if checked or not and creates an object
    for (var k = 0; k < arrayBoxes.length; k++) {
        var string = arrayBoxes[k];
        // if (arrayBoxes[k].checked === true) {
        //     storedObject.arrayBoxes[k] = true;
        // }
        // else {
        //     storedObject.arrayBoxes[k] = false;
        // }
        console.log(string);
        console.log(typeof string);
    }

    console.log (storedObject);



}

// Takes in a single string of letters
function capitalizeFirstLetter (word) {
	var newWord = '';
	var arr = word.split('');

	arr[0] = arr[0].toUpperCase();
	newWord = arr.join('');

	return newWord;
}

// Listens for the form submit button to be pressed
compatibilityFormEl.on('submit', getNamesInput);
// Listens for button submit on checkboxes
jokeCheckBoxSubmitEl.on('click', getJokeCriteriaInput);


// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\API FETCHING/////////////////////////////////////////
// // Love Compatability API
getLove();
function getLove () {
    const optionsLove = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
            'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
        }
    };
    fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=Alice&fname=John', optionsLove)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

// Activity API
// example pull https://www.boredapi.com/api/activity
// const dateAPI = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'https://www.boredapi.com/api/activity',
// 		'X-RapidAPI-Key': ''
// 	}
// };

// fetch('https://www.boredapi.com/api/activity')
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.then(function (response){
// 		dateAPIObject = response;
// 		console.log(dateAPIObject);
// 	})
// 	.catch(err => console.error(err));

// Joke API function
getJoke();
function getJoke () {
	var jokeSectionJokeEl = $('#jokeSectionJoke');
	
	const jokeAPI = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'https://v2.jokeapi.dev/',
			'X-RapidAPI-Key': ''
		}
	};

	fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', jokeAPI)
		.then(response => response.json())
		.then(response => console.log(response))
		.then(function (data) {
			jokeAPIObject = data;
			console.log(jokeAPIObject);
		})
		.catch(err => console.error(err));
		jokeSectionJokeEl.value
}
// Get Input from HTML check boxes


// progress bar
function updateProgressBar(progressBar, value) {
	progressBar.querySelector(".progress-fill").style.width = `${value}%`;
	progressBar.querySelector(".progress-text").textContent = `${value}%`;
}
  
  const myProgressBar = document.querySelector(".progress");
  // test, need to pass love value to replace 55
  updateProgressBar(myProgressBar, 55);
  