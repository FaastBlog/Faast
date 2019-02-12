// sw.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: "faast.com",
    suffix: "v1",
    precache: "precache",
    runtime: "runtime-cache"
  });
  
  // let Workbox handle our precache list
  // NOTE: This will be populated by jekyll-workbox-plugin.
  workbox.precaching.precacheAndRoute([]);