const router = require('express').Router();
const Ra = require('../models/RiskAssessment');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/:department', jsonParser, async(req, res) => {
    res.send('welcome to /:department');

    const companyID = req.body._id;
    // const foundone = await Company.findById(companyID) && await Company.findOne({ canvas.model : req.body.canvas.model});

    // if (foundone) {
    //     res.status(400).send('Already has this canvas model');
    // }

    const impactaverage = (req.body.canvas.impacts.financial + req.body.canvas.impacts.healthandsafety + req.body.canvas.impacts.naturalenv + req.body.canvas.impacts.socialheritage + req.body.canvas.impacts.government + req.body.canvas.impacts.legal)/6;
    const likelihood = req.body.canvas.likelihood;
    const score = impactaverage*likelihood;
    
    const ra = new Ra({
        id_company: companyID,
        canvas: {
            model: req.body.canvas.model,
            typeofrisks: req.body.canvas.typeofrisks,
            risk: req.body.canvas.risk,
            impacts: {
                financial: req.body.canvas.impacts.financial,
                healthandsafety: req.body.canvas.impacts.healthandsafety,
                naturalenv: req.body.canvas.impacts.naturalenv,
                socialheritage: req.body.canvas.impacts.socialheritage,
                government: req.body.canvas.impacts.government,
                legal: req.body.canvas.impacts.legal,
            },
            likelihood: req.body.canvas.likelihood,
            levelofacceptance: req.body.canvas.levelofacceptance,
            impactaverage: impactaverage,
            coordinate: [likelihood, impactaverage],
            score: score
        }
    });

    try {
        const savedPost = await ra.save();
        // res.json(savedPost);
        res.send({ user: user._id});
    } catch(err) {
        res.json( { message: err });
    }
});

router.post('/result', async(req, res) => {
    const result = await Ra.findAll({ id_company: req.body.id_company });

    try {
        res.send(result)
    } catch(err) {
        res.json( { message: err });
    }
});