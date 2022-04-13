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

// Listens for the form submit button to be pressed
compatibilityFormEl.on('submit', getNamesInput);

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Joke Section//////////////////////////////////////////////////
// Gets check box results and returns an object. Key = name of box: Value = boolean
function getJokeCriteriaInput () {
    // Assigns variables for categories of jokes
    var jokeProgrammingBoxCheckEl = document.getElementById('jokeProgrammingBox');
    var jokeMiscBoxCheckEl = document.getElementById('jokeMiscBox');
    var jokeDarkBoxCheckEl = document.getElementById('jokeDarkBox');
    var jokePunBoxCheckEl = document.getElementById('jokePunBox');
    var jokeSpookyBoxCheckEl = document.getElementById('jokeSpookyBox');
    var jokeChristmasBoxCheckEl = document.getElementById('jokeChristmasBox');

    var arrayBoxes = [jokeProgrammingBoxCheckEl, jokeMiscBoxCheckEl, jokeDarkBoxCheckEl, jokePunBoxCheckEl, jokeSpookyBoxCheckEl, jokeChristmasBoxCheckEl];
    var storedObject = {};
    
    // Checks if checked or not and creates an object
    for (var k = 0; k < arrayBoxes.length; k++) {
        var name = arrayBoxes[k].name;
        if (arrayBoxes[k].checked === true) {
            storedObject[name] = true;
        }
        else {
            storedObject[name] = false;
        }
    }
    return storedObject;
}

// Takes in a single string of letters
function capitalizeFirstLetter (word) {
	var newWord = '';
	var arr = word.split('');

	arr[0] = arr[0].toUpperCase();
	newWord = arr.join('');

	return newWord;
}

// Gets joke criteria, gets joke fetch, displays joke
async function getJoke () {
	var jokeSectionJokeEl = $('#jokeSectionJoke');
	var searchCriteria = '';

    // gets joke parameters
    var checkedOptions = getJokeCriteriaInput ();
    var objKeys = Object.keys(checkedOptions);
    
    // checks is any parameters were selected, if not then just searches all ('any')
    for (var i = 0; i < objKeys.length; i++) {
        if (checkedOptions[objKeys[i]] === true) {
            searchCriteria += objKeys[i] + ',';
        }
    }

    // Removes last ',' from string
    searchCriteria = searchCriteria.slice(0, -1);    

    // Prevents error if someone doesn't check any boxes
    if (searchCriteria === '') {
        searchCriteria = 'any';
    }

    // Creates option to display one and two part jokes
    // fetch from API
    var onePartJoke = await fetchJoke (searchCriteria, '&type=single');
    var twoPartJoke = await fetchJoke (searchCriteria, '&type=twopart');

    console.log(onePartJoke);
    console.log(twoPartJoke);

    // Sets Joke Variables
    onePartJoke = onePartJoke.joke;
    twoPartJokeSetup = twoPartJoke.setup;
    twoPartJokeDelivery = twoPartJoke.delivery;

    // displays joke
    displayJoke (onePartJoke, twoPartJokeSetup, twoPartJokeDelivery);
}

function displayJoke(onePart, twoPartSet, twoPartDel) {
    
}

// Listens for button submit on checkboxes
jokeCheckBoxSubmitEl.on('click', getJoke);


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
// https://v2.jokeapi.dev/



async function fetchJoke (criteria, parts) {
	var fetchedObj = {};

    const jokeAPI = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'https://v2.jokeapi.dev/',
			'X-RapidAPI-Key': ''
		}
	};

	await fetch('https://v2.jokeapi.dev/joke/' + criteria + '?blacklistFlags=nsfw,religious,political,racist,sexist,explicit' + parts, jokeAPI)
		.then(response => response.json())
		.then(function (data) {
            fetchedObj = data;
		})
		.catch(err => console.error(err));

    return fetchedObj;
}


// progress bar
function updateProgressBar(progressBar, value) {
	progressBar.querySelector(".progress-fill").style.width = `${value}%`;
	progressBar.querySelector(".progress-text").textContent = `${value}%`;
}
  
  const myProgressBar = document.querySelector(".progress");
  // test, need to pass love value to replace 55
  updateProgressBar(myProgressBar, 55);
  