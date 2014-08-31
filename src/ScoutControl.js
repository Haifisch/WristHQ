var UI = require('ui');
var troop = 0;
var scout = 0;
var scoutnam = 0;
var ajax = require('ajax');
var globalToken;

var menu = new UI.Menu({
    sections: [{
      title: 'Scout Control',
    }]
});

var ScoutControl = {  
  loadScout : function(troopid, scoutid,scoutname, token) {  
    menu.show();
    troop = troopid;
    scout = scoutid;
    scoutnam = scoutname;
    globalToken = token;
    console.log('https://api.pinocc.io/v1/'+troopid+'/'+scoutid+'/command/temperature.report?token='+globalToken);
    ajax(
      {
        url:'https://api.pinocc.io/v1/'+troopid+'/'+scoutid+'/command/temperature.report?token='+globalToken,
        type: 'json'
      },
      function(data) {
        var obj = JSON.parse(data.data.reply);
        var temp_subtitle = parseInt(obj.f) + "F / " + parseInt(obj.c) + "C";        
        console.log(temp_subtitle);
        menu.item(0, 0, { title: 'Temperature', subtitle: temp_subtitle});
        menu.item(0,1, {title:"Loggle LED"});
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    ); 
    menu.on('select', function(e) {
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      switch(e.itemIndex){
        case 1:
          toggleLED();
          break;
        default:
          break;
      }
      console.log('The item is titled "' + e.item.title + '"');
    });
  }
};
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
this.exports = ScoutControl; 

