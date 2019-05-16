require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api") 
var spotify = new Spotify(keys.spotify)

var command = process.argv[2];
var argument = process.argv.slice(3).join("+");

switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
};

function concertThis() {
    if (!argument) {
        argument = "Migos";
    }
    axios.get("https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            console.log(`Name: ${response.data[i].venue.name}`);
            console.log(`Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`);
            console.log(`Date: ${moment(response.data[i].datetime).format("L")}`);
        }
        
    })
};

function spotifyThis() {
    if (!argument) {
        argument = "Pop Out";
    }
    spotify.search({type: "track", query: argument}, function(err, data) {
        if (err) {
            console.log(err);
        }
        var userInput = data.tracks.items;
        console.log(`Artist: ${userInput[0].artists[0].name}`);
        console.log(`Song Name: ${userInput[0].name}`);
        console.log(`Preview Link: ${userInput[0].preview_url}`);
        console.log(`Album: ${userInput[0].album.name}`);
    });
};

function movieThis() {
    if (!argument) {
        argument = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>, it's on Netflix!");
    }
    axios.get("http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        console.log(`Title: ${response.data.Title}`);
        console.log(`Year Released: ${response.data.Year}`);
        console.log(`IMDB rating: ${response.data.imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
        console.log(`Country/Countries Produced: ${response.data.Country}`);
        console.log(`Language: ${response.data.Language}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Cast: ${response.data.Actors}`);
    });
};



