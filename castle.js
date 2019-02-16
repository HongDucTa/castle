var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var linkList = [];

function getDestinationPage()
{//1 Get the HTML page containing all destination from relaischateaux and store them in destinationList.html
    var siteLink = 'https://www.relaischateaux.com/fr/site-map/etablissements';
    request(siteLink,function (error,response,body){
        // get HTML page
        var doc = body.toString();
        doc = doc.split('<h3>France</h3>');
        doc = doc[1].split('</div>');
        doc = doc[0].split('</a>');
 
        doc = doc.toString()
    
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
        doc = finalLinks.toString();
        doc = doc.replace(/,/g,'\n');

        fs.writeFileSync('./destinationLinks.txt',doc);
        getHotelAndRestaurantListOnly('./destinationLinks.txt');
    }
    );
}

function checkIsBuilding(link)
{
    return link.includes('https://www.relaischateaux.com/fr/france/')
}

function getHotelAndRestaurantListOnly(file)
{ //3 Get only the hotel+restaurant links and store them in hotelAndRestaurantOnly.txt
    var linkList = String(fs.readFileSync(file)).split('\n');
    fs.writeFileSync('./hotelAndRestaurantOnly.json','[');
    var stream = fs.createWriteStream("./hotelAndRestaurantOnly.json", {flags:'a'});
    var compteur = 0;
    for (var i = 0;i < linkList.length;i++)
    {
        //checkIsRestaurantAndHotel(linkList[i],stream,i);
        /*
        request(linkList[i],function(error,response,body){
            var docContent = String(body);
            var link = linkList[i];
            if (docContent.includes('<span>Hôtel</span>'))
            {
                stream.write(link + '\n');
            }
            fs.writeFileSync('./response.json',String(response));
        })
        */
       var promise = new Promise(function(resolve,reject)
       {
           var link = linkList[i];
           request(link,function(error,response,body)
           {
               var docContent = String(body);
               if (docContent.includes('<span>Hôtel</span>') && docContent.includes('<span>Restaurant</span>'))
               {
                   var $ = cheerio.load(docContent);
                   resolve({
                       link: link,
                       name: ($('h3.mainTitle2').text()).split(' (')[0],
                       price: $('span.price').text()
                   });
               }
               else
               {
                   resolve(false);
               }
           })
       })

       promise.then(function(value)
       {
           if (value!=false)
           {
               var jsonHotel = JSON.stringify(value);
               console.log(jsonHotel);
               if (compteur == 0)
               {
                   stream.write('\n' + jsonHotel);
               }
               else
               {
                   stream.write(',\n' + jsonHotel);
               }
           }
           compteur = compteur + 1;
           console.log('Progress... ' + compteur + ' / ' + linkList.length);
           if (compteur === linkList.length)
           {
               stream.write('\n]');
           }
       })

    }
    return;
}

function checkIsRestaurantAndHotel(link,stream,i)
{// 4
    request(link,function(error,response,body){
        var docContent = String(body);
        if (docContent.includes('<span>Hôtel</span>'))
        {
            stream.write(link + '\n');
        }
    })
}

getDestinationPage();
//getHotelAndRestaurantListOnly('./destinationLinks.txt');