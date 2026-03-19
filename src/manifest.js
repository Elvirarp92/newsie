import pkg from "../package.json";

const manifest = {
  icons: {
    32: "icons/newsie-32x32.png",
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
    optional_permissions: ["*://*/*"],
    ...manifest,
  };
}
