"use strict";

const { ObjectID } = require("mongodb");

module.exports = function makeDataHelpers(db) {
  return {
  
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet)
      .then(result => callback(null, result))
      .catch(err => callback(err, null))
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
    },

    getUser: function(email, callback) {
      db.collection('users')
        .findOne({email})
        .then(result => callback(null, result))
        .catch(err => callback(err, null));
    },

    insertUser: function(user, callback) {
      db.collection('users')
      .insertOne(user)
      .then(result => callback(null, result))
      .catch(err => callback(err, null));
    },

    updateLikes: function(tweetId, userId, isLiked, callback) {
      const key = `likedBy.${userId}`;
      db.collection('tweets')
      .updateOne({_id: new ObjectID(tweetId)}, {$set: {[key]: isLiked}}, {upsert: true})
      .then(result => callback(null, result))
      .catch(err => callback(err, null));
    },

  };
};
