var express = require('express');
var router = express.Router();
// for db connection monk is used
var monk = require('monk');
// monk method connects with db in localhost port 27017 and db name
// db is database object
var db = monk('localhost:27017/VacayHome');
// on top of base url is api/reservations, reservations collection
// is accessed from db and shown
// db get will get collection from Studio 3T
// collection.find returns multiple objects
router.get('/', function (req, res) {
    var collection = db.get('reservations');
    collection.find({}, function (err, reservations) {
        if (err) throw err;
        res.json(reservations); // returns reservations as json obj
    });
});
// :id is the id specified in the url along with base url
// req.params.id will give query param and id will get the id
// findOne can only be used with id
// id is the search criteria 
// list all reservations of user
router.get('/:id', function (req, res) {
    var collection = db.get('reservations');
    collection.find({ UserId: req.params.id }, function (err, reservations) {
        if (err) throw err;
        res.json(reservations);
    });
});

//list a reservation of user given reservation id
router.get('/:id/:reservationid', function (req, res) {
    var collection = db.get('reservations');
    collection.find({ UserId: req.params.id, _id: req.params.reservationid }, function (err, reservations) {
        if (err) throw err;
        res.json(reservations);
    });
});

// add new reservation
router.post('/:id', function (req, res) {
    var collection = db.get('reservations');
    collection.insert({
        // ReservationId: req.body.ReservationId,
        PropertyId: req.body.PropertyId,
        PropertyTitle: req.body.PropertyTitle,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate,
        BookingDate: req.body.BookingDate,
        PricePerNight: req.body.PricePerNight,
        UserId: req.body.UserId

    }, function (err, reservations) {
        if (err) throw err;
        res.json(reservations);
    });
});


//update
router.put('/:id/:reservationid', function (req, res) {
    //req.body is used to read form input
    var collection = db.get('reservations');
    collection.update({ UserId: req.params.id, _id: req.params.reservationid },
        {
            $set: {
                PropertyId: req.body.PropertyId,
                PropertyTitle: req.body.PropertyTitle,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                BookingDate: req.body.BookingDate,
                PricePerNight: req.body.PricePerNight,
                UserId: req.body.UserId
            }
        }, function (err, reservations) {
            if (err) throw err;
            // if update is successfull, it will return updated object
            res.json("Reservation data updated");
        });
});

//delete
router.delete('/:id/:reservationid', function (req, res) {
    var collection = db.get('reservations');
    collection.remove({ UserId: req.params.id, _id: req.params.reservationid }, function (err, reservations) {
        if (err) throw err;
        res.json("Reservation deleted successfully");
    });
});

module.exports = router;