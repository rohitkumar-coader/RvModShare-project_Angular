/*
Put content of angular2 build into 'public' folder.
*/
const html = './dist/Sports-frontend/';

const port = 4022;
const apiUrl = '/api';

// Express
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');

import {join} from 'path';
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const DIST_FOLDER = join(process.cwd(), 'dist');
const template = fs.readFileSync(path.join(DIST_FOLDER, 'Sports-frontend/index.html')).toString();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
global['screen'] = win.screen;
global['localStorage'] = localStorage;
var app = express();

app
.use(compression())
.use(bodyParser.json())
// Static content
.use(express.static(html))
// Default route
.use(function(req, res) {
res.sendFile(__dirname + '/dist/Sports-frontend/index.html');
})
// Start server
.listen(port, function () {
console.log('Port: ' + port);
console.log('Html: ' + html);
});
