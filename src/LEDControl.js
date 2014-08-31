var UI = require('ui');
var ScoutControl = require('ScoutControl');

var troop = 0;
var scout = 0;
var globalToken;
var ajax = require('ajax');
var menu = new UI.Menu({
    sections: [{
      title: 'LED Control',
      items: [{
        title: 'LED Toggle',
      }]
    },{
      title: 'LED Color',
      items: [{
        title: 'LED Cyan',
      }, {
        title: 'LED Blue',
      },{
        title: 'LED Orange',
      },{
        title: 'LED Red',
      },{
        title: 'LED Green',
      },{
        title: 'LED Purple',
      },{
        title: 'LED Magenta',
      },{
        title: 'LED Yellow',
      },{
        title: 'LED White',
      }]
    }]
});

var LEDControl = {  

  load : function(troopid,scoutid, token) {  
    troop = troopid;
    scout = scoutid;
    globalToken = token;
    menu.show();
  }
};
this.exports = LEDControl; 

menu.on('select', function(e) {
  if(e.sectionIndex == 1){
    switch(e.itemIndex){
      case 0:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.cyan?token='+globalToken, type: 'json' });
        break;
      case 1:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.blue?token='+globalToken, type: 'json' });
        break;
      case 2:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.orange?token='+globalToken, type: 'json' });
        break;
      case 3:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.red?token='+globalToken, type: 'json' });
        break;
      case 4:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.green?token='+globalToken, type: 'json' });
        break;
      case 5:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.purple?token='+globalToken, type: 'json' });
        break;
      case 6:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.magenta?token='+globalToken, type: 'json' });
        break;
      case 7:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.yellow?token='+globalToken, type: 'json' });
        break;
      case 8:
        ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.white?token='+globalToken, type: 'json' });
        break;
    }
  }else {
    switch(e.itemIndex)
    {
      case 0:
        toggleLED();
      break;
    }  
  }
  
});

function toggleLED() {
   ajax(
      {
        url:'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/print%20led.isoff?token='+globalToken,
        type: 'json'
      },
      function(data) {
        console.log(parseInt(data.data.reply));
        if(parseInt(data.data.reply) == 1){
          ajax( 
            {
              url:'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.on?token='+globalToken,
              type: 'json'
            },
            function(data) {
              
            },
            function(error) {
              console.log('The ajax request failed: ' + error);
            }
          );
        }else {
          ajax( 
            {
              url:'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/led.off?token='+globalToken,
              type: 'json'
            },
            function(data) {
              
            },
            function(error) {
              console.log('The ajax request failed: ' + error);
            }
          );
        }
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    ); 
}