var UI = require('ui');
var troop = 0;
var scout = 0;
var scoutnam = 0;
var ajax = require('ajax');
var globalToken;
var LEDControl = require('LEDControl');
var menu = new UI.Menu({
    sections: [{
      title: 'Scout Control',
    }]
});

var ScoutControl = {  
  loadScout : function(troopid, scoutid,scoutname, token) {  
    troop = troopid;
    scout = scoutid;
    scoutnam = scoutname;
    globalToken = token;
    ajax(
      {
        url:'https://api.pinocc.io/v1/'+troopid+'/'+scoutid+'/command/temperature.report?token='+globalToken,
        type: 'json'
      },
      function(data) {
        var obj = JSON.parse(data.data.reply);
        var temp_subtitle = parseInt(obj.f) + "F / " + parseInt(obj.c) + "C";        
        menu.item(0, 0, { title: 'Temperature', subtitle: temp_subtitle});
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    ); 
    console.log('https://api.pinocc.io/v1/'+troopid+'/'+scoutid+'/command/power.report?token='+globalToken);
    ajax(
      {
        url:'https://api.pinocc.io/v1/'+troopid+'/'+scoutid+'/command/power.report?token='+globalToken,
        type: 'json'
      },
      function(data) {
        var obj = JSON.parse(data.data.reply);
        menu.item(0, 1, { title: 'Battery: '+parseInt(obj.battery)+'%'});
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    );
    menu.item(0,2, {title:"LED Settings"});
    menu.on('select', function(e) {
      switch(e.itemIndex){
        case 2:
            LEDControl.load(troop, scout, globalToken);
          break;
        default:
          break;
      }
    });
    menu.show();
  }
};

this.exports = ScoutControl; 

