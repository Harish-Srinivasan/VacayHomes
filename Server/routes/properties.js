var express = require('express');
var router = express.Router();
// for db connection monk is used
var monk = require('monk');
// monk method connects with db in localhost port 27017 and db name
// db is database object
var db = monk('localhost:27017/VacayHome');
// on top of base url is api/properties, properties collection
// is accessed from db and shown
// db get will get collection from Studio 3T
// collection.find returns multiple objects
router.get('/', function (req, res) {
    var collection = db.get('properties');
    console.log(collection);
    collection.find({}, function (err, properties) {
        if (err) throw err;
        res.json(properties); // returns properties as json obj
    });
});
// :id is the id specified in the url along with base url
// req.params.id will give query param and id will get the id
// findOne can only be used with id
// id is the search criteria 
// get a property based on id
router.get('/:id', function (req, res) {
    var collection = db.get('properties');
    collection.findOne({ _id: req.params.id }, function (err, properties) {
        if (err) throw err;
        res.json(properties);
    });
});

// create
router.post('/', function (req, res) {
    var collection = db.get('properties');
    collection.insert({
        title: req.body.title,
        description: req.body.description,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        photo: req.body.photo,
        price: req.body.price,
        cleaningFee: req.body.cleaningFee,
        serviceFee: req.body.serviceFee,
        amenities: req.body.amenities,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        guests: req.body.guests,
        reviews: req.body.reviews,
        ratings: req.body.ratings,
        available: req.body.available,
        comments : req.body.comments
    }, function (err, properties) {
        if (err) throw err;
        res.json(properties);
    });
});

//update
router.put('/:id', function (req, res) {
    //req.body is used to read form input
    var collection = db.get('properties');
    collection.update({ _id: req.params.id },
        {
            $set: {
                description: req.body.description,
                cleaningFee: req.body.cleaningFee,
                serviceFee: req.body.serviceFee,
                amenities: req.body.amenities,
                bedrooms: req.body.bedrooms,
                guests: req.body.guests,
                comments : req.body.comments,
                ratings: req.body.ratings,
                reviews: req.body.reviews
            }
        }, function (err, properties) {
            if (err) throw err;
            // if update is successfull, it will return updated object
            res.json("Property data updated");
        });
});

//delete
router.delete('/:id', function (req, res) {
    var collection = db.get('properties');
    collection.remove({ _id: req.params.id }, function (err, properties) {
        if (err) throw err;
        res.json("Property deleted successfully");
    });
});

module.exports = router;