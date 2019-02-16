var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var linkList = [];

function getHotelsJson()
{// Get the HTML page containing all destinations from relaischateaux and store them in destinationLinks.txt
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
{  // Get only the hotel+restaurant information and store them in hotelAndRestaurantOnly.json
    var linkList = String(fs.readFileSync(file)).split('\n');
    fs.writeFileSync('./hotelAndRestaurantOnly.json','[');
    var stream = fs.createWriteStream("./hotelAndRestaurantOnly.json", {flags:'a'});
    var compteur = 0;
    var firstFound = true;
    for (var i = 0;i < linkList.length;i++)
    {
       var promise = new Promise(function(resolve,reject)
       {
           var link = linkList[i];
           request(link,function(error,response,body)
           {
               var docContent = String(body);
               if (docContent.includes('<span>Hôtel</span>') && docContent.includes('<span>Restaurant</span>'))
               {
                   var $ = cheerio.load(docContent);
                   var fullName = ($('h3.mainTitle2').text()).split(' (');
                   var place = fullName[1].split(')')[0];
                   var michelinLink = 'https://restaurant.michelin.fr/restaurants/' + place + '/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
                   resolve({
                       link: link,
                       name: fullName[0],
                       place: place,
                       michelinStarredRestaurantLink: michelinLink,
                       price: $('span.price').text(),
                       imageHeaderLink: 'https:' + $('img.hotelHeader-img').attr('data-src')
                   });
               }
               else
               {
                   resolve(false);
               }
           })
       });

       promise.then(function(value)
       {
           if (value!=false)
           {
               var jsonHotel = JSON.stringify(value);
               if (firstFound === true)
               {
                   stream.write('\n' + jsonHotel);
                   firstFound = false;
               }
               else
               {
                   stream.write(',\n' + jsonHotel);
               }
           }
           compteur = compteur + 1;
           console.log('Fetching hotels... ' + compteur + ' / ' + linkList.length);
           if (compteur === linkList.length)
           {
               stream.write('\n]');
           }
       });
    }
    return;
}

export default getHotelsJson;