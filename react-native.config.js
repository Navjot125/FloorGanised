// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// module.exports = {
//     project: {
//       ios: {},
//       android: {},
//     },
//     // assets: ['./src/assets/fonts'],
//   };

module.exports = {
  project: {
    android: {
      unstable_reactLegacyComponentNames: ['RNShimmeringView'],
    },
    ios: {
      unstable_reactLegacyComponentNames: ['RNShimmeringView'],
    },
  },
};
