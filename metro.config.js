// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// ensure Metro processes Firebase’s CommonJS files:
config.resolver.sourceExts.push('cjs');
// disable the new package-exports behavior so Firebase’s internal modules load
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
