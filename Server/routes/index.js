var express = require('express');
var router = express.Router();

// This is a popular library for encoding and decoding JSON Web Tokens (JWT).
// JWT is a standard for securely transmitting information between parties as a JSON object.
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
// This is a library for performing password-based encryption
// Bcrypt is a secure hashing algorithm that is designed to be slow and resource-intensive, 
// making it more difficult for attackers to brute-force the hashes in order to recover the original passwords
const bcrypt = require('bcrypt');
// at least one uppercase letter, one lowercase letter, one digit, one special character, and is at least 6 characters long.
const regex = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})");

var monk = require('monk');
const { response } = require('express');
var db = monk('localhost:27017/VacayHome');
var collection = db.get('users');

router.get('/', function(req, res) {
	res.render('index', { title: 'Express'});

});

router.get('/HostHome', auth, function(req, res) {
	res.json({ message: "Welcome!!" } );

});

router.post('/register', async(req, res) => {
	try{
		const {username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		if(!(username && email && password)){
			res.status(422).json( { error: "All fields are required!" } );
		}
		else if(!regex.test(password)){
			res.status(422).json( { error: "Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character,at least one special character. The password must be six characters or longer" } );
		}
		else{

			collection.findOne({ email: email }, function(err, user){
				if (err) throw err;

				if (user){
					res.status(425).json({ error : "User already exists. Please login!"} );

				}
				else{
						let newUser = {
							name: username,
							email: email,
							password: hashedPassword,
							isHost: false

						}
						collection.insert(newUser, function(err, user){
					
                     		if (err) throw err;
					 		res.json(user);

						})
				}
			});	

		}
	}
	catch(err){
		console.log(err.stack);
	}

});
  
router.post('/login', async(req, res) => {
	try{
		const {email, password } = req.body;
		if(!(email && password)){
			res.status(422).json({ error: "All fields are required!" } );
		}
		const userData = await collection.findOne({ email: email });
		if(userData == null){
			res.status(425).json({ error: "User doesn't exist" } );
		}
		const isMatched = await bcrypt.compare(password, userData.password);
		if(isMatched){
			res.json(userData);
		}
		else{
			res.status(420).json( {error: "User email or password is incorrect!" } );
		}
	}
	catch(err){
		console.log(err.stack);
	}
});

router.post('/hostregister', async(req, res) => {
	try{
		const {username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		if(!(username && email && password)){

			res.status(422).json( { error: "All fields are required!" } );
		}
		else if(!regex.test(password)){
			res.status(422).json( { error: "Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character,at least one special character. The password must be five characters or longer" } );
		}
		else{

			collection.findOne({ email: email }, function(err, user){
				if (err) throw err;

				if (user){
					res.status(425).json({ error : "Host already exists. Please login!"} );

				}
				else{
						let newUser = {
							name: username,
							email: email,
							password: hashedPassword,
							isHost: true

						}
						collection.insert(newUser, function(err, user){
					
                     		if (err) throw err;
					 		res.json(user);

						})
				}
			});	

		}
	}
	catch(err){
		console.log(err.stack);
	}

});
  
router.post('/hostlogin', async(req, res) => {
	try{
		const {email, password } = req.body;
		if(!(email && password)){
			res.status(422).json({ error: "All fields are required!" } );
		}
		const userData = await collection.findOne({ email: email });
		if(userData == null){
			res.status(425).json({ error: "Host doesn't exist" } );
		}
		const isMatched = await bcrypt.compare(password, userData.password);
		console.log("req "+password);
		if(isMatched){
			res.status(200).json(userData);
		}
		else{
			res.status(420).json( {error: "Host email or password is incorrect!" } );
		}
	}
	catch(err){
		console.log(err.stack);
	}
});
  
module.exports = router;
