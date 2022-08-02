var express = require('express')
var controller = require('../controllers/revision.server.controller')
var router = express.Router()

router.get('/revision', controller.showTitleForm)
router.get('/revision/getLatest', controller.getLatestRevs)

router.get('/revisionajax', controller.showTitleFormAjax)
router.get('/revisionajax/getLatest', controller.getLatestRevs)

router.get('/gchart', controller.showGraphs)
router.get('/gchart/getData', controller.getData)

module.exports = router