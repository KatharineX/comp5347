var Revision = require("../models/revision")

module.exports.showTitleForm=function(req,res){
	res.render("titleForm.pug")
}

module.exports.showTitleFormAjax=function(req,res){
	res.render("titleFormAjax.pug")
}

module.exports.showGraphs=function(req,res){
	res.render("graphs.pug")
}

module.exports.getData=function(req,res){
	var val = {'Nitrogen': 0.78, 'Oxygen': 0.21, 'Other': 0.01}
	res.json(val);
}

module.exports.getLatestRevs=function(req,res){
	title = req.query.title;
    // console.log(title);

	Revision.findTitleLatestRevs(title, 3, function(err, result){
		if (err){
			console.log("Cannot find " + title + "'s latest revisions!")
		}else{
			// console.log(result)
			revision = result[0];
			// console.log("latest: ", revision)
			res.render('revision.pug',{title: title, revision:revision})
		}	
	})
}
