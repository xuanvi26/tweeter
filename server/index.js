"use strict";

// Basic express setup:

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
    db.collection('users').findOne({email: req.body.email}, (err, result) => {
      let resStatus = 403;
      if (err) throw err;
      //if (bcryot.compareSync (req.body.password, result.password))
      if (req.body.password === result.password) {
        resStatus = 200;
      }
      req.session.user = result._id;
      res.status(resStatus).redirect('/');
    })
  });
    
  app.post("/register", (req, res) => {
    let resStatus = 403;
    if(db.collection('users').findOne({email:req.body.email})) {
      res.status(resStatus).redirect('/');
    }
    let user = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    db.collection('users').insertOne(user);
    console.log('inserted', db.collections('users').find({email: req.body.email}));
    req.session.user = db.collections('users').find({email: req.body.email})._id;
  });

//hashedPassword: bcrypt.hashSync(req.body.password, 10)
  
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
