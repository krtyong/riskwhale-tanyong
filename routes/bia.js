const router = require('express').Router();
const NormalFunctionalDepartment = require('../models/NormalFunctionalDepartment');
const EmerFunctionalDepartment = require('../models/EmerFunctionalDepartment');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const Company = require('../models/Company');

router.get('/:department', jsonParser, (req, res) => {
    res.send('welcome to /:department');
})

router.post('/:department/normal-situation', jsonParser, async (req,res) => {

    const companyID = req.body._id;
    const foundone = await Company.findById(companyID, (err, data) => {
        if(err) {
            res.send({ message: err })
        } else {
            // console.log(data)
            res.send('found')
            console.log(data.functionalDepartmentsEmer)
        }
    });

    const functionalAreaNormal = new NormalFunctionalDepartment({
        id_company: req.body._id,
        normalSituation: {
            objective: req.body.objective,
            department: req.body.department,
            activities: req.body.activities
        }
    });

    // save to database, return a promise
    try {
        const savedPost = await functionalAreaNormal.save();
        // res.json(savedPost);
        res.send('posted');
    } catch(err) {
        res.json( { message: err });
    }
});

router.post('/:department/emer-situation', jsonParser, async (req,res) => {
    // create a new user
    const functionalDepartmentsEmer = new EmerFunctionalDepartment({
        id_company: req.body._id,
        normalSituation: {
            objective: req.body.objective,
            department: req.body.department,
            activities: req.body.activities
        }
    });

    // save to database, return a promise
    try {
        const savedPost = await functionalDepartmentsEmer.save();
        res.json(savedPost);
    } catch(err) {
        res.json( { message: err });
    }
});

// each department's mtpd
router.post('/:department/mtpd', jsonParser, async (req,res) => {

});

// each department's rto
router.post('/:department/rto', jsonParser, async (req,res) => {
    
});

// company's mtpd
router.post('/mtpd', jsonParser, async (req,res) => {

});

// company's rto
router.post('/rto', jsonParser, async (req,res) => {

});

module.exports = router;