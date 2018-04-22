var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://a:a@ds255319.mlab.com:55319/licence', ['appointments'])

//get all
router.get('/appointments', function(req, res, next) {
    db.appointments.find(function(err, appointments) {
        if(err) {
            res.send(err);
        }
        res.json(appointments);
    })
});

//get one
router.get('/appointment/:id', function(req, res, next) {
    db.appointments.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, appointment) {
        if(err) {
            res.send(err);
        }
        res.json(appointment);
    })
});

//post 
router.post('/appointment', function(req, res, next){ 
    var appointment = req.body;
    if(!appointment.firstName || !appointment.lastName || !appointment.phoneNumber || 
    !appointment.hospitalName || !appointment.phoneNumber || !appointment.email || !appointment.syncedData){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.appointments.save(appointment, function(err, appointment) {
            if(err) {
                res.send(err);
            }
            res.json(appointment);
        });
    }
});

//delete one
router.delete('/appointment/:id', function(req, res, next) {
    db.appointments.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, appointment) {
        if(err) {
            res.send(err);
        }
        res.json(appointment);
    })
});

//update one - tbd
router.put('/appointment/:id', function(req, res, next) {
    var appointment = req.body;
    var updapp = {};
    if(appointment.firstName) {
        updapp.firstName = appointment.firstName;
    }
    if(appointment.lastName) {
        updapp.firstName = appointment.firstName;
    }
    db.appointments.update({_id: mongojs.ObjectId(req.params.id)}, updapp, {}, function(err, appointment) {
        if(err) {
            res.send(err);
        }
        res.json(appointment);
    })
});

module.exports = router;