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

var previousShowing = -1;
var orderedCells = [];

function newSwitchThumbnails(rows, cells) {
  var parent = cells[0].parentNode;

  var showing = 0;
  var i = 0;
  for (let cell of cells) {
    if (previousShowing === -1) {
      // First time through…
      cell.setAttribute('originalPosition', '' + i);
      orderedCells.push(cell);
    }

    let testCell = document.elementFromPoint(cell.offsetLeft + 1, cell.offsetTop + 1);
    let className = 'null';
    if (testCell) {
      className = testCell.className;
    }
    if (className === 'newtab-cell' || className === 'newtab-thumbnail') {
      showing++;
    }
    i++;
  }

  if (showing === previousShowing) {
    return;
  }

  // console.log('Switching ' + showing + ' of ' + cells.length + ' cells.');

  // Re-order everything.
  for (let cell of cells) {
    cell.remove();
  }
  for (let i = 0; i < showing; i++) {
    parent.insertBefore(orderedCells[i], parent.firstChild);
  }
  for (let i = showing; i < orderedCells.length; i++) {
    parent.appendChild(orderedCells[i]);
  }

  previousShowing = showing;
}


function oldSwitchThumbnails(rows, cells) {
  if (previousShowing !== -1) {
    return;
  }

  var i = 0;
  for (let cell of cells) {
    cell.setAttribute('originalPosition', '' + i);
  }

  // console.log(rows.length + ' rows. ' + cells.length + ' cells.');
  for (let cell of cells) {
    cell.remove();
  }
  var layout = LAYOUT.slice()
  for (let row of rows) {
    row.appendChild(cells[layout.shift()]);
    row.appendChild(cells[layout.shift()]);
    row.appendChild(cells[layout.shift()]);
  }
  previousShowing = 0;
}

function switchThumbnails() {
  var rows = document.querySelectorAll('.newtab-row');
  var cells = document.querySelectorAll('.newtab-cell');

  if (cells.length === 0) {
    return;
  }

  if (rows.length === 0) {
    newSwitchThumbnails(rows, cells);
  } else {
    oldSwitchThumbnails(rows, cells);
  }
}

addEventListener('load', switchThumbnails);
addEventListener('resize', switchThumbnails);

switchThumbnails();