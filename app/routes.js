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


