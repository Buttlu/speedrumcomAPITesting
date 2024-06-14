const form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', async e => {
	e.preventDefault();

	const level = document.getElementsByName('level')[0].value;
	const nomo = document.getElementsByName('nomo')[0].checked;
	let tempexit;
	for (const radio of document.getElementsByName('exit')) {
		if (radio.checked) {
			tempexit = radio.value;
			break;
		}
	}
	const exit = tempexit;

	const variables = await getVariables();

	const name = `Exit ${level}${nomo ? ' NoMo' : ''}`;
	const category = variables.data.filter(entry => entry.name === name)[0];

	const categoryid = category.category;

	const id = category.id;

	const exits = Object.keys(category.values.values);
	const exitid = exits.filter(entry => category.values.values[entry].label === exit)[0];

	const levelid = category.scope.level;

	const leaderboard = await getLeaderBoard(levelid, categoryid, id, exitid);

	const runs = leaderboard.data.runs;

	const lb = [];

	for (const run of runs) {
		const userid = run.run.players[0].id;
		const user = await getUser(userid);
		lb.push({
			place: run.place,
			name: user.data.names.international,
			time: run.run.times.ingame_t,
			link: run.run.weblink
		});
	}

	console.log(name, exit, lb);
});

async function generateDropdown() {
	const levelDropdown = document.getElementsByName('level')[0];
	exitLevels(levelDropdown)
}

async function allLevels(levelDropdown) {
	const levels = await getLevels();

	for (const level of levels.data) {
		levelDropdown.innerHTML += `<option value="${getLevelNumber(level)}">${level}</option>`;
	}
}

async function exitLevels(levelDropdown) {
	const variables = await getVariables();
	const levels = await getLevels();

	for (let i = 7; i < variables.data.length; i++) {
		if (!variables.data[i].name.match(/^Exit [\dP]-[\dS]$/)) continue;

		const level = levels.data.find(level => getLevelNumber(level) === getLevelNumber(variables.data[i]));
		levelDropdown.innerHTML += `<option value="${getLevelNumber(level)}">${level.name}</option>`;
	}
}

function getLevelNumber(level) {
	const regex = /[\dP]-[\dS]/;
	return level.name.match(regex)[0];
}