// Global variables for API pull
var loveAPIObject = {};
var dateAPIObject = {};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Form Submission//////////////////////////////////////
// Sets variable for Form Submissions
var compatibilityFormEl = $('#compatibilityForm');
var firstNameEl = $('#firstName');
var secondNameEl = $('#secondName');
var compatibilitySectionEl = $('#compatibilitySection');
var jokeCheckBoxSubmitEl = $('#jokeCheckBoxSubmit');

// Gets input from user
function getNamesInput (event) {
    event.preventDefault();
	// defined variables
    var obj = {};
    var firstName = '';
	var secondName = '';

    // Catches if no names are input. If no names, then do nothing
    if ((firstNameEl.val() !== '') && (secondNameEl.val() !== '')) {
        // Stores user search as an object
        var firstName = firstNameEl.val().toLowerCase();
        var secondName = secondNameEl.val().toLowerCase();

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

// Takes in a single string of letters and capatalizes the first letter
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
    // Removes any jokes already inplace.
    jokeSectionJokeEl.empty();
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
    var jokeSectionJokeEl = $('#jokeSectionJoke');
    // Creates first Joke Section
    var divOne = $('<div></div>');
    var headOne = $('<h3>Witty Joke: </h3>');
    var paraOne = $('<p>' + onePart + '</p>');

    // Appends first joke
    divOne.append(headOne);
    divOne.append(paraOne);
    jokeSectionJokeEl.append(divOne);

    // Creates second joke
    var divTwo = $('<div></div>');
    var headTwo = $('<h3>Interactive Joke: </h3>');
    var paraTwo = $('<p>' + twoPartSet + '</p>' + '\n' + '<p>' + twoPartDel + '</p>');

    // Appends second joke
    divTwo.append(headTwo);
    divTwo.append(paraTwo);
    jokeSectionJokeEl.append(divTwo);
}

// Listens for button submit on checkboxes
jokeCheckBoxSubmitEl.on('click', getJoke);

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Compatibility Seciton//////////////////////////////////
// Returns compatibility as an object with both names and a score
async function createCompatibilityObj (event) {
    var obj = getNamesInput(event);
    // ***Need to make a function that fetches the score.
    obj.score = await fetchLove(obj.name1, obj.name2);
    return obj;
}

// Returns compatibility 
async function compatibility (event) {
    event.preventDefault();
    var obj = await createCompatibilityObj(event);
    
    console.log(obj);
    // Adds progress to HMTL
    const myProgressBar = document.querySelector(".progress");
    console.log(myProgressBar);
    updateProgressBar(myProgressBar, obj.score);
}

// Updates progress bar
function updateProgressBar(progressBar, value) {
	progressBar.querySelector(".progress-fill").style.width = `${value}%`;
	progressBar.querySelector(".progress-text").textContent = `${value}%`;
}
// Listens for the form submit button to be pressed
compatibilityFormEl.on('submit', compatibility);

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\API FETCHING/////////////////////////////////////////
// // Love Compatability API
async function fetchLove (name1, name2) {
    const optionsLove = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
            'X-RapidAPI-Key': 'd7b52d453cmsh879a19108989e7bp13154cjsn9c9ddd1cbe5d'
        }
    };
    await fetch('https://love-calculator.p.rapidapi.com/getPercentage?sname=' + name1 + '&fname=' + name2, optionsLove)
    .then(response => response.json())
    .then(function (data) {
        loveAPIObject = data;
        console.log(data);
    })
    .catch(err => console.error(err));

    return loveAPIObject.percentage;
}

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

// Pulls up a random Activity
// example pull https://www.boredapi.com/api/activity
function fetchActivity () {
    fetch('https://www.boredapi.com/api/activity')
	.then(response => response.json())
	.then(function (data){
		console.log(data);
	})
	.catch(err => console.error(err));
}

fetchActivity();




