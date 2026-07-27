const { getDefaultConfig } = require("expo/metro-config");
const withNativeWind = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Make sure input configurations have dark mode explicitly targeted to class mappings
module.exports = withNativeWind(config, { input: "./global.css", darkMode: "class" });
