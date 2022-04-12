const key = 'b0c6ee4c63msh8f0c74e8dacd7e8p1b362djsnfa58527ad9fd';




const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com',
		'X-RapidAPI-Key': 'b0c6ee4c63msh8f0c74e8dacd7e8p1b362djsnfa58527ad9fd'
	}
};


const leagues = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com',
		'X-RapidAPI-Key': 'b0c6ee4c63msh8f0c74e8dacd7e8p1b362djsnfa58527ad9fd'
	}
};

fetch('https://api-baseball.p.rapidapi.com/leagues?name=mlb', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    console.log(leagues);
    console.log(options);

	// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Third Page///////////////////////////////////////
	// Obtain list of players
	// Obtain stats of players
	// Compare stats of players
	// 