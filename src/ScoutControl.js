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
        menu.item(0,1, {title:"LED Settings"});
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    ); 
    menu.on('select', function(e) {
      switch(e.itemIndex){
        case 1:
            LEDControl.load(troop, scout, globalToken);
          break;
        default:
          break;
      }
    });
  }
};

this.exports = ScoutControl; 

