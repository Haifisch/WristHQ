var UI = require('ui');
var troop = 0;
var scout = 0;
var scoutnam = 0;

var menu = new UI.Menu({
  sections: [{
    title: "Scout",
  }],
  items: [{
    title: 'Temperature',
    subtitle: 'Not retrieved',
  }, {
    title: 'Batt%'
  }]
});

var ScoutControl = {  
  loadScout : function(troopid, scoutid,scoutname) {  
    menu.show();
    troop = troopid;
    scout = scoutid;
    scoutnam = scoutname;
    console.log('\nTroopID:'+troopid+'\nScoutID:'+scoutid+'\nScoutName:'+scoutname);
    
    var ajax = require('ajax');
    ajax(
      {
        url:'https://api.pinocc.io/v1/'+troopid+'/'+scoutid+'?token=ad585460354b33f1eb2e289835df4401',
        type: 'json'
      },
      function(data) {
        console.log(data.data);
          
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    ); 
    menu.on('select', function(e) {
      console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      console.log('The item is titled "' + e.item.title + '"');
    });
  }
};
this.exports = ScoutControl; 

