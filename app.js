	var useless = null;
	var lastNotification = 0;
	var app = angular.module("webAlert", []);
	var array = new Array();
	app.controller('MainController', function($scope, $window){

		$scope.message = "Ok !"; 
		$scope.notifications = array;
	});


	function getTimeMessage() {
		var time = new Date();
		return time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	}

	function avoidTroll(time) {
		var now = new Date();
		var then = new Date(time);
		var troll = now-time<10000;
		return troll;
	}

	function notifyAll() {
		console.log(avoidTroll(lastNotification));
		if(lastNotification == 0) {
			socket.emit('notify', {type:'Notification',date:getTimeMessage(),sender:socket.id});
			lastNotification = new Date();
		}
		else {
			if(!avoidTroll(lastNotification)) {
				socket.emit('notify', {type:'Notification',date:getTimeMessage(),sender:socket.id});
				lastNotification = new Date();
			}
			else {
				alert("Troll alert !");
			}
		}
		
	}
	
	window.addEventListener("keydown", checkKeyPressed, false);
	 
	function checkKeyPressed(e) {
	    if (e.keyCode == "13" || e.keycode == "18") {
	        notifyAll();
	    }
	}

	function updateCounter(counter) {
		var appElement = document.querySelector('[ng-app=webAlert]');
	    var $scope = angular.element($('body')).scope();
	    console.log(counter);
	    $scope.$apply(function() {
	    	$scope.counterDisplay = counter;
	    });
	}
	function notify(message) {
	// Voyons si le navigateur supporte les notifications
		var appElement = document.querySelector('[ng-app=webAlert]');
	    var $scope = angular.element($('body')).scope();
	    
		if(array.length<=4) {
			array.unshift(message);
		}
		else {
			array[0] = message;
		}
		$scope.$apply(function() {
	        $scope.notifications = array;
	    });
	    if(message.sender!=socket.id) { //Si ce n'est pas l'émetteur
	    	if (!("Notification" in window)) {
	    alert("Ce navigateur ne supporte pas les notifications desktop");
	  }

	  // Voyons si l'utilisateur est OK pour recevoir des notifications
	  else if (Notification.permission === "granted") {
	    
	    var notification = new Notification(message.date+ " : "+message.message);
	  }

	  
	  else if (Notification.permission !== 'denied') {
	    Notification.requestPermission(function (permission) {

	      if(!('permission' in Notification)) {
	        Notification.permission = permission;
	      }
	    });
	  }
	    }
	}
