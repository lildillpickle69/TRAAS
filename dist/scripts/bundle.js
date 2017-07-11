(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = andValidator;

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function andValidator(validators) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'and';

  if (!Array.isArray(validators)) {
    throw new TypeError('and: 2 or more validators are required');
  }
  if (validators.length <= 1) {
    throw new RangeError('and: 2 or more validators are required');
  }

  var validator = function () {
    function and() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var firstError = null;
      validators.some(function (validatorFn) {
        firstError = validatorFn.apply(undefined, args);
        return firstError != null;
      });
      return firstError == null ? null : firstError;
    }

    return and;
  }();

  validator.isRequired = function () {
    function andIsRequired() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var firstError = null;
      validators.some(function (validatorFn) {
        firstError = validatorFn.isRequired.apply(validatorFn, args);
        return firstError != null;
      });
      return firstError == null ? null : firstError;
    }

    return andIsRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, name, validators);
}

},{"./helpers/wrapValidator":16}],2:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports['default'] = betweenValidator;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _object3 = require('object.entries');

var _object4 = _interopRequireDefault(_object3);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _valuesOf = require('./valuesOf');

var _valuesOf2 = _interopRequireDefault(_valuesOf);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function number(props, propName, componentName) {
  var value = props[propName];
  if (typeof value === 'number' && !isNaN(value)) {
    return null;
  }

  return new TypeError(String(componentName) + ': ' + String(propName) + ' must be a non-NaN number.');
}

function numberOrPropsFunc(props, propName) {
  var value = props[propName];

  if (typeof value === 'function') {
    return null;
  }

  if (typeof value === 'number' && !isNaN(value)) {
    return null;
  }

  return new TypeError(String(propName) + ': a function, or a non-NaN number is required');
}

function lowerCompare(value, _ref) {
  var gt = _ref.gt,
      gte = _ref.gte;

  if (typeof gt === 'number') {
    return value > gt;
  }
  if (typeof gte === 'number') {
    return value >= gte;
  }
  return true;
}

function upperCompare(value, _ref2) {
  var lt = _ref2.lt,
      lte = _ref2.lte;

  if (typeof lt === 'number') {
    return value < lt;
  }
  if (typeof lte === 'number') {
    return value <= lte;
  }
  return true;
}

function greaterThanError(_ref3) {
  var gt = _ref3.gt,
      gte = _ref3.gte;

  if (typeof gt === 'number') {
    return 'greater than ' + gt;
  }
  if (typeof gte === 'number') {
    return 'greater than or equal to ' + gte;
  }
  return '';
}

function lessThanError(_ref4) {
  var lt = _ref4.lt,
      lte = _ref4.lte;

  if (typeof lt === 'number') {
    return 'less than ' + lt;
  }
  if (typeof lte === 'number') {
    return 'less than or equal to ' + lte;
  }
  return '';
}

function errorMessage(componentName, propName, opts) {
  var errors = [greaterThanError(opts), lessThanError(opts)].filter(Boolean).join(' and ');
  return String(componentName) + ': ' + String(propName) + ' must be ' + String(errors);
}

function propsThunkify(opts) {
  return (0, _object4['default'])(opts).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    var numberThunk = typeof value === 'number' ? function () {
      return value;
    } : value;
    return (0, _object2['default'])({}, acc, _defineProperty({}, key, numberThunk));
  }, {});
}

function invokeWithProps(optsThunks, props) {
  return (0, _object4['default'])(optsThunks).reduce(function (acc, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        thunk = _ref8[1];

    var value = thunk(props);
    return (0, _object2['default'])({}, acc, _defineProperty({}, key, value));
  }, {});
}

var argValidators = [(0, _shape2['default'])({ lt: numberOrPropsFunc, gt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lte: numberOrPropsFunc, gt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lt: numberOrPropsFunc, gte: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lte: numberOrPropsFunc, gte: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ lte: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ gt: numberOrPropsFunc }).isRequired, (0, _shape2['default'])({ gte: numberOrPropsFunc }).isRequired];
function argValidator(props, propName) {
  return argValidators.every(function (validator) {
    return !!validator(props, propName);
  });
}

var thunkValueValidator = (0, _valuesOf2['default'])(number).isRequired;

function betweenValidator(options) {
  var argError = argValidator({ options: options }, 'options');
  if (argError) {
    throw new TypeError('between: only one of the pairs of `lt`/`lte`, and `gt`/`gte`, may be supplied, and at least one pair must be provided.');
  }

  var optsThunks = propsThunkify(options);

  var validator = function () {
    function between(props, propName, componentName) {
      var propValue = props[propName];
      if (propValue == null) {
        return null;
      }

      if (typeof propValue !== 'number') {
        return new RangeError(String(componentName) + ': ' + String(propName) + ' must be a number, got "' + (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) + '"');
      }

      var opts = invokeWithProps(optsThunks, props);

      for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        rest[_key - 3] = arguments[_key];
      }

      var thunkValuesError = thunkValueValidator.apply(undefined, [_defineProperty({}, propName, opts), propName, componentName].concat(rest));
      if (thunkValuesError) {
        return thunkValuesError;
      }

      if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
        return new RangeError(errorMessage(componentName, propName, opts));
      }

      return null;
    }

    return between;
  }();
  validator.isRequired = function () {
    function betweenRequired(props, propName, componentName) {
      var propValue = props[propName];
      if (typeof propValue !== 'number') {
        return new RangeError(String(componentName) + ': ' + String(propName) + ' must be a number, got "' + (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) + '"');
      }

      var opts = invokeWithProps(optsThunks, props);

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      var thunkValuesError = thunkValueValidator.apply(undefined, [_defineProperty({}, propName, opts), propName, componentName].concat(rest));
      if (thunkValuesError) {
        return thunkValuesError;
      }

      if (!lowerCompare(propValue, opts) || !upperCompare(propValue, opts)) {
        return new RangeError(errorMessage(componentName, propName, opts));
      }

      return null;
    }

    return betweenRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'between', options);
}

},{"./helpers/wrapValidator":16,"./shape":32,"./valuesOf":35,"object.assign":278,"object.entries":284}],3:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = childrenHavePropXorChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function childrenHavePropXorChildren(prop) {
  if (typeof prop !== 'string' && (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'symbol') {
    throw new TypeError('invalid prop: must be string or symbol');
  }

  var validator = function () {
    function childrenHavePropXorChildrenWithProp(_ref, _, componentName) {
      var children = _ref.children;

      var truthyChildrenCount = 0;
      var propCount = 0;
      var grandchildrenCount = 0;

      _react2['default'].Children.forEach(children, function (child) {
        if (!child) {
          return;
        }

        truthyChildrenCount += 1;

        if (child.props[prop]) {
          propCount += 1;
        }

        if (_react2['default'].Children.count(child.props.children)) {
          grandchildrenCount += 1;
        }
      });

      if (propCount === truthyChildrenCount && grandchildrenCount === 0 || propCount === 0 && grandchildrenCount === truthyChildrenCount || propCount === 0 && grandchildrenCount === 0) {
        return null;
      }

      return new TypeError('`' + String(componentName) + '` requires children to all have prop \u201C' + String(prop) + '\u201D, all have children, or all have neither.');
    }

    return childrenHavePropXorChildrenWithProp;
  }();
  validator.isRequired = validator;

  return (0, _wrapValidator2['default'])(validator, 'childrenHavePropXorChildrenWithProp:' + String(prop), prop);
}

},{"./helpers/wrapValidator":16,"react":570}],4:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = childrenOf;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _renderableChildren = require('./helpers/renderableChildren');

