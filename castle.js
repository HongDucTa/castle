
var adress = 'https://www.relaischateaux.com/fr/destinations/europe/france';
var request = require('request');
var fs = require('fs');

request(adress, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred

  var rowsList = [];
  rowsList = String(body).split('\n');
  
  var startJSONFound = false;
  var endJSONFound = false;
  var i = 0;
  var JSONcontent = "{\n";

  while (i < rowsList.length && endJSONFound === false)
  {
    if (startJSONFound === true && endJSONFound === false)
    {
      if (rowsList[i].includes('</script>'))
      {
        endJSONFound = true;
      }
      else
      {
        JSONcontent = JSONcontent + rowsList[i] + '\n';
      }
    }
    if (rowsList[i].includes('markers') && startJSONFound === false)
    {
      startJSONFound = true;
    }
    i = i + 1;
  }
  JSONcontent = JSONcontent.replace(/'/g,'"');
  fs.writeFileSync('./ResponseJSON.json',JSONcontent);
});