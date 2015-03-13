	var lastNotification = 0;
	var app = angular.module("webAlert", []);
	var array = new Array();
	app.controller('MainController', function($scope, $window){

		$scope.message = "Ok !";
		$scope.watch = 
		$scope.notifications = array;
	});


	function getTimeMessage() {
		var time = new Date();
		return time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	}

	function avoidTroll(time) {
		var now = new Date();
		var then = new Date(time);
		console.log(now);
		console.log(then);
		var troll = now-time<10000 ? true : false;
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
		
	};
	window.addEventListener("keydown", checkKeyPressed, false);
	 
	function checkKeyPressed(e) {
	    if (e.keyCode == "13" || e.keycode == "18") {
	        notifyAll();
	    }
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
	    if(message.sender!=socket.id) { //If it's not the sender
	    	if (!("Notification" in window)) {
	    alert("Ce navigateur ne supporte pas les notifications desktop");
	  }

	  // Voyons si l'utilisateur est OK pour recevoir des notifications
	  else if (Notification.permission === "granted") {
	    // Si c'est ok, créons une notification
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
	    
	  

	  // Comme ça, si l'utlisateur a refusé toute notification, et que vous respectez ce choix,
	  // il n'y a pas besoin de l'ennuyer à nouveau.
	}
