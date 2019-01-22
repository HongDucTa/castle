var request = require('request');
var fs = require('fs');

var linkList = [];

function getDestinationPage()
{
    var siteLink = 'https://www.relaischateaux.com/fr/site-map/etablissements';
    request(siteLink,function (error,response,body){
        // get HTML page
        fs.writeFileSync('./destinationList.html',body);
        getHotelList();
    }
    );
}

function checkIsBuilding(link)
{
    return link.includes('https://www.relaischateaux.com/fr/france/')
}

function getHotelList()
{
    var doc = fs.readFileSync('./destinationList.html').toString();
    var docFrance = doc.split('<h3>France</h3>');
    var docDiv = docFrance[1].split('</div>');
    var tempDoc = docDiv[0].split('</a>');
    fs.writeFileSync('./destinationList.html',tempDoc);

    doc = fs.readFileSync('./destinationList.html').toString()

    var rowsList = doc.split('\n');
    var finalLinks = [];

    for (var i = 0;i < rowsList.length;i++)
    {
        if (rowsList[i].includes('<a href'))
        {
            finalLinks.push(rowsList[i].split('"')[1]);
        }
    }
    finalLinks = finalLinks.filter(checkIsBuilding);
    var t = finalLinks.toString();
    t = t.replace(/,/g,'\n');
    //console.log(t);
    fs.writeFileSync('./destinationLinks.txt',t);
}

getDestinationPage();