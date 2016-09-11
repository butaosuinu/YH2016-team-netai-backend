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
};

const getTeamData = (team_id) => {
	const deferred = q.defer()
	mysql.then((session) => {
		const mydb = session.getSchema('tsg');
		const teamTable = mydb.getTable('team');

		const result = mydb.executeSql('SELECT * ' +
				'FROM team ' +
				'LEFT JOIN member ON team.team_id=member.team_id' +
				'LEFT JOIN member_skill ON member.member_id=member_skill.member_id' +
				'LEFT JOIN skill ON member_skill.skill_id=skill.skill_id' +
				'WHERE team.team_id=?').bind(team_id).execute();
		deferred.resolve(result);
	});
	return deferred.promise;
};

const addMemberToTeam = (member_name, team_id) => {
	mysql.then((session) => {
		const mydb = session.getSchema('tsg');
		const memberTable = mydb.getTable('member');

		memberTable.insert(['member_name', 'team_id'])
					.values([member_name, team_id])
					.execute();
	});
}

const deleteMemberTeam = (team_id, member_id) => {
	mysql.then((session) => {
		const mydb = session.getSchema('tsg');
		const memberTable = mydb.getTable('member');
		memberTable.delete().where('member_id=' + member_id).execute();
	})
}

const addMemberSkill = (member_id, skill_id) => {
	mysql.then((session) => {
		const mydb = session.getSchema('tsg');
		const memberSkillTable = mydb.getTable('member_skill');
		memberSkillTable.insert(['member_id', 'skill_id'])
						.values([member_id, skill_id])
						.execute();
	})
}

const updateMemberSkill = (member_id) => {

}

const deleteMemeberSkill = (member_id, skill_id) => {
	mysql.then((session) => {
		const mydb = session.getTable('tsg');
		const memberSkillTable = mydb.getTable('member_skill');
		memberSkillTable.delete()
						.where('member_id=' + member_id + ' AND ' + 'skill_id=' + skill_id)
						.execute();
	})
}

module.exports = {
	createTeam: createTeam,
	getTeamData: getTeamData,
	addMemberToTeam: addMemberToTeam,
	deleteMemberTeam: deleteMemberTeam,
	addMemberSkill: addMemberSkill,
	deleteMemeberSkill: deleteMemeberSkill
}
