"use strict";

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

    tweetsRoutes.get("/", function(req, res) {
      DataHelpers.getTweets((err, tweets) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          let data = {};
          if (req.session.user) {
            data.username = req.session.user.username;
          }
          data.tweets = tweets;
          res.json(data);
        }
      });
    });

    tweetsRoutes.post("/", function(req, res) {
      if (!req.body.text) {
        res.status(400).json({ error: 'invalid request: no data in POST body'});
        return;
      }
      const user = {
          name: req.session.user.fullName,
          handle: '@' + req.session.user.username,
          avatars: req.session.user.avatars
      };
      const tweet = {
          user: user,
          content: {
            text: req.body.text
          },
          created_at: Date.now()
        };
        DataHelpers.saveTweet(tweet, (err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.status(201).send();
          }
        });
      });

  return tweetsRoutes;

};
