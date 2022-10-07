'use strict';

var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) =>
  function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

// tests/fixtures/build-in/javascript.cjs
var require_javascript = __commonJS({
  'tests/fixtures/build-in/javascript.cjs'(exports, module) {
    module.exports = {
      version: '2022-02-01T14:30:30.000Z'
    };
  }
});
var javascript = require_javascript();

module.exports = javascript;
