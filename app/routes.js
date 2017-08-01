var express = require('express')
var router = express.Router()

// Session open and close stuff

var session = require('express-session');


// Initialising router - put at start
router.use('*',  function(req, res, next) {

  if (req.session.first_name){
    console.log("There is session data, e.g. first_name: " +  req.session.first_name );
    next();
  } else {
    console.log("no vars in session");
  req.session.first_name = "";


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

// Link to this to wipe the prototype from any page and return back
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



// BASIC BRANCHING


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



// UK address or not branch, successful address

router.get('/your-main-address-uk', function (req, res) {

  // get the answer from the query string (eg. ?certified=no)
  
  var is_uk = req.query.is_uk;

  if (is_uk == "false"){

    // redirect to the relevant page; you have to rebuild all the query string for redirects otherwise it gets lost
    res.redirect("/international-main-address");

  } else {

    // if any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('your-main-address-uk');

  }

});





// UK address or not branch, unsuccessful return address

router.get('/your-alternative-address-uk', function (req, res) {

  // get the answer from the query string (eg. ?certified=no)
  
  var is_uk = req.query.is_uk;

  if (is_uk == "false"){

    // redirect to the relevant page; you have to rebuild all the query string for redirects otherwise it gets lost
    res.redirect("/international-alternative-address");

  } else {

    // if any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('your-alternative-address-uk');

  }

});


// END BASIC BRANCHING



// START SESSION TEST FILES

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

    res.redirect("/session-test-branch-nonuk");

    router.get('/session-test-branch-nonuk', function(req, res, next){

  res.render('session-test-branch-nonuk', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'       : req.session.email,

  });
});


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
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'       : req.session.email,

  });
});


// END SESSION TEST FILES




// START SESSION VERSION OF STANDARD APPLICATION


// Capture user details
// 1. Store the data in session
router.get('/your-main-address-details', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


// 2. Render the page, with data variables if needed
 res.render('your-main-address-details');

});



// Capture house number selected in dropdown
// 1. Store the data in session
router.get('/your-main-address-uk-selected', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


// 2. Render the page, with any data variables if needed
 res.render('your-main-address-uk-selected', {
    'number'     : req.session.number,
    'first_name' : req.session.first_name,
    'last_name'  : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email 
  });

});


// Get name into the manual address entry option too
router.get('/your-main-address-manual', function(req, res, next){

  res.render('your-main-address-manual', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email 
  });
});



// Get name into the international address entry option too
router.get('/international-main-address', function(req, res, next){

  res.render('international-main-address', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email 
  });
});



// Capture full address submitted,  the standard successful address
// 1. Store the data in session
router.get('/alternative-address', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


// 2. Render the page, with data variables if needed
 res.render('alternative-address', {
    'full_name'     : req.session.full_name,
    'organisation'  : req.session.organisation,
    'house_name'    : req.session.house_name,
    'street'        : req.session.street,
    'town'          : req.session.town,
    'county'        : req.session.county,
    'postcode'      : req.session.postcode,
    'country'       : req.session.country,
    'delivery_email'     : req.session.delivery_email,
    'delivery_telephone' : req.session.delivery_telephone
  });

});


// ALTERNATE, UNSUCCESSFUL RETURN ADDRESS
// Capture house number selected in dropdown, unsuccessful return address
// 1. Store the data in session
router.get('/your-alternative-address-uk-selected', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


// 2. Render the page, with any data variables if needed
 res.render('your-alternative-address-uk-selected', {
    'number'     : req.session.number,
    'first_name' : req.session.first_name,
    'last_name'  : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email 
  });

});


// Get name into the manual address entry option too
router.get('/your-alternative-address-manual', function(req, res, next){

  res.render('your-alternative-address-manual', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email 
  });
});



// Get name into the international address entry option too
router.get('/international-alternative-address', function(req, res, next){

  res.render('international-alternative-address', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'   : req.session.email 
  });
});



// Combo of data capture and branching, at point of same or different address question
// 1. Store the data in session - this one is just getting the is_same value to use as redirector and for summary page later
router.get('/same-or-different-router', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];

    }
  }

// 2. Do branching

  var is_same = req.session.is_same;

  if (is_same == "false"){

    res.redirect("/your-alternative-address-details");


  } else {

    // if any other value (or is missing) render the page requested. No slash beforehand is essential to render
    res.render('how-many-documents');

  }


});



// Need to also grab the alternate address details which are posted to this page via alternative address route
router.get('/how-many-documents', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }

    res.render('how-many-documents');

});

// Capture document number for later, documentCount, posted to this page
router.get('/postage-send-options', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }

// Need this for in-page logic about send options and pricing
    res.render('postage-send-options', {
      'country'        : req.session.country,
        });

});



// Capture send options for later, send_postage, posted to this page
router.get('/postage-return-options', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }

    res.render('postage-return-options');

});


// Capture return options for later, return_postage, posted to this page
router.get('/additional-information', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }

    res.render('additional-information');

});




