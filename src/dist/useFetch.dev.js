"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _UserContext = require("./context/UserContext");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useFetch = function useFetch() {
  var _useUserContext = (0, _UserContext.useUserContext)(),
      userId = _useUserContext.userId;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var fetchNotesHandler = (0, _react.useCallback)(function _callee(requestOptions, convertReceivedData) {
    var id, dinamicUrl, response, data, _id;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setIsLoading(true);
            id = requestOptions.id ? requestOptions.id : '';
            dinamicUrl = requestOptions.url ? requestOptions.url : "".concat(process.env.REACT_APP_FIREBASE_DATABASE_URL, "/").concat(userId, "/");
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(fetch("".concat(dinamicUrl).concat(id, ".json"), {
              method: requestOptions.method ? requestOptions.method : 'GET',
              headers: requestOptions.headers ? requestOptions.headers : {},
              body: requestOptions.body ? JSON.stringify(requestOptions.body) : null
            }));

          case 6:
            response = _context.sent;

            if (response.ok) {
              _context.next = 9;
              break;
            }

            throw new Error("Something went wrong :(");

          case 9:
            if (!(requestOptions.method === "GET")) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return regeneratorRuntime.awrap(response.json());

          case 12:
            data = _context.sent;
            convertReceivedData(data);

          case 14:
            if (!(requestOptions.method === "POST")) {
              _context.next = 19;
              break;
            }

            _context.next = 17;
            return regeneratorRuntime.awrap(response.json());

          case 17:
            _id = _context.sent;
            return _context.abrupt("return", _id);

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            setError(_context.t0.message);

          case 24:
            _context.prev = 24;
            setIsLoading(false);
            return _context.finish(24);

          case 27:
            ;

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 21, 24, 27]]);
  }, []);
  return {
    error: error,
    isLoading: isLoading,
    fetchNotesHandler: fetchNotesHandler
  };
};

var _default = useFetch;
exports["default"] = _default;