/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
// Remember to set this, this should be replaced soon by localStorage whenever I implement the login.
var globalToken = localStorage.getItem("token");
//

var UI = require('ui');
var ajax = require('ajax');
var ScoutScreen = require('Scouts');
var splashScreen = new UI.Card({ banner: 'images/Pebble_Pinoccio.png' });
splashScreen.show();

var noTokenScreen = new UI.Card({
  title: 'Oh no!'
});
noTokenScreen.body('There doesn\'t appear to be any tokens stored, be sure you are logged in.');

var mainScreen = new UI.Menu({
  
  sections: [{
    title: 'Your Troops',
  }]
});
// setup menu items
ajax({ url: 'https://api.pinocc.io/v1/troops?token='+globalToken, type: 'json' },
  function(data) {
    var count = 0;
    console.log(data.data.length);
    while (count < data.data.length){
      mainScreen.item(0, count, { title: data.data[count].name } );
      count++;
    }
  }
);
mainScreen.on('select', function(e) {
  var ajax = require('ajax');
  ajax({ url: 'https://api.pinocc.io/v1/troops?token='+globalToken, type: 'json' },
    function(data) {
        ScoutScreen.loadScouts(parseInt(data.data[e.itemIndex].id), globalToken);
    }
  );
});

var initialized = false;

Pebble.addEventListener("ready", function() {
  console.log("ready called!");
  initialized = true;
});

Pebble.addEventListener("showConfiguration", function() {
  console.log("showing configuration");
  Pebble.openURL('http://haifisch.ninja/pinoccio/configurable.html');
});

Pebble.addEventListener("webviewclosed", function(e) {
  console.log("configuration closed");
  // webview closed
  var options = JSON.parse(decodeURIComponent(e.response));
  //var tokenData = JSON.stringify(options);
  console.log(options.token);
  localStorage.setItem("token",options.token);
});


setTimeout(function() {
 
  // Display the mainScreen
  if(globalToken) {
    mainScreen.show();
  }else {
    noTokenScreen.show();
  }
  // Hide the splashScreen to avoid showing it when the user press Back.
  splashScreen.hide();
}, 3000);