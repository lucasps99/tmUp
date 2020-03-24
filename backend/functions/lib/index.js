"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*imports*/
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
//import * as expressSession from 'express-session';
const bodyParser = require("body-parser");
const serviceAccount = require("../permissions.json");
/*end-of-imports*/
/*configuration*/
const app = express();
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tmup-908e4.firebaseio.com"
});
app.use(cors({ origin: true }));
/*app.use( expressSession({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*end-of-configuration */
//Per correr el development server => npm run serve dins de la carpeta de functions
/* --- before all requests --- */
/*
app.use((req, res, next) => {
  const token = req.headers.token;
  admin.auth.verifyIdToken(token)
  .then((payload : any) => {
    next(payload);
  })
  .catch((error: any) =>{
    res.status(401).send("Unauthorized");
  } );
});
*/
/* --- end of before all requests --- */
/* --- begin of routes --- */
const usersHandler = require('./Users/Users');
app.use('/users', usersHandler);
const teamsHandler = require('./Teams/Teams');
app.use('/teams', teamsHandler);
const membershipHandler = require('./Users/Membership');
app.use('/membership', membershipHandler);
/* --- end of routes --- */
exports.app = functions.https.onRequest(app);
/*
exports.onUserCreate = functions.auth.user().onCreate((user) => {

});

exports.onUserDelete = functions.auth.user().onDelete((user) => {

});
*/ 
//# sourceMappingURL=index.js.map