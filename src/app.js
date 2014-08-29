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
// setup menu items
var ajax = require('ajax');
ajax({ url: 'https://api.pinocc.io/v1/troops?token=ad585460354b33f1eb2e289835df4401', type: 'json' },
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
  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
});

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