// Build the alt address include for review summary page, if needed
router.get('/includes/address_alt', function(req, res, next){

  res.render('includes/address_alt', {
    'full_name_alt'     : req.session.full_name_alt,
    'organisation_alt'  : req.session.organisation_alt,
    'house_name_alt'    : req.session.house_name_alt,
    'street_alt'        : req.session.street_alt,
    'town_alt'          : req.session.town_alt,
    'county_alt'        : req.session.county_alt,
    'postcode_alt'      : req.session.postcode_alt,
    'country_alt'       : req.session.country_alt
  });
});




// The Big Daddy - review page
// 1. Store the data in session - a couple of extra fields from additional info to capture
router.get('/review-summary', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


var documentscost = req.session.documentCount * 30;
req.session.documentscost = documentscost;


// 2. Render the page, with any data variables if needed
 res.render('review-summary', {
    'first_name'  : req.session.first_name,
    'last_name'   : req.session.last_name,
    'telephone'   : req.session.telephone,
    'email'       : req.session.email,
    'full_name'     : req.session.full_name,
    'organisation'  : req.session.organisation,
    'house_name'    : req.session.house_name,
    'street'        : req.session.street,
    'town'          : req.session.town,
    'county'        : req.session.county,
    'postcode'      : req.session.postcode,
    'delivery_email'     : req.session.delivery_email,
    'delivery_telephone' : req.session.delivery_telephone,
    'country'       : req.session.country,    
    'documentCount'     : req.session.documentCount,
    'documentscost'     : req.session.documentscost,
    'send_postage'      : req.session.send_postage,
    'return_postage'    : req.session.return_postage,
    'customer_ref'      : req.session.customer_ref,
    'feedback_consent'  : req.session.feedback_consent,
    'is_same'      : req.session.is_same,
    'full_name_alt'     : req.session.full_name_alt,
    'organisation_alt'  : req.session.organisation_alt,
    'house_name_alt'    : req.session.house_name_alt,
    'street_alt'        : req.session.street_alt,
    'town_alt'          : req.session.town_alt,
    'county_alt'        : req.session.county_alt,
    'postcode_alt'      : req.session.postcode_alt,
    'country_alt'       : req.session.country_alt,
    'delivery_email_alt'     : req.session.delivery_email_alt,
    'delivery_telephone_alt' : req.session.delivery_telephone_alt,

  });

});




// Get email into the confirmation page 
router.get('/submit-application', function(req, res, next){

  res.render('submit-application', {
    'email'  : req.session.email
  });
});




// START additional payments stuff v1

//THE BIG RESET FUNCTION!
router.get('/additional-payments', function (req, res) {
  //resetAll();
  req.session.destroy();
  console.log("reset");
  res.render('additional-payments');

});


// 1. Store the data in session - a couple of extra fields from additional info to capture
router.get('/additional-payments-confirm', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


// 2. Calculate the cost and then store that in session
// For this we need the number of documents, and the postage choice, then add them together

var documentscost = req.session.numberofdocuments * 30;

 if (req.session.postagechoice == "uk"){

 var postagecost = 5.50;

  } else if (req.session.postagechoice == "europe") {

 var postagecost = 14.50;

  }  else if (req.session.postagechoice == "rest-of-world") {

 var postagecost = 25;

  }   else {

 var postagecost = 0;

  }

var totalcost = documentscost + postagecost;

// sort the decimals out so you get e.g 35.50 instead of 35.5
var totalcost2decimals = totalcost.toFixed(2);

// save this to the session so I can use it wherever needed beyond this particular page
req.session.totalcost2decimals = totalcost2decimals;

// 3. Render the page, with any data variables if needed
 res.render('additional-payments-confirm', {
    'totalcost2decimals'   : totalcost2decimals,
    'numberofdocuments'  : req.session.numberofdocuments,
    'postagechoice'  : req.session.postagechoice
  });

});



// 4. Get email and other variabels into the additional payment confirmation page 
router.get('/additional-payments-done', function(req, res, next){

  res.render('additional-payments-done', {
    'additionalpaymentsemail'  : req.session.additionalpaymentsemail,
    'totalcost2decimals'   : req.session.totalcost2decimals,
    'numberofdocuments'  : req.session.numberofdocuments,
    'postagechoice'  : req.session.postagechoice
  });
});


// END additional payments v1 stuff




// START additional payments stuff v2

//THE BIG RESET FUNCTION!
router.get('/additional-payments2', function (req, res) {
  //resetAll();
  req.session.destroy();
  console.log("reset");
  res.render('additional-payments2');

});


// 1. Store the data in session - a couple of extra fields from additional info to capture
router.get('/additional-payments2-confirm', function(req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


// 2. Render the page, with any data variables if needed
 res.render('additional-payments2-confirm', {
    'paymenttotal'   : req.session.paymenttotal
  });

});


// 3. Get email and other variables into the additional payment confirmation page 
router.get('/additional-payments2-done', function(req, res, next){

  res.render('additional-payments2-done', {
    'additionalpaymentsemail'  : req.session.additionalpaymentsemail,
    'paymenttotal'   : req.session.paymenttotal
  });
});


// END additional payments v2 stuff



// TODO
// Review summary - alt address logic, get that include working
// Postage address at end driven by send choice
// Postage options driven by country
// calculation for review summary page using number example in sessions test


