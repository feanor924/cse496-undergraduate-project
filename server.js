var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var net = require('net');
var JsonSocket = require('json-socket');
var port1 = 6969;

mysql = require('mysql');

var array = [];

var server = net.createServer();

server.listen(port1);
server.on('connection', function(socket) {
    liste=[];
    object={};
    liste.push(socket.remoteAddress);
    socket = new JsonSocket(socket);
    var n;
    var isRunning = false;
    var streatTimeout;
    
    socket.on('data', function(data) {
        var str= data.toString();
        console.log("veri : "+data.toString());    
        array = str.split(',');
        
    });
});

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'canerbakar',
  database: 'sys'
});


connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')

});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('client'));


app.get("/",function(req,res){
	res.sendFile(path.join(__dirname + '/client/login.html'));
});

app.post("/users",function(req,res){

	var str = 'SELECT * FROM users where user_name = ' + "'" 
	+ req.body.name + "' AND " + "user_password = " + "'" 
	+ req.body.password + "'";

	connection.query(str, function(err, results) {
        if (err) throw err
        if ( results[0] == undefined)
        	res.send("0");
        else{
        	res.send(results[0]);
        }
  	});
	
});

app.post("/devices",function(req,res){
    if ( array == undefined)
    	res.send("0");
    else{
    	console.log(array);
    	res.send(array);
    }
	
});


app.post("/put",function(req,res){

	// create a new user
	var newUser = {
		id          : req.body.id,
		firstname 	: req.body.first_name,
		lastname 	: req.body.last_name,
	  	department 	: req.body.department,
	  	username 	: req.body.user_name,
		password 	: req.body.user_password,
		email 		: req.body.email,
		phone 		: req.body.contact_no
	};

	var str = "UPDATE users SET first_name = " +  "'" 
	+ newUser.firstname + "'" + ", last_name = " + "'" 
	+ newUser.lastname + "'" + ', department = ' + "'" 
	+ newUser.department + "'" + ', user_name = ' + "'" 
	+ newUser.username + "'" + ', user_password = ' + "'" 
	+ newUser.password + "'" + ', email = ' + "'" + newUser.email + "'" 
	+ ', contact_no = ' + "'" 
	+ newUser.phone + "'" 
	+ '  where user_name = ' + "'" + newUser.id + "'";
	
	connection.query(str, function(err, results) {
        if (err) throw err
    	res.send("1");
  	});

	
});

app.post("/login",function(req,res){

	var newUser = {
	  	username 	: req.body.userName,
		password 	: req.body.password
	};

	var str = 'SELECT * FROM users where user_name = ' + "'" 
	+ newUser.username + "' AND " + "user_password = " + "'" 
	+ newUser.password + "'";

	connection.query(str, function(err, results) {
        if (err) throw err
        if ( results[0] == undefined)
        	res.send("0");
        else{
        	res.send("1");
        }
  	});		
	
});


app.post("/contact",function(req,res){

	var message = {
	  	name 		: req.body.name,
		email 		: req.body.email,
		mobile 		: req.body.mobile,
		message 	: req.body.message,

	};



	var str = 'insert INTO message (name_, email_, mobile_,message_) VALUES ( ' + "'" 
	+ message.name + "','" + message.email + "','" 
	+ message.mobile + "','" + message.message + "')";


	connection.query(str, function(err, results) {
        if (err) throw err
        if ( results == undefined)
        	res.send("0");
        else{
        	res.send("1");
        }
  	});
	
		
	
});

app.use(function(req, res) {
	res.sendStatus('404');
});

// Handle 500
app.use(function(error, req, res, next) {
	res.sendStatus('500');
});

app.listen(3000);
console.log("Server running on port 3000");