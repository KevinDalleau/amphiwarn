function getTimeMessage() {
	var time = new Date();
	return time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
}

function notifyAll() {
	// console.log("Notification");
	socket.emit('notify', {type:'Notification',date:getTimeMessage()});
};
window.addEventListener("keydown", checkKeyPressed, false);
 
function checkKeyPressed(e) {
    if (e.keyCode == "13" || e.keycode == "18") {
        notifyAll();
    }
}
function notify(message) {
// Voyons si le navigateur supporte les notifications
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

  // Comme ça, si l'utlisateur a refusé toute notification, et que vous respectez ce choix,
  // il n'y a pas besoin de l'ennuyer à nouveau.
}
