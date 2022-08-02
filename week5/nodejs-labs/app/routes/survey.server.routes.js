const e = require('express');
var express = require('express')
var controller = require('../controllers/survey.server.controller')
var router = express.Router();

router.get('/', controller.showForm);
router.post('/survey', controller.showResult);
module.exports = router;

var surveyResults = req.app.locals.surveyResults;

sess= req.session;

if(sess && "vote" in sess){
    res.render('votedsurveyresult.ejs', {products: products, surveyresults: surveyresults});

}else{
    sess.vote = voteIdx

    surveyresults[gender][voteIdx]++;

    res.render('surveyresults.ejs', {products:products, surveyResults:surveyResults});
}