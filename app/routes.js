var express = require('express')
var router = express.Router()

// Session open and close stuff

var session = require('express-session');


// Initialising router - put at start
router.use('*',  function(req, res, next) {

  if (req.session.EXAMPLE){
    console.log("There is session data" +  req.session.EXAMPLE );
    next();
  } else {
    console.log("no vars");
  req.session.EXAMPLE = "";


// initialise other vars 
    next(); // moves to next router
}

});

//THE BIG RESET FUNCTION!
router.get('/index', function (req, res) {
  //resetAll();
  req.session.destroy();
  console.log("reset");
  res.render('index');

});

// I link to this to wipe the prototype from any page and return back
// Quick reset to clear variables and remove any query string
router.get('/reset', function(req, res){
req.session.destroy();
  var backURL=req.header('Referer') || '/';
  backURL = backURL.split("?").shift();
  // do your thang
  res.redirect(backURL);
});






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


// Get your basic details data


router.get('/your-main-address-details', function (req, res) {

// get the answer from the query string (?number=1) and set it as a variable so you can use it

var first_name = req.query.first_name;
var last_name = req.query.last_name;
var telephone = req.query.telephone;
var email = req.query.email;



// now send that variable to the page which has variable tags xx_display - in this case set as hidden inputs so I can reuse and pass it down to next page
   res.render('your-main-address-details', { 'first_name_display' : first_name, 'last_name_display' : last_name, 'telephone_display' : telephone, 'email_display' : email });

});





// UK address or not branch

router.get('/your-main-address-uk', function (req, res) {

  // get the answer from the query string (eg. ?certified=no)
  

// need to repeat this lot here as using the variables in the redirect query string; normally would not need to repeat it all
var first_name = req.query.first_name;
var last_name = req.query.last_name;
var telephone = req.query.telephone;
var email = req.query.email;


  var is_uk = req.query.is_uk;

  if (is_uk == "false"){

    // redirect to the relevant page; you have to rebuild all the query string for redirects otherwise it gets lost
    res.redirect("/international-main-address?first_name=" + first_name + "&last_name="  + last_name + "&telephone="  + telephone + "&email="  + email );

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
   res.render('alternative-address', { 'full_name_display' : full_name, 'organisation_display' : organisation, 'house_name_display' : house_name, 'street_display' : street, 'town_display' : town, 'county_display' : county, 'postcode_display' : postcode, 'country_display' : country });

});





// Try this session version instead - for session test files

router.get('/session-test', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];


// If you ever need to route based on a number value this does that job
//      if (Number(req.query[propName]) != NaN && Number(req.query[propName]) > 0  ){
//        switch (propName){
//          case "moneyOwnValue":  return  res.redirect("/full/online/assets/money/index#own-value"); next(); break;
//         case "moneyJointValue": return  res.redirect("/full/online/assets/money/index#joint-value"); next(); break;
//        } 
//        }
 

    }
  }


  var is_uk = req.session.is_uk;

  if (is_uk == "false"){

    res.redirect("/international-main-address");

  } else {

    // if any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('session-test', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'       : req.session.email,
  });

  }


// safe version  - this works alone at this point if no branching required
//  res.render('session-test', {
//    'first_name'     : req.session.first_name,
 //   'last_name'   : req.session.last_name,
  //  'telephone'   : req.session.telephone,
 //   'email'   : req.session.email,
//  });


});



// Try this session version - calling data captured above on the next page , via session. No need to keep reposting it page to page

router.get('/session-test-next', function(req, res, next){

  res.render('session-test-next', {
    'first_name'     : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email,

  });
});