var _renderableChildren2 = _interopRequireDefault(_renderableChildren);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function validateChildren(propType, children, props) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var error = void 0;
  children.some(function (child) {
    error = propType.apply(undefined, [(0, _object2['default'])({}, props, { children: child }), 'children'].concat(rest));
    return error;
  });

  return error || null;
}

function childrenOf(propType) {
  function childrenOfPropType(props, propName, componentName) {
    if (propName !== 'children') {
      return new TypeError(String(componentName) + ' is using the childrenOf validator on non-children prop "' + String(propName) + '"');
    }

    var propValue = props[propName];

    if (propValue == null) {
      return null;
    }
    var children = (0, _renderableChildren2['default'])(propValue);
    if (children.length === 0) {
      return null;
    }

    for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }

    return validateChildren.apply(undefined, [propType, children, props, componentName].concat(rest));
  }

  childrenOfPropType.isRequired = function (props, propName, componentName) {
    for (var _len3 = arguments.length, rest = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      rest[_key3 - 3] = arguments[_key3];
    }

    if (propName !== 'children') {
      return new TypeError(String(componentName) + ' is using the childrenOf validator on non-children prop "' + String(propName) + '"');
    }

    var children = (0, _renderableChildren2['default'])(props[propName]);
    if (children.length === 0) {
      return new TypeError('`' + String(componentName) + '` requires at least one node of type ' + String(propType.typeName || propType.name));
    }

    return validateChildren.apply(undefined, [propType, children, props, componentName].concat(rest));
  };

  return (0, _wrapValidator2['default'])(childrenOfPropType, 'childrenOf', propType);
}

},{"./helpers/renderableChildren":14,"./helpers/wrapValidator":16,"object.assign":278}],5:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrayPrototype = require('array.prototype.find');

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _getComponentName = require('./helpers/getComponentName');

var _getComponentName2 = _interopRequireDefault(_getComponentName);

var _renderableChildren = require('./helpers/renderableChildren');

var _renderableChildren2 = _interopRequireDefault(_renderableChildren);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function onlyTypes(types, children, componentName) {
  if (!children.every(function (child) {
    return child && (0, _arrayPrototype2['default'])(types, function (Type) {
      return Type === '*' || child.type === Type;
    });
  })) {
    var typeNames = types.map(_getComponentName2['default']).join(', or ');
    return new TypeError('`' + String(componentName) + '` only accepts children of type ' + String(typeNames));
  }
  return null;
}

function isRequired(types, children, componentName) {
  if (children.length === 0) {
    var typeNames = types.map(_getComponentName2['default']).join(', or ');
    return new TypeError('`' + String(componentName) + '` requires at least one node of type ' + String(typeNames));
  }
  return null;
}

function childrenOfType() {
  for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  if (types.length < 1) {
    throw new TypeError('childrenOfType: at least 1 type is required');
  }

  function validator(props, propName, componentName) {
    return onlyTypes(types, (0, _renderableChildren2['default'])(props[propName]), componentName);
  }

  validator.isRequired = function (props, propName, componentName) {
    var children = (0, _renderableChildren2['default'])(props[propName]);
    return isRequired(types, children, componentName) || onlyTypes(types, children, componentName);
  };

  return (0, _wrapValidator2['default'])(validator, 'childrenOfType', types);
}

exports['default'] = childrenOfType;

},{"./helpers/getComponentName":10,"./helpers/renderableChildren":14,"./helpers/wrapValidator":16,"array.prototype.find":39}],6:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = childrenSequenceOfValidator;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _sequenceOf = require('./sequenceOf');

var _sequenceOf2 = _interopRequireDefault(_sequenceOf);

var _renderableChildren = require('./helpers/renderableChildren');

var _renderableChildren2 = _interopRequireDefault(_renderableChildren);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function childrenSequenceOfValidator() {
  for (var _len = arguments.length, specifiers = Array(_len), _key = 0; _key < _len; _key++) {
    specifiers[_key] = arguments[_key];
  }

  var seq = _sequenceOf2['default'].apply(undefined, specifiers);

  var validator = function () {
    function childrenSequenceOf(props, propName, componentName) {
      if (propName !== 'children') {
        return new TypeError(String(componentName) + ' is using the childrenSequenceOf validator on non-children prop "' + String(propName) + '"');
      }

      var propValue = props[propName];
      var children = (0, _renderableChildren2['default'])(propValue);
      if (children.length === 0) {
        return null;
      }

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      return seq.apply(undefined, [(0, _object2['default'])({}, props, { children: children }), propName, componentName].concat(rest));
    }

    return childrenSequenceOf;
  }();

  validator.isRequired = function () {
    function childrenSequenceOfRequired(props, propName, componentName) {
      if (propName !== 'children') {
        return new TypeError(String(componentName) + ' is using the childrenSequenceOf validator on non-children prop "' + String(propName) + '"');
      }

      var propValue = props[propName];
      var children = (0, _renderableChildren2['default'])(propValue);
      if (children.length === 0) {
        return new TypeError(String(componentName) + ': renderable children are required.');
      }

      for (var _len3 = arguments.length, rest = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
        rest[_key3 - 3] = arguments[_key3];
      }

      return seq.isRequired.apply(seq, [(0, _object2['default'])({}, props, { children: children }), propName, componentName].concat(rest));
    }

    return childrenSequenceOfRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'childrenSequenceOf', specifiers);
}

},{"./helpers/renderableChildren":14,"./helpers/wrapValidator":16,"./sequenceOf":31,"object.assign":278}],7:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = componentWithName;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isRegex = require('is-regex');

var _isRegex2 = _interopRequireDefault(_isRegex);

var _arrayPrototype = require('array.prototype.find');

var _arrayPrototype2 = _interopRequireDefault(_arrayPrototype);

var _getComponentName = require('./helpers/getComponentName');

var _getComponentName2 = _interopRequireDefault(_getComponentName);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function hasName(name, prop, propName, componentName) {
  for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    rest[_key - 4] = arguments[_key];
  }

  if (Array.isArray(prop)) {
    return (0, _arrayPrototype2['default'])(prop.map(function (item) {
      return hasName.apply(undefined, [name, item, propName, componentName].concat(rest));
    }), Boolean) || null;
  }

  if (!_react2['default'].isValidElement(prop)) {
    return new TypeError(String(componentName) + '.' + String(propName) + ' is not a valid React element');
  }

  var type = prop.type;

  var componentNameFromType = (0, _getComponentName2['default'])(type);

  if ((0, _isRegex2['default'])(name) && !name.test(componentNameFromType)) {
    return new TypeError('`' + String(componentName) + '.' + String(propName) + '` only accepts components matching the regular expression ' + String(name));
  }

  if (!(0, _isRegex2['default'])(name) && componentNameFromType !== name) {
    return new TypeError('`' + String(componentName) + '.' + String(propName) + '` only accepts components named ' + String(name));
  }

  return null;
}

