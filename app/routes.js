var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

module.exports = router



// Branching


// Need or No Need to Certify branch


router.get('/check-documents-eligible', function (req, res) {

  // get the answer from the query string (eg. ?docformat=original)
  var docformat = req.query.docformat;

  if (docformat == "original"){

    // redirect to the relevant page
    res.redirect("/your-basic-details");

  } else {

    // if docformat is any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('check-documents-eligible');

  }

});


// Certified vs. Not Certified branch

router.get('/your-basic-details', function (req, res) {

  // get the answer from the query string (eg. ?certified=no)
  var certified = req.query.certified;

  if (certified == "no"){

    // redirect to the relevant page
    res.redirect("/get-document-certified");

  } else {

    // if certified is any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('your-basic-details');

  }

});



// UK address or not branch

router.get('/your-main-address-uk', function (req, res) {

  // get the answer from the query string (eg. ?certified=no)
  var is_uk = req.query.is_uk;

  if (is_uk == "false"){

    // redirect to the relevant page
    res.redirect("/international-main-address");

  } else {

    // if any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('your-main-address-uk');

  }

});



// DATA Capturing

// Populate the number in the selected address, UK, to mimic selection from postcode lookup
// Passing data into a page, dynamic version

router.get('/your-main-address-uk-selected', function (req, res) {

// get the answer from the query string (?number=1) and set it as a variable so you can use it
  var number = req.query.number;

// now send that variable to the page which has variable tags for number_display
  res.render('your-main-address-uk-selected', { 'number_display' : number });


});


// Get the full address for alternative choice page

router.get('/alternative-address', function (req, res) {

// get the answer from the query string (?number=1) and set it as a variable so you can use it

var full_name = req.query.full_name;
var organisation = req.query.organisation;
var house_name = req.query.house_name;
var street = req.query.street;
var town = req.query.town;
var county = req.query.county;
var postcode = req.query.postcode;
var country = req.query.country;


// now send that variable to the page which has variable tags xx_display
   res.render('alternative-address', { 'full_name_display' : full_name, 'organisation_display' : organisation, 'house_name_display' : house_name, 'street_display' : street, 'town_display' : town, 'county_display' : county, 'postcode_display' : postcode, 'country_display' : country,  });

});








