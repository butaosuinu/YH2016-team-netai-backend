const mysqlx = require('mysqlx');
 
mysqlx.getSession({
    host: 'localhost',
    port: 33060,
    dbUser: 'root',
    dbPassword: 'root'
}).then(function (session) {
    return session.createSchema("test_schema").then(function (schema) {
        return schema.createCollection("myCollection");
    }).then(function (collection) {
        return Promise.all([
            collection.add(
                {baz: { foo: "bar"}},
                {foo: { bar: "baz"}}
            ).execute(),
            collection.find("$.baz.foo == 'bar'").execute(function (row) {
                console.log("Row: %j", row);
            }).then(function (res) {
                console.log("Collection find done!");
            }),
            collection.remove("($.foo.bar) == 'baz'").execute().then(function () {
                console.log("Document deleted");
            }),
            collection.drop()
        ]);
    }).then(function () {
        // return session.dropSchema("test_schema");
        return;
    }).then(function () {
        return session.close();
    });
}).catch(function (err) {
    console.log(err.stack);
    process.exit();
});