function componentWithName(name) {
  if (typeof name !== 'string' && !(0, _isRegex2['default'])(name)) {
    throw new TypeError('name must be a string or a regex');
  }

  function componentWithNameValidator(props, propName, componentName) {
    var prop = props[propName];
    if (props[propName] == null) {
      return null;
    }

    for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }

    return hasName.apply(undefined, [name, prop, propName, componentName].concat(rest));
  }

  componentWithNameValidator.isRequired = function () {
    function componentWithNameRequired(props, propName, componentName) {
      var prop = props[propName];
      if (prop == null) {
        return new TypeError('`' + String(componentName) + '.' + String(propName) + '` requires at least one component named ' + String(name));
      }

      for (var _len3 = arguments.length, rest = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
        rest[_key3 - 3] = arguments[_key3];
      }

      return hasName.apply(undefined, [name, prop, propName, componentName].concat(rest));
    }

    return componentWithNameRequired;
  }();

  return (0, _wrapValidator2['default'])(componentWithNameValidator, 'componentWithName:' + String(name), name);
}

},{"./helpers/getComponentName":10,"./helpers/wrapValidator":16,"array.prototype.find":39,"is-regex":250,"react":570}],8:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = elementTypeValidator;

var _propTypes = require('prop-types');

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _getComponentName = require('./helpers/getComponentName');

var _getComponentName2 = _interopRequireDefault(_getComponentName);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getTypeName(Type) {
  if (typeof Type === 'string') {
    return Type;
  }
  var type = (0, _getComponentName2['default'])(Type);

  /* istanbul ignore next */ // in environments where functions do not have names
  return type || 'Anonymous Component';
}

function validateElementType(Type, props, propName, componentName) {
  var type = props[propName].type;


  if (type === Type) {
    return null;
  }

  return new TypeError(String(componentName) + '.' + String(propName) + ' must be a React element of type ' + String(getTypeName(Type)));
}

function elementTypeValidator(Type) {
  if (Type === '*') {
    return (0, _wrapValidator2['default'])(_propTypes.element, 'elementType(*)', Type);
  }

  if (typeof Type !== 'string' && typeof Type !== 'function') {
    throw new TypeError('Type must be a React Component, an HTML element tag name, or "*". Got an ' + (typeof Type === 'undefined' ? 'undefined' : _typeof(Type)));
  }

  function elementType(props, propName, componentName) {
    if (props[propName] == null) {
      return null;
    }

    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    return validateElementType.apply(undefined, [Type, props, propName, componentName].concat(rest));
  }
  elementType.isRequired = elementType; // covered by and + element

  var typeName = getTypeName(Type);
  var validatorName = 'elementType(' + String(typeName) + ')';
  return (0, _wrapValidator2['default'])((0, _and2['default'])([_propTypes.element, elementType], validatorName), validatorName, Type);
}

},{"./and":1,"./helpers/getComponentName":10,"./helpers/wrapValidator":16,"prop-types":299}],9:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function explicitNull(props, propName, componentName) {
  if (props[propName] == null) {
    return null;
  }
  return new TypeError(String(componentName) + ': prop \u201C' + String(propName) + '\u201D must be null or undefined; received ' + _typeof(props[propName]));
}
explicitNull.isRequired = function () {
  function explicitNullRequired(props, propName, componentName) {
    if (props[propName] === null) {
      return null;
    }
    return new TypeError(String(componentName) + ': prop \u201C' + String(propName) + '\u201D must be null; received ' + _typeof(props[propName]));
  }

  return explicitNullRequired;
}();

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(explicitNull, 'explicitNull');
};

},{"./helpers/wrapValidator":16}],10:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getComponentName;
function getComponentName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }
  if (typeof Component === 'function') {
    var displayName = Component.displayName,
        name = Component.name;

    return displayName || name;
  }
  return null;
}

},{}],11:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
var floor = Math.floor;

var finite = isFinite;

exports['default'] = Number.isInteger || /* istanbul ignore next */function (x) {
  return typeof x === 'number' && finite(x) && floor(x) === x;
};

},{}],12:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('prop-types-exact/build/helpers/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _isPlainObject2['default'];

},{"prop-types-exact/build/helpers/isPlainObject":293}],13:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = isPrimitive;
function isPrimitive(x) {
  return !x || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object' && typeof x !== 'function';
}

},{}],14:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = renderableChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function renderableChildren(childrenProp) {
  return _react2['default'].Children.toArray(childrenProp).filter(function (child) {
    return child === 0 || child;
  });
}

},{"react":570}],15:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = typeOf;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function typeOf(child) {
  if (child === null) {
    return 'null';
  }
  if (Array.isArray(child)) {
    return 'array';
  }
  if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object') {
    return typeof child === 'undefined' ? 'undefined' : _typeof(child);
  }
  if (_react2['default'].isValidElement(child)) {
    return child.type;
  }
  return child;
}

},{"react":570}],16:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = wrapValidator;

