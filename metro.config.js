const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push('env');
defaultConfig.resolver.sourceExts.push('env.local');

module.exports = defaultConfig;