"use strict";

const userHelper    = require("./lib/util/user-helper")

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY]
}));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  app.use("/tweets", tweetsRoutes);

  app.post("/login", (req, res) => {
    DataHelpers.getUser(req.body.email, (err, result) => {
      if (err) throw err;
      if (bcrypt.compareSync (req.body.password, result.password)) {
        req.session.user = {
          username: result.username, 
          fullName: result.fullName, 
          id: result._id,
          avatars: result.avatars
        };
        res.json({username: result.username, id: result._id});
      } else {
        res.status(401);
        res.json();
      }
    })
  });
    
  app.post("/register", (req, res) => {
    DataHelpers.getUser(req.body.emai, (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(401);
        res.json();
      }
      else {
        let user = {
          username: req.body.username,
          fullName: req.body.fullName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          avatars: userHelper.generateRandomUser().avatars
        };
        DataHelpers.insertUser(user, (err, result) => {
          if (err) throw err;
            req.session.user = {
              username: user.username, 
              fullName: user.fullName, 
              id: result.insertedId,
              avatars: user.avatars,
          };
          res.json({username: user.username, id: result.insertedId});
        });
      };
    });
  });

  app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });

  app.post("/like/:id", (req, res) => {
    
  });
  
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
