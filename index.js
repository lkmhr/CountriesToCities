var express = require('express');
var app = express();
var jsonfile = require('jsonfile');

var filePath = './data_source/data.json';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get([
    '/getCountry',
    '/country/',
    '/country/contains/:contains',
    '/country/as/:type',
    '/country/contains/:contains/as/:type',
    '/country/as/:type/contains/:contains/'
  ], function(request, response) {

  //make query case-insensitive
  for (var key in request.query) {
    request.query[key.toLowerCase()] = request.query[key];
  }

  //make params case-insensitive
  for (var key in request.params) {
    request.params[key.toLowerCase()] = request.params[key];
    console.log(request.params[key]);
  }

  var reqParam = {
    type: request.query.type || request.params.type,
    contains: request.query.contains || request.params.contains
  }

  var outputJSON = {
    source: "heroku",
    credit: "visit https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json for data"
  };

  console.log(reqParam.contains);

  //cheeck type
  if(reqParam.type =='array'
    || reqParam.type =='object'
    || reqParam.type == null
    || reqParam.type == '' ) {
    jsonfile.readFile(filePath,function(err, obj){
      // console.error(err)
      if(err != null || typeof obj == 'undefined') {
        outputJSON["error"] = "unable to reach database";
      } else {
        var list = [];
        for(var key in obj){

          if(reqParam.contains == null || (key.toLowerCase().indexOf(reqParam.contains.toLowerCase()) > -1)){
            if(reqParam.type == 'array')
              list.push(key);
            else
              list.push({"name":key});
          }
        }
        outputJSON["data"] = list;
      }

      response.json(outputJSON);
    });
  } else {
    outputJSON["error"] = "invalid type specified";
    response.json(outputJSON);
  }
});

app.get(['/getCity','/city/in/:country'], function(request, response) {

  //make query case-insensitive
  for (var key in request.query) {
    request.query[key.toLowerCase()] = request.query[key];
  }

  //make params case-insensitive
  for (var key in request.params) {
    request.params[key.toLowerCase()] = request.params[key];
  }

  var reqParam = {
    country: request.query.country || request.params.country
  }

  var outputJSON = {
    source: "heroku",
    credit: "visit https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json for data"
  };

  console.log(reqParam.country);

  //cheeck type
  if( reqParam.country != null && reqParam.country != '') {
    jsonfile.readFile(filePath,function(err, obj) {

      if( err != null || typeof obj == 'undefined' ) {
        outputJSON["error"] = "unable to reach database";
      } else {
        var list = {};
        for(var key in obj) {
          if(reqParam.country.toLowerCase() == key.toLowerCase()){
            list[key] = obj[key];
            break;
          }
        }
        outputJSON["data"] = list;
      }
      response.json(outputJSON);
    });
  } else {
    outputJSON["error"] = "no/invalid country specified";
    response.json(outputJSON);
  }
});

//The 404 Route
app.get('*', function(request, response){
  var outputJSON = {
    source: "heroku",
    credit: "visit https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json for data",
    error: "404 - the url is wrongly formatted."
  };
  response.json(outputJSON);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