var _object = require("object.assign");

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function wrapValidator(validator, typeName) {
  var typeChecker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return (0, _object2["default"])(validator.bind(), {
    typeName: typeName,
    typeChecker: typeChecker,
    isRequired: (0, _object2["default"])(validator.isRequired.bind(), {
      typeName: typeName,
      typeChecker: typeChecker,
      typeRequired: true
    })
  });
}

},{"object.assign":278}],17:[function(require,module,exports){
var _propTypesExact = require('prop-types-exact');

var _propTypesExact2 = _interopRequireDefault(_propTypesExact);

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _between = require('./between');

var _between2 = _interopRequireDefault(_between);

var _childrenHavePropXorChildren = require('./childrenHavePropXorChildren');

var _childrenHavePropXorChildren2 = _interopRequireDefault(_childrenHavePropXorChildren);

var _childrenOf = require('./childrenOf');

var _childrenOf2 = _interopRequireDefault(_childrenOf);

var _childrenOfType = require('./childrenOfType');

var _childrenOfType2 = _interopRequireDefault(_childrenOfType);

var _childrenSequenceOf = require('./childrenSequenceOf');

var _childrenSequenceOf2 = _interopRequireDefault(_childrenSequenceOf);

var _componentWithName = require('./componentWithName');

var _componentWithName2 = _interopRequireDefault(_componentWithName);

var _elementType = require('./elementType');

var _elementType2 = _interopRequireDefault(_elementType);

var _explicitNull = require('./explicitNull');

var _explicitNull2 = _interopRequireDefault(_explicitNull);

var _integer = require('./integer');

var _integer2 = _interopRequireDefault(_integer);

var _keysOf = require('./keysOf');

var _keysOf2 = _interopRequireDefault(_keysOf);

var _mutuallyExclusiveProps = require('./mutuallyExclusiveProps');

var _mutuallyExclusiveProps2 = _interopRequireDefault(_mutuallyExclusiveProps);

var _mutuallyExclusiveTrueProps = require('./mutuallyExclusiveTrueProps');

var _mutuallyExclusiveTrueProps2 = _interopRequireDefault(_mutuallyExclusiveTrueProps);

var _nChildren = require('./nChildren');

var _nChildren2 = _interopRequireDefault(_nChildren);

var _nonNegativeInteger = require('./nonNegativeInteger');

var _nonNegativeInteger2 = _interopRequireDefault(_nonNegativeInteger);

var _nonNegativeNumber = require('./nonNegativeNumber');

var _nonNegativeNumber2 = _interopRequireDefault(_nonNegativeNumber);

var _numericString = require('./numericString');

var _numericString2 = _interopRequireDefault(_numericString);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _or = require('./or');

var _or2 = _interopRequireDefault(_or);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _restrictedProp = require('./restrictedProp');

var _restrictedProp2 = _interopRequireDefault(_restrictedProp);

var _sequenceOf = require('./sequenceOf');

var _sequenceOf2 = _interopRequireDefault(_sequenceOf);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _uniqueArray = require('./uniqueArray');

var _uniqueArray2 = _interopRequireDefault(_uniqueArray);

var _uniqueArrayOf = require('./uniqueArrayOf');

var _uniqueArrayOf2 = _interopRequireDefault(_uniqueArrayOf);

var _valuesOf = require('./valuesOf');

var _valuesOf2 = _interopRequireDefault(_valuesOf);

var _withShape = require('./withShape');

var _withShape2 = _interopRequireDefault(_withShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = {
  and: _and2['default'],
  between: _between2['default'],
  childrenHavePropXorChildren: _childrenHavePropXorChildren2['default'],
  childrenOf: _childrenOf2['default'],
  childrenOfType: _childrenOfType2['default'],
  childrenSequenceOf: _childrenSequenceOf2['default'],
  componentWithName: _componentWithName2['default'],
  elementType: _elementType2['default'],
  explicitNull: _explicitNull2['default'],
  forbidExtraProps: _propTypesExact2['default'],
  integer: _integer2['default'],
  keysOf: _keysOf2['default'],
  mutuallyExclusiveProps: _mutuallyExclusiveProps2['default'],
  mutuallyExclusiveTrueProps: _mutuallyExclusiveTrueProps2['default'],
  nChildren: _nChildren2['default'],
  nonNegativeInteger: _nonNegativeInteger2['default'],
  nonNegativeNumber: _nonNegativeNumber2['default'],
  numericString: _numericString2['default'],
  object: _object2['default'],
  or: _or2['default'],
  range: _range2['default'],
  restrictedProp: _restrictedProp2['default'],
  sequenceOf: _sequenceOf2['default'],
  shape: _shape2['default'],
  uniqueArray: _uniqueArray2['default'],
  uniqueArrayOf: _uniqueArrayOf2['default'],
  valuesOf: _valuesOf2['default'],
  withShape: _withShape2['default']
};

},{"./and":1,"./between":2,"./childrenHavePropXorChildren":3,"./childrenOf":4,"./childrenOfType":5,"./childrenSequenceOf":6,"./componentWithName":7,"./elementType":8,"./explicitNull":9,"./integer":18,"./keysOf":19,"./mutuallyExclusiveProps":21,"./mutuallyExclusiveTrueProps":22,"./nChildren":23,"./nonNegativeInteger":24,"./nonNegativeNumber":25,"./numericString":26,"./object":27,"./or":28,"./range":29,"./restrictedProp":30,"./sequenceOf":31,"./shape":32,"./uniqueArray":33,"./uniqueArrayOf":34,"./valuesOf":35,"./withShape":36,"prop-types-exact":294}],18:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isInteger = require('./helpers/isInteger');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function requiredInteger(props, propName, componentName) {
  var value = props[propName];
  if (value == null || !(0, _isInteger2['default'])(value)) {
    return new RangeError(String(propName) + ' in ' + String(componentName) + ' must be an integer');
  }
  return null;
}

var validator = function () {
  function integer(props, propName) {
    var value = props[propName];

    if (value == null) {
      return null;
    }

    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    return requiredInteger.apply(undefined, [props, propName].concat(rest));
  }

  return integer;
}();

validator.isRequired = requiredInteger;

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(validator, 'integer');
};

},{"./helpers/isInteger":11,"./helpers/wrapValidator":16}],19:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = keysOfValidator;

var _isPrimitive = require('./helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function keysOfValidator(propType) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'keysOf';

  if (typeof propType !== 'function') {
    throw new TypeError('argument to keysOf must be a valid PropType function');
  }

  var validator = function () {
    function keysOf(props, propName, componentName, location, propFullName) {
      for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
        rest[_key - 5] = arguments[_key];
      }

      var propValue = props[propName];

      if (propValue == null || (0, _isPrimitive2['default'])(propValue)) {
        return null;
      }

      var firstError = null;
      Object.keys(propValue).some(function (key) {
        firstError = propType.apply(undefined, [_defineProperty({}, key, key), key, componentName, location, '(' + String(propFullName) + ').' + String(key)].concat(rest));
        return firstError != null;
      });
      return firstError || null;
    }

    return keysOf;
  }();

  validator.isRequired = function () {
    function keyedByRequired(props, propName, componentName) {
      var propValue = props[propName];

      if (propValue == null) {
        return new TypeError(String(componentName) + ': ' + String(propName) + ' is required, but value is ' + String(propValue));
      }

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      return validator.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return keyedByRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, name, propType);
}

},{"./helpers/isPrimitive":13,"./helpers/wrapValidator":16}],20:[function(require,module,exports){
function noop() {}
noop.isRequired = noop;
function noopThunk() {
  return noop;
}

module.exports = {
  and: noopThunk,
  between: noopThunk,
  childrenHavePropXorChildren: noopThunk,
  childrenOf: noopThunk,
  childrenOfType: noopThunk,
  childrenSequenceOf: noopThunk,
  componentWithName: noopThunk,
  elementType: noopThunk,
  explicitNull: noopThunk,
  forbidExtraProps: Object,
  integer: noopThunk,
  keysOf: noopThunk,
  mutuallyExclusiveProps: noopThunk,
  mutuallyExclusiveTrueProps: noopThunk,
  nChildren: noopThunk,
  nonNegativeInteger: noopThunk,
  nonNegativeNumber: noopThunk,
  numericString: noopThunk,
  object: noopThunk,
  or: noopThunk,
  range: noopThunk,
  restrictedProp: noopThunk,
  sequenceOf: noopThunk,
  shape: noopThunk,
  uniqueArray: noopThunk,
  uniqueArrayOf: noopThunk,
  valuesOf: noopThunk,
  withShape: noopThunk
};

},{}],21:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = mutuallyExclusiveOfType;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mutuallyExclusiveOfType(propType) {
  if (typeof propType !== 'function') {
    throw new TypeError('a propType is required');
  }

  for (var _len = arguments.length, exclusiveProps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    exclusiveProps[_key - 1] = arguments[_key];
  }

  if (exclusiveProps.length < 1) {
    throw new TypeError('at least one prop that is mutually exclusive with this propType is required');
  }

  var propList = exclusiveProps.join(', or ');

  var map = exclusiveProps.reduce(function (acc, prop) {
    return (0, _object2['default'])({}, acc, _defineProperty({}, prop, true));
  }, {});
  var countProps = function countProps(count, prop) {
    return count + (map[prop] ? 1 : 0);
  };

  var validator = function () {
    function mutuallyExclusiveProps(props, propName, componentName) {
      var exclusivePropCount = Object.keys(props).filter(function (prop) {
        return props[prop] != null;
      }).reduce(countProps, 0);
      if (exclusivePropCount > 1) {
        return new Error('A ' + String(componentName) + ' cannot have more than one of these props: ' + String(propList));
      }

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      return propType.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return mutuallyExclusiveProps;
  }();

  validator.isRequired = function () {
    function mutuallyExclusivePropsRequired(props, propName, componentName) {
      var exclusivePropCount = Object.keys(props).filter(function (prop) {
        return prop === propName || props[prop] != null;
      }).reduce(countProps, 0);
      if (exclusivePropCount > 1) {
        return new Error('A ' + String(componentName) + ' cannot have more than one of these props: ' + String(propList));
      }

      for (var _len3 = arguments.length, rest = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
        rest[_key3 - 3] = arguments[_key3];
      }

      return propType.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return mutuallyExclusivePropsRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'mutuallyExclusiveProps:' + String(propList), exclusiveProps);
}

},{"./helpers/wrapValidator":16,"object.assign":278}],22:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = mutuallyExclusiveTrue;

