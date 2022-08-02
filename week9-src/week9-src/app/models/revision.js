/**
 * 
 */
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
		})

RevisionSchema.statics.findTitleLatestRevs = function(title, limit, callback) {
	return this.find({'title':title})
	.sort({'timestamp':-1})
	.limit(limit)
	.exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'revisions')

module.exports = Revision