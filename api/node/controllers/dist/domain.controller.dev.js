"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchDomains = exports.insertMultipleDomains = void 0;

var _domainModel = _interopRequireDefault(require("../models/domain.model.js"));

var _roleModel = _interopRequireDefault(require("../models/role.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var insertMultipleDomains = function insertMultipleDomains(req, res) {
  var domainsData, results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, domainData, foundRoles, roleIds, domain, savedDomain;

  return regeneratorRuntime.async(function insertMultipleDomains$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          domainsData = req.body.domains;
          results = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;
          _iterator = domainsData[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 25;
            break;
          }

          domainData = _step.value;
          _context.next = 12;
          return regeneratorRuntime.awrap(_roleModel["default"].find({
            RoleName: {
              $in: domainData.roles
            }
          }).exec());

        case 12:
          foundRoles = _context.sent;
          roleIds = new Set(foundRoles.map(function (role) {
            return role._id;
          }));
          _context.next = 16;
          return regeneratorRuntime.awrap(_domainModel["default"].findOne({
            DomainName: domainData.DomainName
          }));

        case 16:
          domain = _context.sent;

          if (!domain) {
            domain = new _domainModel["default"]({
              DomainName: domainData.DomainName,
              iconPath: domainData.iconPath,
              roles: Array.from(roleIds)
            });
          } else {
            // Update existing domain to add new roles
            domain.roles = _toConsumableArray(new Set([].concat(_toConsumableArray(domain.roles), _toConsumableArray(roleIds))));
          }

          _context.next = 20;
          return regeneratorRuntime.awrap(domain.save());

        case 20:
          savedDomain = _context.sent;
          results.push(savedDomain);

        case 22:
          _iteratorNormalCompletion = true;
          _context.next = 8;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError) {
            _context.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
          res.status(201).json({
            message: "Domains inserted successfully",
            data: results
          });
          _context.next = 45;
          break;

        case 42:
          _context.prev = 42;
          _context.t1 = _context["catch"](0);
          res.status(500).json({
            message: "Error inserting domains",
            error: _context.t1.message
          });

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 42], [6, 27, 31, 39], [32,, 34, 38]]);
};

exports.insertMultipleDomains = insertMultipleDomains;

var searchDomains = function searchDomains(req, res) {
  var role, roleObj, domains;
  return regeneratorRuntime.async(function searchDomains$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          role = req.query.role;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_roleModel["default"].findOne({
            RoleName: role
          }).exec());

        case 4:
          roleObj = _context2.sent;

          if (roleObj) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "Role not found"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_domainModel["default"].find({
            roles: roleObj._id
          }).populate("roles").exec());

        case 9:
          domains = _context2.sent;
          res.json({
            domains: domains.map(function (domain) {
              return {
                DomainId: domain._id,
                DomainName: domain.DomainName,
                iconPath: domain.iconPath
              };
            })
          });
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: "Error fetching domains",
            error: _context2.t0.message
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 13]]);
};

exports.searchDomains = searchDomains;