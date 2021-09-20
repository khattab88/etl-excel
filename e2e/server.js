/* etl-excel.js (C) 2021-present  ETL-Excel -- https://www.npmjs.com/package/etl-excel */

var http = require('http');
var fs = require('fs');
var XLSX = require('xlsx');
var formidable = require('formidable');

var { FileType, ETL } = require('../lib/index');

var html = "";
var PORT = 3000;

var server = http.createServer(function (req, res) {

    if (req.method !== 'POST') return res.end(html);

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var fileType = fields.fileType;

        var upload = files[Object.keys(files)[0]];
        var file = XLSX.readFile(upload.path, { type: 'binary' });

        try {
            const data = new ETL(fileType, file).load();

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(data));
            res.end();
        }
        catch (err) {
            console.log(err);

            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                error: {
                    statusCode: 400,
                    message: err.message
                }
            }));
            res.end();
        }
    });

}).listen(PORT);

html = [
    '<pre style="margin:10px; border:1px solid #ccc; border-radius:3px; padding:10px; padding-left: 30px;">',
    '<h3><a href="https://www.npmjs.com/package/etl-excel/">ETL-Excel</a></h3>',
    'Upload a file (excel) to convert the contents to another format.',
    '<form method="POST" enctype="multipart/form-data" action="/">',
    '<label for="fileType">File Type</label>',
    '<select name="fileType">',
    '',
    [
        ["SelectFileType", "Select File Type"],
        ["AgeCategoryByVillage", "Age Category By Village File"],
        ["GenderByFollower", "Gender By Follower File"]
    ].map(function (x) { return '<option value="' + x[0] + '">' + x[1] + '</option>'; }).join("\n"),
    '</select>',
    '<br>',
    '<input type="file" id="file" name="file"/>',
    '',
    '<input type="submit" value="Submit Form">',
    '</form>',
    '</pre>'
].join("\n");

console.log('listening on port ' + PORT);
