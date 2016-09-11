const express = require('express');
const router = express.Router();

const teamModel = require('../model/team.js');

// const baseURL = '/api/v1'
// router.get('/', )
router.all('/*', function ( req, res, next ) {
	res.contentType( 'json' );
	res.header( 'Access-Control-Allow-Origin', '*' );
	next();
});

router.post('/team', (req, res) => {
	teamModel.createTeam(req.body.name).then(function(r) {
		res.send(r);
	});
});

router.get('/team/:id', (req, res) => {
	const resp = teamModel.getTeamData(req.params.id);
	res.send(resp);
});

router.post('/team/:team_id/members', (req, res) => {
	teamModel.addMemberToTeam(req.body.member_name, req.params.team_id).then(function() {
		for (var i = req.body.skill.length - 1; i >= 0; i--) {
			teamModel.addMemberSkill(req.body.new_member_id, req.body.skill[i]).then(function(r) {
				res.send(r);
			});
		}
	})
});

module.exports = router;