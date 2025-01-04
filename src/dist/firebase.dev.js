"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.database = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _database = require("firebase/database");

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
var app = (0, _app.initializeApp)(firebaseConfig);
var database = (0, _database.getDatabase)(app);
exports.database = database;
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;