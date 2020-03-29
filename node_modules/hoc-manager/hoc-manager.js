'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class HOCManager {
  constructor() {
    this.getComponentDisplayName = Component => {
      return Component.displayName || Component.name || 'Unknown';
    };

    this.getOpts = opts => {
      return Object.assign({
        acceptParameters: false
      }, opts);
    };

    this.create = (getComponent, opts) => {
      opts = this.getOpts(opts);

      return function (...parameters) {
        if (!opts.acceptParameters) {
          const ComposedComponent = parameters[0];
          return getComponent(ComposedComponent, {});
        }

        return ComposedComponent => getComponent(ComposedComponent, parameters);
      };
    };
  }

}

exports.default = new HOCManager();