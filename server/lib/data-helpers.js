"use strict";

module.exports = function makeDataHelpers(db) {
  return {
  
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet)
      .then(result => callback(null, true))
      .catch(err => callback(true, null))
    },

    getTweets: function(callback) {
      db.collection("tweets")
        .find()
        .toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
    }
  };
};
