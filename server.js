// "StAuth10065: I Prerak Patel, 000825410 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");


// SQLite database stored in a file named api.db.
var fs = require('fs');
var file = "api.db";
var fileExists = fs.existsSync(file);

if (!fileExists) {
    console.log('Creating new DB file');
    fs.openSync(file, 'w');
}
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
if (!fileExists) {
    db.serialize(function() {
        // Creating the SQLite database
        db.run(
            "CREATE TABLE IF NOT EXISTS users ( msgid INTEGER PRIMARY KEY, status TEXT, message TEXT,timestamp TEXT);"
        );
    });
}

io.on('connection', function(socket) {
    socket.on('joined', function(call) {
        db.all("SELECT * FROM users", (err, row) => {
            if (err) {
                res.send(err.message);
            }
            io.emit('users', row);
        });
    });
});

app.get('/dashboard', function(req, res) {
    res.sendFile(__dirname + '/dashboard.html');
});

client = redis.createClient({
    url: "redis://redis-13302.c13.us-east-1-3.ec2.cloud.redislabs.com:13302",
    password: "4H10yr9gHoo7Wlt165H8oQhJtSCfMH3N"
});


client.monitor(function(err, res) {
    console.log("Client monitoring");
});

client.on("monitor", function(time, args, raw_reply) {
    if (args[1] == 'update') {
        var timestamp = Date().toLocaleString();
        db.run(`INSERT INTO users ( status, message, timestamp) VALUES("${args[2]}", "${args[3]}","${timestamp}");`);
        args[4] = timestamp;
        io.emit('database updated', args);
    }
});


http.listen(3000, function() {
    console.log('Listening on Port 3000');
});