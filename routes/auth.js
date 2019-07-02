var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = express();
var model = require('../models/index');
var bodyParser = require('body-parser');

router.post('/login', async function(req,res) {
	model.User.findOne({
		where: {
			email:req.body.email
		}
	})
	.then(async function(user){
		if(user == null) {
			res.send({'message':'User not found'})
		} else {
			if(user.password == req.body.password){
				await jwt.sign({id:user.id,email:user.email},'testtest', function(err, token){
					res.send({'data':{token:token,user:user}})
					console.log(token)					
				})
				res.send(token)
			} else {
				res.send({'message':'Wrong password'})
			}
		}
	})
	.catch(function(e){
		console.log(e)
	})
})

// router.post('/login2', function(req,res) {
// 	model.User.findOne({where:{email:req.body.email}})
// 	.then(async function(user){
// 		var token = await jwt.sign({email:'test@test.com'},'testtest')
// 		return res.send({'token':token})
// 	})
// })

module.exports = router;
