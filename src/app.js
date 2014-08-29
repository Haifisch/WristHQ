/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');

var splashScreen = new UI.Card({ banner: 'images/Pebble_Pinoccio.png' });
splashScreen.show();

var mainScreen = new UI.Menu({
  
  sections: [{
    title: 'Your troops',
  }]
});
var ajax = require('ajax');
ajax({ url: 'https://api.pinocc.io/v1/troops?token=ad585460354b33f1eb2e289835df4401', type: 'json' },
  function(data) {
    console.log('Quote of the day is: ' + data.data[0].name);
    mainScreen.items(0, [ { title: data.data[0].name } ]);
  }
);
Settings.config(
  { url: 'http://haifisch.ninja/pinoccio/setup.html' },
  function(e) {
    console.log('opening configurable');

    // Reset color to red before opening the webview
    Settings.option('token', 'red');
  },
  function(e) {
    console.log('closed configurable');
  }
);

setTimeout(function() {
 
  // Display the mainScreen
  mainScreen.show();
  // Hide the splashScreen to avoid showing it when the user press Back.
  splashScreen.hide();
}, 3000);