import pkg from "../package.json";

const manifest = {
  icons: {
    16: "icons/16.png",
    19: "icons/19.png",
    32: "icons/32.png",
    38: "icons/38.png",
    48: "icons/48.png",
    64: "icons/64.png",
    96: "icons/96.png",
    128: "icons/128.png",
    256: "icons/256.png",
    512: "icons/512.png",
  },

  "chrome_url_overrides": {
    "newtab": "src/entries/newtab/index.html"
  },

  "chrome_settings_overrides": {
    "homepage": "src/entries/newtab/index.html"
  },

  "background": {
    "scripts": ["src/workers/feed-fetcher.js"],
    
  },
};

export function getManifest() {
  return {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
    manifest_version: 3,
    permissions: ["storage"],
    host_permissions: [],
    ...manifest,
  };
}
