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

var previousShowing = 0;

function switchThumbnails() {
  var cells = document.querySelectorAll('.newtab-cell');
  console.log('Switching ' + cells.length + ' cells.');

  if (cells.length === 0) {
    return;
  }

  var parent = cells[0].parentNode;

  var i = 0;
  var showing = 0;
  var cell;
  for (cell of cells) {
    var testCell = document.elementFromPoint(cell.offsetLeft, cell.offsetTop);
    console.log('Classname at ' + cell.offsetLeft + 'x' + cell.offsetTop + ' = ' + testCell.className);
    // console.log(testCell.outerHTML);
    if (testCell.className === 'newtab-cell' || testCell.className === 'newtab-thumbnail') {
      showing++;
    }
    cell.remove();
    cell.setAttribute('originalPosition', '' + i);
    i++;
  }
  console.log('Showing = ' + showing);
  for (cell of cells) {
    parent.insertBefore(cell, parent.firstChild);
  }
}

addEventListener('load', switchThumbnails);
addEventListener('resize', switchThumbnails);

switchThumbnails();