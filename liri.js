// Make our global variables and grab our API's

var keys = require("./keys.js");
var Twitter = require("twitter");
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");
// var inquirer = require("inquirer");

// This is our function for getting the user's tweets
var myTweets = function(newTweet) {

  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  var params = {
    screen_name: 'dubootcamp'
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var tweetCount = (tweets.length >= 20) ? 20 : tweets.length;

      // console.log(tweets);
      for (var i = 0; i < tweetCount; i++) {
        console.log("");
        console.log("My tweets: " + tweets[i].text);
        console.log("Tweet was created at: " + tweets[i].created_at);
      }
    };
  });
};

// This Function will run if the user does spotify-this-song
var spotifyThisSong = function(newSong) {

  var spotify = new Spotify({
    id: "e1f1ad29ae97429d857b2c048bc8ece9",
    secret: "e51fa0008e0249c8b048e25fe33650b1"
  });

  if (!newSong) {
    newSong = "The Sign Ace of Base";
  } else {
    spotify.search({
        type: 'track',
        query: newSong
      }),
      function(err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(response.tracks.items[0].album.artists[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].album.name);
      };
  };
};

// This function will run if they want to get movie information
var movieThis = function(newMovie) {
  if (!newMovie) {
    newMovie = "Mr. Nobody";
  }
  request("http://www.omdbapi.com/?t=" + newMovie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);

      console.log("Movie title: " + movie.Title);
      console.log("============================")
      console.log("Movie Rating: " + movie.imdbRating);
      console.log(movie.Title + " was released in the year " + movie.Year);
      console.log("Rotten Tomatos Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log(movie.Title + " was produced in " + movie.Country);
      console.log(movie.Title + " was recorded in " + movie.Language);
      console.log("Plot: " + movie.Plot);
      console.log("Actors: " + movie.Actors);
    };
  });
};

// This will be our do-what-it-says functionality
var doIt = function(newDo) {

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    let dataArr = data.split(",")
    console.log(dataArr);

    userInput(dataArr[0],dataArr[1]);
  });
};


var userInput = function(command, data) {

  switch (command) {

    case "spotify-this-song":
      spotifyThisSong(data);
      break;

    case "my-tweets":
      myTweets(data);
      break;

    case "movie-this":
      movieThis(data);
      break;

    case "do-what-it-says":
      doIt(data);
      break;
  };

  var newCommand = process.argv[2];

  if (process.argv[3]) {
    newCommand = newCommand + ",'" + process.argv[3] + "',";
  }

  fs.appendFile("log.txt", newCommand, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

userInput(process.argv[2], process.argv[3]);