var _propTypes = require('prop-types');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function mutuallyExclusiveTrue() {
  for (var _len = arguments.length, exclusiveProps = Array(_len), _key = 0; _key < _len; _key++) {
    exclusiveProps[_key] = arguments[_key];
  }

  if (exclusiveProps.length < 1) {
    throw new TypeError('at least one prop that is mutually exclusive is required');
  }
  if (!exclusiveProps.every(function (x) {
    return typeof x === 'string';
  })) {
    throw new TypeError('all exclusive true props must be strings');
  }

  var propsList = exclusiveProps.join(', or ');

  var validator = function () {
    function mutuallyExclusiveTrueProps(props, propName, componentName) {
      var countProps = function () {
        function countProps(count, prop) {
          return count + (props[prop] ? 1 : 0);
        }

        return countProps;
      }();

      var exclusivePropCount = exclusiveProps.reduce(countProps, 0);
      if (exclusivePropCount > 1) {
        return new Error('A ' + String(componentName) + ' cannot have more than one of these boolean props be true: ' + String(propsList));
      }

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      return _propTypes.bool.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return mutuallyExclusiveTrueProps;
  }();

  validator.isRequired = function () {
    function mutuallyExclusiveTruePropsRequired(props, propName, componentName) {
      var countProps = function () {
        function countProps(count, prop) {
          return count + (props[prop] ? 1 : 0);
        }

        return countProps;
      }();

      var exclusivePropCount = exclusiveProps.reduce(countProps, 0);
      if (exclusivePropCount > 1) {
        return new Error('A ' + String(componentName) + ' cannot have more than one of these boolean props be true: ' + String(propsList));
      }

      for (var _len3 = arguments.length, rest = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
        rest[_key3 - 3] = arguments[_key3];
      }

      return _propTypes.bool.isRequired.apply(_propTypes.bool, [props, propName, componentName].concat(rest));
    }

    return mutuallyExclusiveTruePropsRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'mutuallyExclusiveTrueProps: ' + String(propsList), exclusiveProps);
}

},{"./helpers/wrapValidator":16,"prop-types":299}],23:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = nChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function nChildren(n) {
  var propType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _propTypes.node;

  if (typeof n !== 'number' || isNaN(n) || n < 0) {
    throw new TypeError('a non-negative number is required');
  }

  var validator = function () {
    function nChildrenValidator(props, propName, componentName) {
      if (propName !== 'children') {
        return new TypeError(String(componentName) + ' is using the nChildren validator on a non-children prop');
      }

      var children = props.children;

      var childrenCount = _react2['default'].Children.count(children);

      if (childrenCount !== n) {
        return new RangeError(String(componentName) + ' expects to receive ' + String(n) + ' children, but received ' + String(childrenCount) + ' children.');
      }

      for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        rest[_key - 3] = arguments[_key];
      }

      return propType.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return nChildrenValidator;
  }();
  validator.isRequired = validator;

  return (0, _wrapValidator2['default'])(validator, 'nChildren:' + String(n), n);
}

},{"./helpers/wrapValidator":16,"prop-types":299,"react":570}],24:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _integer = require('./integer');

var _integer2 = _interopRequireDefault(_integer);

var _nonNegativeNumber = require('./nonNegativeNumber');

var _nonNegativeNumber2 = _interopRequireDefault(_nonNegativeNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = (0, _and2['default'])([(0, _integer2['default'])(), (0, _nonNegativeNumber2['default'])()], 'nonNegativeInteger');

},{"./and":1,"./integer":18,"./nonNegativeNumber":25}],25:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isNonNegative(x) {
  return typeof x === 'number' && isFinite(x) && x >= 0 && !Object.is(x, -0);
}

function nonNegativeNumber(props, propName, componentName) {
  var value = props[propName];

  if (value == null || isNonNegative(value)) {
    return null;
  }

  return new RangeError(String(propName) + ' in ' + String(componentName) + ' must be a non-negative number');
}

function requiredNonNegativeNumber(props, propName, componentName) {
  var value = props[propName];

  if (isNonNegative(value)) {
    return null;
  }

  return new RangeError(String(propName) + ' in ' + String(componentName) + ' must be a non-negative number');
}

nonNegativeNumber.isRequired = requiredNonNegativeNumber;

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(nonNegativeNumber, 'nonNegativeNumber');
};

},{"./helpers/wrapValidator":16}],26:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var validNumericChars = /^[-+]?(?:[1-9][0-9]*(?:\.[0-9]+)?|0|0\.[0-9]+)$/;

var validator = function () {
  function numericString(props, propName, componentName) {
    if (props[propName] == null) {
      return null;
    }

    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    var stringError = _propTypes.string.apply(undefined, [props, propName, componentName].concat(rest));
    if (stringError) {
      return stringError;
    }

    var value = props[propName];

    var passesRegex = validNumericChars.test(value);
    if (passesRegex) {
      return null;
    }

    return new TypeError(String(componentName) + ': prop "' + String(propName) + '" (value "' + String(value) + '") must be a numeric string:\n    - starting with an optional + or -\n    - that does not have a leading zero\n    - with an optional decimal part (that contains only one decimal point, if present)\n    - that otherwise only contains digits (0-9)\n    - not +-NaN, or +-Infinity\n  ');
  }

  return numericString;
}();

