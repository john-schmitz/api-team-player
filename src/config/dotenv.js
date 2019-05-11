'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var Config = /** @class */ (function() {
  function Config() {
    this.portaAPI = process.env.PORT || '8000';
  }
  return Config;
})();
exports.default = new Config();
