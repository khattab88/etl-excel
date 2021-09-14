/* etl-excel.js (C) 2021-present  ETL-Excel -- https://www.npmjs.com/package/etl-excel */

var http = require('http');
var fs = require('fs');
var XLSX = require('xlsx');
var formidable = require('formidable');

var { ETL } = require('../lib/index');

var html = "";
var PORT = 3000;

// var extmap = {};

var server = http.createServer(function (req, res) {

    if (req.method !== 'POST') return res.end(html);

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var file = files[Object.keys(files)[0]];

        var wb = XLSX.readFile(file.path, { type: 'binary' });
        var ext = (fields.bookType || "xlsx").toLowerCase();

        const data = new ETL(wb).load();

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(data));
        res.end();
    });

}).listen(PORT);

html = [
    '<pre style="margin:10px; border:1px solid #ccc; border-radius:3px; padding:10px;">',
    '<h3><a href="https://www.npmjs.com/package/etl-excel/">ETL-Excel</a></h3>',
    'Upload a file (excel) to convert the contents to another format.',
    '',
    '<form method="POST" enctype="multipart/form-data" action="/">',
    '<input type="file" id="file" name="file"/>',
    '',
    '<input type="submit" value="Submit Form">',
    '</form>',
    '</pre>'
    ].join("\n");

console.log('listening on port ' + PORT);
