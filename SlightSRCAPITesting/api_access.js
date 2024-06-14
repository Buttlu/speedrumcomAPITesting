async function getVariables() {
	const response = await fetch(`https://www.speedrun.com/api/v1/games/369p3p81/variables`, {
		method: "GET",
		"X-API-Key": KEY,
		"Content-Type": "application/json"
	});

	return await response.json();
}

async function getLeaderBoard(levelid, categoryid, id, exitid) {
	const response = await fetch(`https://www.speedrun.com/api/v1/leaderboards/369p3p81/level/${levelid}/${categoryid}?var-${id}=${exitid}&top=5`, {
		method: "GET",
		"X-API-Key": KEY,
		"Content-Type": "application/json"
	});

	return await response.json();
}

async function getLevels() {
	const response = await fetch(`https://www.speedrun.com/api/v1/games/369p3p81/levels`, {
		method: "GET",
		"X-API-Key": KEY,
		"Content-Type": "application/json"
	});

	return await response.json();
}

async function getUser(userid) {
	const response = await fetch(`https://www.speedrun.com/api/v1/users/${userid}`, {
		method: "GET",
		"X-API-Key": KEY,
		"Content-Type": "application/json"
	});

	return await response.json();
}

