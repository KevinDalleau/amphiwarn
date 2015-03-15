	var express = require('express');
	var app = express();
	var server = app.listen(80);
	var io = require('socket.io').listen(server);

		app.use(express.static(__dirname +'/'));
		app.use(express.static(__dirname +'/bower_components/angular/'));

	app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
	});

	var counter = 0;
	io.sockets.on('connection', function(socket){
	  console.log('a user connected');
	  counter++;
	  io.sockets.emit('connectionCounter',counter);
	  socket.on('notify', function(data) {
		console.log('Notification sent');
			io.sockets.emit('notificationbroadcast',{message: 'Une phrase à trous sauvage est apparue !', date: data.date, sender: data.sender});
	});
	socket.on('disconnect', function() {
		console.log('Au revoir !');
		counter--;
		io.sockets.emit('disconnectionCounter',counter);
	});	
	});


