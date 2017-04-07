nodule.exports = {
  create: create,
  update: update,
  read: read
}

function create(req, res){
	json(req, res, function(req, res){
		var user = req.body;
		var salt = encryption.salt();
		var cryptedPassword = encryption.digest();
		db.run('INSERT INTO users (eid, email, firstName, lastName, cryptedPassword)'), [
		user.eid,
		user.email, 
		user.firstName,
		user.lastName,
		user.password
		], function(err) {
			if(err) {return;}
			res.statusCode(200);
			res.end("User Created");
		}
	});

}

function read(req, res, db) {
	var id = req.params.id;
	db.get('SELECT eid, email, firstName, lastName FROM user WHERE user_id=?', [id] , function(user) {
		res.setHeader("Content-Type", "text/json");
		res.end(JSON.stringify(user));
    });
}