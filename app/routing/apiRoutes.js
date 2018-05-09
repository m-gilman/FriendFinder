// Require friends.js so that the data can be used here 
var friends = require("../data/friends.js");
var path = require('path');

module.exports = function (app) {
    // A GET route with the url `/api/friends`. Used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //API post request - after user submits data. Used to handle incoming survey results. 
    // & To handle the compatibility logic. 
    app.post('/api/friends', function (req, res) {

        // Goal: to return the best possible match (name and photo) back to the user 
        var bestMatch = {
            name: "",
            photo: "",
            // used to track the diff between the answers. 1000 is higher than possible so it's a good starting place
            friendDifference: 1000
        };

        //Take the result of the user's survey POST and parse it:
        var userData = req.body;

        var userScores = userData.scores;


        console.log("userScores: " + userScores);

        //This variable will calculate the diff between the user's scores and the scores of ea. user in the database
        var totalDifference = 0;

        //  Loop through all of the friends from friends.js (which is serving as the database).
        for (var i = 0; i < friends.length; i++) {
            console.log("friend in loop " + friends[i].name);
            totalDifference = 0;

            // Then loop through the array of scores for each friend 
            // Compare the users score and calculate the absolute difference (no negative #'s) between the two and push that to the total difference variable set above
            for (var j = 0; j < 10; j++) {

                //calculate the diff between the scores and add them to the totalDifference 
                console.log("userScores[j] " + userScores[j]);
                // Compare userScores for a specific question with the friend score for the same question
                console.log("friends[i].scores[j] " + friends[i].scores[j]);

                // We calculate the difference between the scores and sum them into the totalDifference
                // Math.abs turns any neg # to a pos #
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                console.log('totalDifference = ' + totalDifference);
                console.log('bestMatch.friendDifference =' + bestMatch.friendDifference);
                //if the difference is less than the differences of current best match (originally set to 1000)...  
                // Reset bestMatch to be that friend 
                if (totalDifference <= bestMatch.friendDifference) {

                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        //-------------------------------------------------------------------------------------
        // I think the above can be shortened using forEach... come back later and explore this
        // friends.forEach((friend) => {
        //     totalDifference = 0;
        //     friend.scores.forEach((score) => {
        //         console.log(score);
        //     });
        // });
        //-------------------------------------------------------------------------------------

        //Save the user's data to the database 
        //This has to happen AFTER the check or else the database will always return that the user is their own best friend
        friends.push(userData);

        //return a JSON with the user's bestMatch.
        res.json(bestMatch);
    });
}