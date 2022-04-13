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

// Listens for the form submit button to be pressed
compatibilityFormEl.on('submit', getNamesInput);
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

function getJoke () {
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

console.log(searchCriteria);

    // Prevents error if someone doesn't check any boxes
    if (searchCriteria === '') {
        searchCriteria = 'any';
    }


    // // fetch from API
	// const jokeAPI = {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-RapidAPI-Host': 'https://v2.jokeapi.dev/',
	// 		'X-RapidAPI-Key': ''
	// 	}
	// };

	// fetch('https://v2.jokeapi.dev/joke/' + searchCriteria + '?blacklistFlags=nsfw,religious,political,racist,sexist,explicit', jokeAPI)
	// 	.then(response => response.json())
	// 	.then(response => console.log(response))
	// 	.then(function (data) {
	// 		jokeAPIObject = data;
	// 		console.log(jokeAPIObject);
	// 	})
	// 	.catch(err => console.error(err));
	// 	jokeSectionJokeEl.value
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
  