validator.isRequired = function () {
  function numericStringRequired(props, propName, componentName) {
    if (props[propName] == null) {
      return new TypeError(String(componentName) + ': ' + String(propName) + ' is required');
    }

    for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      rest[_key2 - 3] = arguments[_key2];
    }

    return validator.apply(undefined, [props, propName, componentName].concat(rest));
  }

  return numericStringRequired;
}();

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(validator, 'numericString');
};

},{"./helpers/wrapValidator":16,"prop-types":299}],27:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject = require('./helpers/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _typeOf = require('./helpers/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
  code adapted from https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L202-L206
  so that it can be called outside of React's normal PropType flow
*/

var ReactPropTypeLocationNames = {
  prop: 'prop',
  context: 'context',
  childContext: 'child context'
};

function object(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  if (propValue == null) {
    return null;
  }

  if ((0, _isPlainObject2['default'])(propValue)) {
    return null;
  }
  var locationName = ReactPropTypeLocationNames[location] || location;
  return new TypeError('Invalid ' + String(locationName) + ' `' + String(propFullName) + '` of type `' + String((0, _typeOf2['default'])(propValue)) + '` supplied to `' + String(componentName) + '`, expected `object`.');
}
object.isRequired = function () {
  function objectRequired(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (propValue == null) {
      var locationName = ReactPropTypeLocationNames[location] || location;
      return new TypeError('The ' + String(locationName) + ' `' + String(propFullName) + '` is marked as required in `' + String(componentName) + '`, but its value is `' + String(propValue) + '`.');
    }

    for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      rest[_key - 5] = arguments[_key];
    }

    return object.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
  }

  return objectRequired;
}();

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(object, 'object');
};

},{"./helpers/isPlainObject":12,"./helpers/typeOf":15,"./helpers/wrapValidator":16}],28:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = or;

var _propTypes = require('prop-types');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function oneOfTypeValidator(validators) {
  var validator = function () {
    function oneOfType(props, propName, componentName) {
      for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        rest[_key - 3] = arguments[_key];
      }

      if (typeof props[propName] === 'undefined') {
        return null;
      }

      var errors = validators.map(function (v) {
        return v.apply(undefined, [props, propName, componentName].concat(rest));
      }).filter(Boolean);

      if (errors.length < validators.length) {
        return null;
      }
      return new TypeError(String(componentName) + ': invalid value supplied to ' + String(propName) + '.');
    }

    return oneOfType;
  }();
  validator.isRequired = function () {
    function oneOfTypeRequired(props, propName, componentName) {
      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      if (typeof props[propName] === 'undefined') {
        return new TypeError(String(componentName) + ': missing value for required ' + String(propName) + '.');
      }

      var errors = validators.map(function (v) {
        return v.apply(undefined, [props, propName, componentName].concat(rest));
      }).filter(Boolean);

      if (errors.length === validators.length) {
        return new TypeError(String(componentName) + ': invalid value ' + String(errors) + ' supplied to required ' + String(propName) + '.');
      }
      return null;
    }

    return oneOfTypeRequired;
  }();
  return (0, _wrapValidator2['default'])(validator, 'oneOfType', validators);
}

function or(validators) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'or';

  if (!Array.isArray(validators)) {
    throw new TypeError('or: 2 or more validators are required');
  }
  if (validators.length <= 1) {
    throw new RangeError('or: 2 or more validators are required');
  }

  var validator = oneOfTypeValidator([(0, _propTypes.arrayOf)(oneOfTypeValidator(validators))].concat(_toConsumableArray(validators)));

  return (0, _wrapValidator2['default'])(validator, name, validators);
}

},{"./helpers/wrapValidator":16,"prop-types":299}],29:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = range;

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _between = require('./between');

var _between2 = _interopRequireDefault(_between);

var _integer = require('./integer');

var _integer2 = _interopRequireDefault(_integer);

var _isInteger = require('./helpers/isInteger');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */Math.pow(2, 53) - 1;

function isValidLength(x) {
  return (0, _isInteger2['default'])(x) && Math.abs(x) < MAX_SAFE_INTEGER;
}

function range(min, max) {
  if (!isValidLength(min) || !isValidLength(max)) {
    throw new RangeError('"range" requires two integers: ' + String(min) + ' and ' + String(max) + ' given');
  }
  if (min === max) {
    throw new RangeError('min and max must not be the same');
  }
  return (0, _wrapValidator2['default'])((0, _and2['default'])([(0, _integer2['default'])(), (0, _between2['default'])({ gte: min, lt: max })], 'range'), 'range', { min: min, max: max });
}

},{"./and":1,"./between":2,"./helpers/isInteger":11,"./helpers/wrapValidator":16,"./integer":18}],30:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function customMessageWrapper(messsageFunction) {
  function restrictedProp(props, propName, componentName, location) {
    if (props[propName] == null) {
      return null;
    }

    if (messsageFunction && typeof messsageFunction === 'function') {
      for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        rest[_key - 4] = arguments[_key];
      }

      return new TypeError(messsageFunction.apply(undefined, [props, propName, componentName, location].concat(rest)));
    }
    return new TypeError('The ' + String(propName) + ' ' + String(location) + ' on ' + String(componentName) + ' is not allowed.');
  }
  restrictedProp.isRequired = restrictedProp;
  return restrictedProp;
}

exports['default'] = function () {
  var messsageFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return (0, _wrapValidator2['default'])(customMessageWrapper(messsageFunction), 'restrictedProp');
};

},{"./helpers/wrapValidator":16}],31:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = sequenceOfValidator;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _propTypes = require('prop-types');

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _between = require('./between');

var _between2 = _interopRequireDefault(_between);

var _nonNegativeInteger = require('./nonNegativeInteger');

var _nonNegativeInteger2 = _interopRequireDefault(_nonNegativeInteger);

var _object3 = require('./object');

var _object4 = _interopRequireDefault(_object3);

var _withShape = require('./withShape');

var _withShape2 = _interopRequireDefault(_withShape);

