/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
strict:true, undef:true, unused:true, curly:true, browser:true, white:true,
moz:true, esnext:false, indent:2, maxerr:50, devel:true, node:true, boss:true,
globalstrict:true, nomen:false, newcap:false */

"use strict";

// var micropilot = require('./micropilot');
var prefs = require('sdk/simple-prefs');
var self = require('sdk/self');
var tabs = require('sdk/tabs');
var timeout = require('sdk/timers').setTimeout;

const STUDY_ID = 'tile-switcher';
const UPLOAD_URL = 'https://tile-switcher.paas.allizom.org/data/' + STUDY_ID;

// var study = micropilot.Micropilot(STUDY_ID);

// var registerListener = debounce(function () {
//   study.record({
//     id: 'registration_attempted',
//     ts: Date.now(),
//   });
//   study.ezupload({
//     url: UPLOAD_URL //, simulate: true
//   });
// }, 1000);


var addContentScript = function (tab, doneTrying) {
  var worker;
  if (tab.url === 'about:blank' && !doneTrying) {
    // Wait half a second and see if it's better then.
    timeout(function () {
      addContentScript(tab, true);
    }, 500);
  }
  if (tab.url === 'about:newtab') {
    worker = tab.attach({
      contentScriptFile: self.data.url("newtabicons-content.js"),
      contentScriptOptions: { }
    });
    worker.port.emit('init');
  }
};

var tabOpen = function (tab) {
  if (!tab) {
    tab = tabs.activeTab;
  }
  return addContentScript(tab);
};


exports.main = function () {
  // study.start();

  tabs.on('open', tabOpen);
  tabOpen();

  // prefs.on('register2', registerListener);
  // registerListener();
  
};

exports.onUnload = function () {
  // prefs.removeListener('register2', registerListener);
  
  tabs.removeListener('open', tabOpen);
  
  // study.ezupload({
  //   url: UPLOAD_URL //, simulate: true
  // });

};