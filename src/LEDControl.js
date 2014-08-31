var UI = require('ui');
var ajax = require('ajax');

var troop = 0;
var scout = 0;
var ledISON = 0;
var globalToken;

var menu = new UI.Menu({
    sections: [{
      title: 'LED Control',
      items: [{
        title: 'Turn ON',
      }]
    },{
      title: 'LED Color',
      items: [{
        title: 'Cyan',
      }, {
        title: 'Blue',
      },{
        title: 'Orange',
      },{
        title: 'Red',
      },{
        title: 'Green',
      },{
        title: 'Purple',
      },{
        title: 'Magenta',
      },{
        title: 'Yellow',
      },{
        title: 'White',
      }]
    }]
});

var LEDControl = {  

  load : function(troopid,scoutid, token) {  
    troop = troopid;
    scout = scoutid;
    globalToken = token;
    ledStatus();
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
function ledStatus() {  
  console.log('https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/print%20led.isoff?token='+globalToken);
  ajax({ url:'https://api.pinocc.io/v1/'+troop+'/'+scout+'/command/print%20led.isoff?token='+globalToken, type: 'json' },
    function(data) {
        if(parseInt(data.data.reply) == 1){
            menu.item(0, 0, { title: "Turn ON" } );
        }else {
            menu.item(0, 0, { title: "Turn OFF" } );
        }
    }
  );
}
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
              menu.item(0, 0, { title: "Turn OFF" } );
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
              menu.item(0, 0, { title: "Turn ON" } );
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