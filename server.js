// Dependencies
// ======================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =======================================================
var app = express();
//"process.env.PORT" lets the port be set by Heroku... if that doesn't exist, use local port specified 
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static(__dirname + "/app/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json({ type: 'application/*+json' }))

// Routing
// =======================================================
// Include apiRoutes and htmlRoutes in the server.js file
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Starts the server to begin listening
// ========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
