"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTokenFromLocalStorage = getTokenFromLocalStorage;
exports.setTokenToLocalStorage = setTokenToLocalStorage;
exports.removeTokenFromLocalStorage = removeTokenFromLocalStorage;

function getTokenFromLocalStorage() {
  var data = localStorage.getItem("token");
  var token = data ? JSON.parse(data) : "";
  return token;
}

function setTokenToLocalStorage(key, token) {
  localStorage.setItem(key, JSON.stringify(token));
}

function removeTokenFromLocalStorage(key) {
  localStorage.removeItem(key);
}