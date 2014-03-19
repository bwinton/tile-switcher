/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
  strict:true, undef:true, unused:true, curly:true, browser:true, white:true,
  moz:true, esnext:false, indent:2, maxerr:50, devel:true, node:true, boss:true,
  globalstrict:true, nomen:false, newcap:false */

/*global self:false */

'use strict';

const LAYOUT = [
  8, 7, 6,
  5, 4, 3,
  2, 1, 0
];

function switchThumbnails() {
  var rows = document.querySelectorAll('.newtab-row');
  var cells = document.querySelectorAll('.newtab-cell');
  console.log(rows.length + ' rows.  ' + cells.length + ' cells.');
  var i = 0;
  for (let cell of cells) {
    cell.remove();
    cell.setAttribute('data', '' + i);
    i++;
  }
  var layout = LAYOUT.slice()
  for (let row of rows) {
    row.appendChild(cells[layout.shift()]);
    row.appendChild(cells[layout.shift()]);
    row.appendChild(cells[layout.shift()]);
  }
}

switchThumbnails();