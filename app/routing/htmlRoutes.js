// `htmlRoutes.js` file includes two routes:
//    * A GET Route to `/survey` which displays the survey page.
//    * A default, catch-all route that leads to `home.html` which displays the home page. 
var path = require("path");

// in my export, pass in app -which refers to express
module.exports = function (app) {
    // when the user hits url /survey, deliver survey.html page 
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    // when the user uses the app and the url has no endpoints, deliver home.html page
    app.use("/", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
}



