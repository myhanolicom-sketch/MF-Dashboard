const { withModuleFederation } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederation({
  name: 'mfe-dashboard',
  filename: 'remoteEntry.js',

  exposes: {
    './Component': './src/app/dashboard.component.ts',
    './Module': './src/app/dashboard.component.ts'
  },

  shared: {
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    '@angular/router': { singleton: true, strictVersion: true },
    'rxjs': { singleton: true },
    'primeng': { singleton: true }
  }
});