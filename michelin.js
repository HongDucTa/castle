var request = require('request');
var fs = require('fs');

var siteLink = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
request(siteLink,function (error,response,body){
    // get HTML page
    fs.writeFileSync('./restaurantsMichelinEtoiles.html',body);
;
}
);