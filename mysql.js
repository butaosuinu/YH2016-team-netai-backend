const mysqlx = require('mysqlx');

module.exports = mysqlx.getSession({
	host: 'localhost',
	port: 33060,
	dbUser: 'root', dbPassword: 'root'
})