var _typeOf = require('./helpers/typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minValidator = _nonNegativeInteger2['default'];
var maxValidator = (0, _and2['default'])([_nonNegativeInteger2['default'], (0, _between2['default'])({ gte: 1 })]);

function validateRange(min, max) {
  if (typeof max !== 'number' || typeof min !== 'number') {
    return null; // no additional checking needed unless both are present
  }

  if (min <= max) {
    return null;
  }
  return new RangeError('min must be less than or equal to max');
}

var specifierShape = {
  validator: function () {
    function validator(props, propName) {
      if (typeof props[propName] !== 'function') {
        return new TypeError('"validator" must be a propType validator function');
      }
      return null;
    }

    return validator;
  }(),
  min: function () {
    function min(props, propName) {
      return minValidator(props, propName) || validateRange(props.min, props.max);
    }

    return min;
  }(),
  max: function () {
    function max(props, propName) {
      return maxValidator(props, propName) || validateRange(props.min, props.max);
    }

    return max;
  }()
};

function getMinMax(_ref) {
  var min = _ref.min,
      max = _ref.max;

  var minimum = void 0;
  var maximum = void 0;
  if (typeof min !== 'number' && typeof max !== 'number') {
    // neither provided, default to "1"
    minimum = 1;
    maximum = 1;
  } else {
    minimum = typeof min === 'number' ? min : 1;
    maximum = typeof max === 'number' ? max : Infinity;
  }
  return { minimum: minimum, maximum: maximum };
}

function chunkByType(items) {
  var chunk = [];
  var lastType = void 0;
  return items.reduce(function (chunks, item) {
    var itemType = (0, _typeOf2['default'])(item);
    if (!lastType || itemType === lastType) {
      chunk.push(item);
    } else {
      chunks.push(chunk);
      chunk = [item];
    }
    lastType = itemType;
    return chunks;
  }, []).concat(chunk.length > 0 ? [chunk] : []);
}

function validateChunks(specifiers, props, propName, componentName) {
  var items = props[propName];
  var chunks = chunkByType(items);

  for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    rest[_key - 4] = arguments[_key];
  }

  for (var i = 0; i < specifiers.length; i += 1) {
    var _specifiers$i = specifiers[i],
        validator = _specifiers$i.validator,
        min = _specifiers$i.min,
        max = _specifiers$i.max;

    var _getMinMax = getMinMax({ min: min, max: max }),
        minimum = _getMinMax.minimum,
        maximum = _getMinMax.maximum;

    if (chunks.length === 0 && minimum === 0) {
      // no chunks left, but this specifier does not require any items
      continue; // eslint-disable-line no-continue
    }

    var arrayOfValidator = (0, _propTypes.arrayOf)(validator).isRequired;

    var chunk = chunks.shift(); // extract the next chunk to test

    var chunkError = arrayOfValidator.apply(undefined, [(0, _object2['default'])({}, props, _defineProperty({}, propName, chunk)), propName, componentName].concat(rest));

    if (chunkError) {
      // this chunk is invalid
      if (minimum === 0) {
        // but, specifier has a min of 0 and can be skipped
        chunks.unshift(chunk); // put the chunk back, for the next iteration
        continue; // eslint-disable-line no-continue
      }
      return chunkError;
    }

    // chunk is valid!

    if (chunk.length < minimum) {
      return new RangeError(String(componentName) + ': specifier index ' + i + ' requires a minimum of ' + String(min) + ' items, but only has ' + String(chunk.length) + '.');
    }

    if (chunk.length > maximum) {
      return new RangeError(String(componentName) + ': specifier index ' + i + ' requires a maximum of ' + String(max) + ' items, but has ' + String(chunk.length) + '.');
    }
  }

  if (chunks.length > 0) {
    return new TypeError(String(componentName) + ': after all ' + String(specifiers.length) + ' specifiers matched, ' + String(chunks.length) + ' types of items were remaining.');
  }

  return null;
}

var specifierValidator = (0, _withShape2['default'])((0, _object4['default'])(), specifierShape).isRequired;

function sequenceOfValidator() {
  for (var _len2 = arguments.length, specifiers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    specifiers[_key2] = arguments[_key2];
  }

  if (specifiers.length === 0) {
    throw new RangeError('sequenceOf: at least one specifier is required');
  }

  var errors = specifiers.map(function (specifier, i) {
    return specifierValidator({ specifier: specifier }, 'specifier', 'sequenceOf specifier', 'suequenceOf specifier, index ' + String(i), 'specifier, index ' + String(i));
  });
  if (errors.some(Boolean)) {
    throw new TypeError('\n      sequenceOf: all specifiers must match the appropriate shape.\n\n      Errors:\n        ' + String(errors.map(function (e, i) {
      return ' - Argument index ' + String(i) + ': ' + String(e.message);
    }).join(',\n        ')) + '\n    ');
  }

  var validator = function () {
    function sequenceOf(props, propName) {
      var propValue = props[propName];

      if (propValue == null) {
        return null;
      }

      for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        rest[_key3 - 2] = arguments[_key3];
      }

      var error = _propTypes.array.apply(undefined, [props, propName].concat(rest));
      if (error) {
        return error;
      }

      return validateChunks.apply(undefined, [specifiers, props, propName].concat(rest));
    }

    return sequenceOf;
  }();

  validator.isRequired = function () {
    function sequenceOfRequired(props, propName, componentName) {
      for (var _len4 = arguments.length, rest = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
        rest[_key4 - 3] = arguments[_key4];
      }

      var error = _propTypes.array.isRequired.apply(_propTypes.array, [props, propName, componentName].concat(rest));
      if (error) {
        return error;
      }

      return validateChunks.apply(undefined, [specifiers, props, propName, componentName].concat(rest));
    }

    return sequenceOfRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'sequenceOf', specifiers);
}

},{"./and":1,"./between":2,"./helpers/typeOf":15,"./helpers/wrapValidator":16,"./nonNegativeInteger":24,"./object":27,"./withShape":36,"object.assign":278,"prop-types":299}],32:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = shapeValidator;

var _isPlainObject = require('./helpers/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function shapeValidator(shapeTypes) {
  if (!(0, _isPlainObject2['default'])(shapeTypes)) {
    throw new TypeError('shape must be a normal object');
  }

  function shape(props, propName, componentName, location) {
    var propValue = props[propName];
    if (propValue == null) {
      return null;
    }
    // code adapted from PropTypes.shape: https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L381
    // eslint-disable-next-line guard-for-in, no-restricted-syntax

    for (var _len = arguments.length, rest = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      rest[_key - 4] = arguments[_key];
    }

    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (checker) {
        var error = checker.apply(undefined, [propValue, key, componentName, location].concat(rest));
        if (error) {
          return error;
        }
      }
    }
    return null;
  }

  shape.isRequired = function () {
    function shapeRequired(props, propName, componentName) {
      var propValue = props[propName];
      if (propValue == null) {
        return new TypeError(String(componentName) + ': ' + String(propName) + ' is required.');
      }

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      return shape.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return shapeRequired;
  }();

  return (0, _wrapValidator2['default'])(shape, 'shape', shapeTypes);
}

},{"./helpers/isPlainObject":12,"./helpers/wrapValidator":16}],33:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function uniqueCountWithSet(arr) {
  return new Set(arr).size;
}
/* istanbul ignore next */
function uniqueCountLegacy(arr) {
  var seen = [];
  arr.forEach(function (item) {
    if (seen.indexOf(item) === -1) {
      seen.push(item);
    }
  });
  return seen.length;
}

var getUniqueCount = typeof Set === 'function' ? uniqueCountWithSet : /* istanbul ignore next */uniqueCountLegacy;

function requiredUniqueArray(props, propName, componentName) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var result = _propTypes.array.isRequired.apply(_propTypes.array, [props, propName, componentName].concat(rest));
  if (result != null) {
    return result;
  }

  var propValue = props[propName];
  var uniqueCount = getUniqueCount(propValue);
  if (uniqueCount !== propValue.length) {
    return new RangeError(String(componentName) + ': values must be unique. ' + (propValue.length - uniqueCount) + ' duplicate values found.');
  }
  return null;
}

