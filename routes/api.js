const express = require('express');
const router = express.Router();

const teamModel = require('../model/team.js');

// const baseURL = '/api/v1'
// router.get('/', )

router.post('/team', (req, res) => {
	teamModel.createTeam(req.body.name);
})