/**
 * Helper script to map data files, can be removed eventually
 */

const fs = require('fs');

const filename = process.argv[2];
const data = require(filename);	// eslint-disable-line

const players = [];
data.kills.forEach(k => {
	const playerName = k[0];
	if (!players.map(p => p.name).includes(playerName)) {
		players.push({
			name: playerName,
			_id: players.length
		});
	}
});

const kills = [];
data.kills.forEach(k => {
	const kill = [];
	for (let i = 0; i < 2; i++) {
		const entity = k[i];
		const player = players.find(p => p.name === entity);
		if (player) {

			kill[i] = player._id;
		} else {
			kill[i] = entity;
		}
	}
	kills.push(kill);
});

const match = {
	match: data.match,
	week: data.week,
	players,
	kills
};


fs.writeFile(filename, JSON.stringify(match, null, 4));
