const mysqlx = require('mysqlx');
const mysql = require('../mysql.js');
const q = require('q');

const createTeam = (name) => {
	// const deferred = q.defer()
	mysql.then((session) => {
		const mydb = session.getSchema('tsg');

		const teamTable = mydb.getTable('team');
		teamTable.insert(['team_name']).values([name]).execute();
	});
}

const getTeamData = () => {
	const deferred = q.defer()
	mysql.then((session) => {
		const mydb = session.getSchema('tsg');
		const teamTable = mydb.getTable('team');

		const result = teamTable.select([]).value([])execute();
	})
}


module.exports = {
	createTeam: createTeam,
	getTeamData: getTeamData
}