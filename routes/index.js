var express = require('express');
var router = express.Router();

// define a constructor to create vacation objects
let VacationObject = function (pID, pCity, pState, pCountry, pType, pVideo) {
  this.ID = pID;
  this.City = pCity;
  this.State = pState;
  this.Country = pCountry;
  this.ID = ServervacayArray.length +1;
  this.Type = pType;
  this.Video = pVideo;
}

let ServervacayArray = [];

ServervacayArray.push(new VacationObject("x1", "xSeattle", "Washington", "USA", "Resort", "https://www.earthcam.com/usa/washington/seattle/?cam=seattleskyline" ));
ServervacayArray.push(new VacationObject("x2", "xLondon", "England", "UK", "Museum/historical site", "https://www.earthcam.com/world/england/london/abbeyroad/?cam=abbeyroad_uk"));
ServervacayArray.push(new VacationObject("x3", "xSedona", "Arizona", "USA","Shopping site", "https://www.earthcam.com/usa/arizona/sedona/?cam=sedona_gateway"));
ServervacayArray.push(new VacationObject("x4", "xToronto", "Ontario", "Canada","Undetermined", "https://www.earthcam.com/world/canada/toronto/cntower/?cam=cntower1"));

console.log(ServervacayArray);

/* GET home page. */
router.get('/', function(req, res, next) {
 //res.render('index', { title: 'Express' });
 res.sendFile('index.html');
});

/* GET all Notes data */
router.get('/getAllvacayArray', function(req, res) {
  res.status(200).json(ServervacayArray);
});

// /* Add one new note */
router.post('/AddVacation', function(req, res) {
  const newVacation = req.body;  // get the object from the req object sent from browser
  console.log(newVacation);
  ServervacayArray.push(newVacation);  // add it to our "DB"  (array)
  // prepare a reply to the browser
  var response = {
    status  : 200,
    success : 'Updated Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

module.exports = router;