function uniqueArray(props, propName) {
  var propValue = props[propName];
  if (propValue == null) {
    return null;
  }

  for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    rest[_key2 - 2] = arguments[_key2];
  }

  return requiredUniqueArray.apply(undefined, [props, propName].concat(rest));
}
uniqueArray.isRequired = requiredUniqueArray;

exports['default'] = function () {
  return (0, _wrapValidator2['default'])(uniqueArray, 'uniqueArray');
};

},{"./helpers/wrapValidator":16,"prop-types":299}],34:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = uniqueArrayOfTypeValidator;

var _propTypes = require('prop-types');

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _uniqueArray = require('./uniqueArray');

var _uniqueArray2 = _interopRequireDefault(_uniqueArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var unique = (0, _uniqueArray2['default'])();

function uniqueArrayOfTypeValidator(type) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'uniqueArrayOfType';

  if (typeof type !== 'function') {
    throw new TypeError('type must be a validator function');
  }

  var arrayValidator = (0, _propTypes.arrayOf)(type);

  var validator = (0, _and2['default'])([arrayValidator, unique], name);
  validator.isRequired = (0, _and2['default'])([arrayValidator.isRequired, unique.isRequired], String(name) + '.isRequired');

  return validator;
}

},{"./and":1,"./uniqueArray":33,"prop-types":299}],35:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = valuesOfValidator;

var _isPrimitive = require('./helpers/isPrimitive');

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

var _wrapValidator = require('./helpers/wrapValidator');

var _wrapValidator2 = _interopRequireDefault(_wrapValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// code adapted from https://github.com/facebook/react/blob/14156e56b9cf18ac86963185c5af4abddf3ff811/src/isomorphic/classic/types/ReactPropTypes.js#L307-L340

function valuesOfValidator(propType) {
  if (typeof propType !== 'function') {
    throw new TypeError('objectOf: propType must be a function');
  }

  var validator = function () {
    function valuesOf(props, propName, componentName, location, propFullName) {
      for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
        rest[_key - 5] = arguments[_key];
      }

      var propValue = props[propName];
      if (propValue == null || (0, _isPrimitive2['default'])(propValue)) {
        return null;
      }

      var firstError = void 0;
      Object.keys(propValue).some(function (key) {
        firstError = propType.apply(undefined, [propValue, key, componentName, location, String(propFullName) + '.' + String(key)].concat(rest));
        return firstError;
      });
      return firstError || null;
    }

    return valuesOf;
  }();
  validator.isRequired = function () {
    function valuesOfRequired(props, propName, componentName) {
      var propValue = props[propName];
      if (propValue == null) {
        return new TypeError(String(componentName) + ': ' + String(propName) + ' is required.');
      }

      for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
        rest[_key2 - 3] = arguments[_key2];
      }

      return validator.apply(undefined, [props, propName, componentName].concat(rest));
    }

    return valuesOfRequired;
  }();

  return (0, _wrapValidator2['default'])(validator, 'valuesOf', propType);
}

},{"./helpers/isPrimitive":13,"./helpers/wrapValidator":16}],36:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = withShape;

var _and = require('./and');

var _and2 = _interopRequireDefault(_and);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function withShape(type, shapeTypes) {
  if (typeof type !== 'function') {
    throw new TypeError('type must be a valid PropType');
  }
  var shapeValidator = (0, _shape2['default'])(shapeTypes);
  return (0, _and2['default'])([type, shapeValidator], 'withShape');
}

},{"./and":1,"./shape":32}],37:[function(require,module,exports){
(function (process){
module.exports = process.env.NODE_ENV === 'production' ? require('./build/mocks') : require('./build');


}).call(this,require('_process'))
},{"./build":17,"./build/mocks":20,"_process":292}],38:[function(require,module,exports){
'use strict';

var ES = require('es-abstract/es6');

module.exports = function find(predicate) {
	var list = ES.ToObject(this);
	var length = ES.ToInteger(ES.ToLength(list.length));
	if (!ES.IsCallable(predicate)) {
		throw new TypeError('Array#find: predicate must be a function');
	}
	if (length === 0) {
		return undefined;
	}
	var thisArg = arguments[1];
	for (var i = 0, value; i < length; i++) {
		value = list[i];
		if (ES.Call(predicate, thisArg, [value, i, list])) {
			return value;
		}
	}
	return undefined;
};

},{"es-abstract/es6":198}],39:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es6');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var slice = Array.prototype.slice;

var polyfill = getPolyfill();

var boundFindShim = function find(array, predicate) { // eslint-disable-line no-unused-vars
	ES.RequireObjectCoercible(array);
	var args = slice.call(arguments, 1);
	return polyfill.apply(array, args);
};

define(boundFindShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundFindShim;

},{"./implementation":38,"./polyfill":40,"./shim":41,"define-properties":192,"es-abstract/es6":198}],40:[function(require,module,exports){
'use strict';

module.exports = function getPolyfill() {
	// Detect if an implementation exists
	// Detect early implementations which skipped holes in sparse arrays
  // eslint-disable-next-line no-sparse-arrays
	var implemented = Array.prototype.find && [, 1].find(function () {
		return true;
	}) !== 1;

  // eslint-disable-next-line global-require
	return implemented ? Array.prototype.find : require('./implementation');
};

},{"./implementation":38}],41:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeFind() {
	var polyfill = getPolyfill();

	define(Array.prototype, { find: polyfill }, {
		find: function () {
			return Array.prototype.find !== polyfill;
		}
	});

	return polyfill;
};

},{"./polyfill":40,"define-properties":192}],42:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":44}],43:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('./../helpers/btoa');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

}).call(this,require('_process'))
},{"../core/createError":50,"./../core/settle":53,"./../helpers/btoa":57,"./../helpers/buildURL":58,"./../helpers/cookies":60,"./../helpers/isURLSameOrigin":62,"./../helpers/parseHeaders":64,"./../utils":66,"_process":292}],44:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":45,"./cancel/CancelToken":46,"./cancel/isCancel":47,"./core/Axios":48,"./defaults":55,"./helpers/bind":56,"./helpers/spread":65,"./utils":66}],45:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],46:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":45}],47:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],48:[function(require,module,exports){
'use strict';

var defaults = require('./../defaults');
var utils = require('./../utils');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../defaults":55,"./../helpers/combineURLs":59,"./../helpers/isAbsoluteURL":61,"./../utils":66,"./InterceptorManager":49,"./dispatchRequest":51}],49:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":66}],50:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":52}],51:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":47,"../defaults":55,"./../utils":66,"./transformData":54}],52:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

},{}],53:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":50}],54:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":66}],55:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))
},{"./adapters/http":43,"./adapters/xhr":43,"./helpers/normalizeHeaderName":63,"./utils":66,"_process":292}],56:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],57:[function(require,module,exports){
'use strict';

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

},{}],58:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":66}],59:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],60:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

},{"./../utils":66}],61:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],62:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

},{"./../utils":66}],63:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":66}],64:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

},{"./../utils":66}],65:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],66:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":56,"is-buffer":247}]