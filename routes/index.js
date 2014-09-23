module.exports = function Route(app){
	// we'll hold onto the current users in the app by using a JS object as such:
	var pirates = {}


	// since this is a SPA (single page application, we'll only need the default http route...Happiness!)
	app.get('/', function(req, res){
		res.render('index');
	})

	app.io.route('thar_be_a_new_user', function(req){
		console.log("THAR BE SOMEONE CONNECTIN!, SWAB THE POOP DECKS!");
		req.io.emit('current_list_o_pirates', pirates);
		pirates[req.sessionID] = {name: req.data.name, text: ''};
		// tell everyone else there is a new pirate aboard!
		req.io.broadcast('argh_new_pirate_aboard', {name: req.data.name, id: req.sessionID} )
	})

	app.io.route('thar_be_scribblin', function(req){
		req.io.broadcast("update_yer_scribbles", {text: req.data.scribbles, id: req.sessionID});
	})

	app.io.route('disconnect', function(req){
		delete pirates[req.sessionID];
		req.io.broadcast('someone_walked_the_plank', {id: req.sessionID});
	})
}