"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instance = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _localstorage = require("../helpers/localstorage.helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var instance = _axios["default"].create({
  baseURL: "http://localhost:3001/api",
  headers: {
    Authorization: "Bearer " + (0, _localstorage.getTokenFromLocalStorage)() || ""
  }
});

exports.instance = instance;