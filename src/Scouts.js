var UI = require('ui');
var ScoutControl = require('ScoutControl');

var troop = 0;
var menu = new UI.Menu({
    sections: [{
      title: 'Your Troops',
    }]
});
var ScoutsScreen = {  

  loadScouts : function(troopid) {  
    troop = troopid;
    menu.show();
    var ajax = require('ajax');
    ajax(
      {
        url:'https://api.pinocc.io/v1/'+troopid+'/scouts?token=ad585460354b33f1eb2e289835df4401',
        type: 'json'
      },
      function(data) {
        var count = 0;
        console.log(data.data[0].name);
        while (count < data.data.length){
          menu.item(0, count, { title: data.data[count].name } );
          count++;
        }   
      },
      function(error) {
        console.log('The ajax request failed: ' + error);
      }
    ); 
  }
};
this.exports = ScoutsScreen; 

menu.on('select', function(e) {
  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
  var ajax = require('ajax');
  console.log('https://api.pinocc.io/v1/'+troop+'/scouts?token=ad585460354b33f1eb2e289835df4401');
  ajax({ url: 'https://api.pinocc.io/v1/'+troop+'/scouts?token=ad585460354b33f1eb2e289835df4401', type: 'json' },
    function(data) {
      
        ScoutControl.loadScout(troop, parseInt(data.data[e.itemIndex].id), data.data[e.itemIndex].name);
    }
  );
});