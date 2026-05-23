const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const manifest = JSON.parse(read('extension/manifest.json'));
const html = read('extension/index.html');
const app = read('extension/app.js');

assert(
  manifest.permissions.includes('bookmarks'),
  'manifest should request bookmarks permission'
);

assert(
  html.includes('id="bookmarksBarSection"'),
  'new tab page should include a Bookmarks bar section'
);

assert(
  !html.includes('<footer>') && !html.includes('id="statTabs"'),
  'legacy footer stats and attribution should be removed'
);

assert(
  app.includes('fetchBookmarksBar') && app.includes('chrome.bookmarks'),
  'app should load Chrome bookmarks bar data'
);

assert(
  app.includes('__browser-and-extensions__') && app.includes('Browser & Extensions'),
  'app should group Chrome internal and extension tabs together'
);

assert(
  app.includes('Domains |') && app.includes('Tabs'),
  'Open tabs header should show "Domains | Tabs" stats'
);

assert(
  app.includes('Close all</button>') && !app.includes('Close all ${realTabs.length} tabs'),
  'global close action should be labeled "Close all" without a count'
);

console.log('static extension checks passed');
