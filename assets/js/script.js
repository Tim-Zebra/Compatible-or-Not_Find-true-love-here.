// Global variables for API pull
var loveAPIObject = {};
var dateAPIObject = {};
var searchHistoryArray = [];

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
        searchCriteria = 'programming,spooky,christmas';
    }

    // Creates option to display one and two part jokes
    // fetch from API
    var onePartJoke = await fetchJoke (searchCriteria, '&type=single');
    var twoPartJoke = await fetchJoke (searchCriteria, '&type=twopart');

    // Removes any jokes already inplace. Positioned here to make replace appear 'seamless'
    jokeSectionJokeEl.empty();
    
    // Catches joke if undefined
    if (onePartJoke.joke === undefined) {
        onePartJoke.joke = "No options for a witty one-linear. Try a different search criteria."
    }

    // Sets Joke Variables
    onePartJoke = onePartJoke.joke;
    twoPartJokeSetup = twoPartJoke.setup;
    twoPartJokeDelivery = twoPartJoke.delivery;

    // displays joke
    displayJoke (onePartJoke, twoPartJokeSetup, twoPartJokeDelivery);
}

function displayJoke(onePart, twoPartSet, twoPartDel) {
    var jokeSectionJokeEl = $('#jokeSectionJoke');
    
    // Appends top boarder after search
    var span = $('<span>');
    jokeSectionJokeEl.append(span);

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
    
    saveToLocalStorage(obj);
    return obj;
}

// Returns compatibility 
async function compatibility (event) {
    event.preventDefault();
    var obj = await createCompatibilityObj(event);
    console.log(obj);
    // Adds progress to HMTL
    const myProgressBar = document.querySelector(".progress");
    updateProgressBar(myProgressBar, obj.score);
    interpretCompatibilityScore(obj, obj.score);
    
    // displays search history
    displayHistory();
}

// Updates progress bar
function updateProgressBar(progressBar, value) {
	progressBar.querySelector(".progress-fill").style.width = `${value}%`;
	progressBar.querySelector(".progress-text").textContent = `${value}%`;
}

// Interprets compatibility
function interpretCompatibilityScore(names, score) {
    // Links with HTML
    var compatEl = $('#compat-interp');
    var text = '';

    // Interprets score
    if (score <= 33) {
        text = 'Not even a good joke can save you now. Search for another name. If you disagree, maybe try a middle name?'
    } else if (score <= 66) {
        text = 'This might be a match! Be sure to checkout our joke and activity section if you want things to go well.'
    } else if (score <= 85) {
        text = 'This is a good match! You\'ll defintitely want to have a good joke prepared or have a fun activity planned.'
    } else {
        text = 'This match has superb potential! Just don\'t mess it up. Always take a back up like a good joke or an alternative activity (see sections below).'
    }

    // Prompts to enter names if names are not entered.
    if (names.name1 === "" || names.name2 === "") {
        text = 'Please enter a name into both hearts.'
    }
    // Sets result on HTML
    compatEl.text(text);
}

// Listens for the form submit button to be clicked
compatibilityFormEl.on('submit', compatibility);

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ACITIVTY SECTION/////////////////////////////////////
var activityGeneratorSubmitEl = $('#activityGeneratorSubmit');

// Gets activity from fetch
async function activity () {
    var activity = await fetchActivity();
    displayActivity (activity);
}

// Displays an activity
function displayActivity (activity) {
    var activityGeneratorEl = $('#activityGenerator');
    var para = $('<p>' + activity + '</p>');

    // Removes any previous activities
    activityGeneratorEl.empty();
    // Adds current activity
    activityGeneratorEl.append(para);
}

// Listens for the activity submit button to be clicked
activityGeneratorSubmitEl.on('click', activity);
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

// Pulls up a random Activity for two people
// example pull https://www.boredapi.com/api/activity
async function fetchActivity () {
    var obj = {};
    
    await fetch('https://www.boredapi.com/api/activity')
	.then(response => response.json())
	.then(function (data){
		obj = data;
	})
	.catch(err => console.error(err));

    return obj.activity;
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Save, Load Local Storage////////////////////////////
// save to local storage
function saveToLocalStorage(obj) {
    // avoids null from empty search history array and avoids pushing undefined object
    if (searchHistoryArray[0] === null) {
        searchHistoryArray[0] = obj;
    } else if (obj !== undefined) {
        searchHistoryArray.unshift(obj);
    }

    localStorage.setItem('Lovers', JSON.stringify(searchHistoryArray));
}

// load from local storage
function getFromLocalStorage() {
   var getFromStorage = JSON.parse(localStorage.getItem('Lovers'));
   if (getFromStorage !== null) {
        searchHistoryArray = getFromStorage;
    }
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\Display Search History List///////////////////////////
//displays search history in HTML
async function displayHistory() {
    var list = $('#listHistory');
    // Removes any content in search history
    list.empty();

    if (searchHistoryArray !== undefined) {
        for (var i = 0; i < searchHistoryArray.length; i++) {
            // gets value from object array
            var name1 = searchHistoryArray[i].name1;
            var name2 = searchHistoryArray[i].name2;
            var compat = searchHistoryArray[i].score;
            
            // Creates li value for HTML
            var addTo = document.createElement('li');
            addTo.textContent = name1 + ' and ' + name2;


            // Creates progress bar for HTML
            var divProg = document.createElement("div");
            divProg.setAttribute('class', 'progress');
            divProg.setAttribute('id', 'progress' + i)
            
            var divProgFill = document.createElement("div");
            divProgFill.setAttribute('class', 'progress-fill');

            var spanProg = document.createElement("span");
            spanProg.setAttribute('class', 'progress-text');

            divProg.appendChild(divProgFill);
            divProg.appendChild(spanProg);            

            addTo.append(divProg);
            list.append(addTo);

            // Applies fill to progress bar
            var progressBar = document.getElementById('progress' + i);
            updateProgressBar(progressBar, compat);
        }
    }
}

// Updates progress bar
function updateProgressBar(progressBar, value) {
	progressBar.querySelector(".progress-fill").style.width = `${value}%`;
	progressBar.querySelector(".progress-text").textContent = `${value}%`;
}

// Clears search history list
function clearSearchHistory () {
    // Clears all varibales
    searchHistoryArray = [];

    var listHistory = $('#listHistory');
    listHistory.empty();

    // Saves to local storage
    saveToLocalStorage();
}

// Button to clear search history
var clearSearchHistoryBtn = $('#clearSearchHistory');
clearSearchHistoryBtn.on('click', clearSearchHistory);
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\initaites base app/////////////////////////////////
function init() {
    // loads data from storage
    getFromLocalStorage();
    
    // Display search history
    displayHistory();
}
init();