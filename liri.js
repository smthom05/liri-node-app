// Make our global variables and grab our API's

var keys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var spotify = require("node-spotify-api");
var inquirer = require("inquirer");


inquirer
  .prompt([{
    type: "input",
    name: "userInput",
    message: "Hi, I'm Liri! What would you like to do?"
  }])
  .then(function(inquirerResponse) {
    if (inquirerResponse.userInput === "node liri my-tweets") {
      client.get('search/tweets', {
        q: 'node.js'
      }, function(error, tweets, response) {
        console.log(tweets);
      });
    };
  });
