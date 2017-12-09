var express = require("express"),
	bodyParser = require("body-parser"),
	request = require("request"),
	mongoose = require("mongoose"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/movie-book");


var movieSchema = new mongoose.Schema({
	Title: String,
	Year: String,
	Rated: String,
	Released: String,
	Runtime: String,
	Genre: String,
	Director: String,
	Writer: String,
	Actors: String,
	Plot: String,
	Language: String,
	Country: String,
	Awards: String,
	Poster: String,
	Ratings: [
		{
			Source: String,
			Value: String,
		},
		{
			Source: String,
			Value: String,
		},
		{
			Source: String,
			Value: String,
		}
	],
	Metascore: String,
	imdbRating: String,
	imdbVotes: String,
	imdbID: String,
	Type: String,
	DVD: String,
	BoxOffice: String,
	Production: String,
	Website: String,
	Response: String,
});
var Movie = mongoose.model("Movie", movieSchema);




app.get("/", function (req, res) {
	res.redirect("/movieblog");
});

app.get("/movieblog", function (req, res) {
	Movie.find(function (err, allMovies) {
		if (err) {
			console.log("there has been an error loading");
			console.log(err);
		} else {
			res.render("index", { movies: allMovies });
		}
	});
});

app.post("/movieblog", function (req, res) {
	req.body.Plot = req.sanitize(req.body.Plot);
	Movie.create(req.body, function (err, newMovie) {
		if (err) {
			console.log("there was an error inserting");
			console.log(errr);
		} else {
			res.redirect("/movieblog");
		}
	});
});

app.get("/movieblog/new", function (req, res) {
	res.render("new");
});

app.get("/movieblog/:id", function (req, res) {
	var id = req.params.id;
	Movie.findById(id, function (err, foundMovie) {
		if (err) {
			console.log("there was an error finding");
			console.log(err);
		} else {
			res.render("show", { movie: foundMovie });
		}
	});
});

app.put("/movieblog/:id", function (req, res) {
	var id = req.params.id;
	req.body.Plot = req.sanitize(req.body.Plot);
	Movie.findByIdAndUpdate(id, req.body, function (err, updatedMovie) {
		if (err) {
			console.log("there was an error updating the movie");
			console.log(err);
		} else {
			res.redirect("/movieblog/" + req.params.id);
		}
	});
});

app.delete("/movieblog/:id", function(req, res){
	var id = req.params.id;
	Movie.findByIdAndRemove(id, function(err, removedMovie){
		if (err) {
			console.log("error removing the movie");
		} else {
			res.redirect("/movieblog");
		}
	});
});

app.get("/movieblog/:id/edit", function (req, res) {
	var id = req.params.id;
	Movie.findById(id, function (err, foundMovie) {
		if (err) {
			console.log("there was an error finding for edit");
			console.log(err);
		} else {
			res.render("edit", { movie: foundMovie });
		}
	});
});





app.listen(3000, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("SERVER IS LISTENING!!!");
	}
});