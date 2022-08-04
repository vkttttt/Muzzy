var express = require("express");


var resumable = require('../../../../libs/resumable.js')('./media/uploads');

var multipart = require('connect-multiparty');
var fs = require("fs")
var slugify = require('slugify');

var upload = express.Router();
upload.use(express.static(__dirname + '/public'));

upload.use(multipart());

upload.get('/', function (req, res, next) {
    res.locals.pageTitle = 'Upload';
    var dataView = {};
    return res.render('frontend/upload', dataView);
});

// Handle uploads through Resumable.js
upload.post('/upload', async function (req, res) {
    try {
        let folder = 1;
        // console.log(req.body)
        var token = req.csrfToken();
        res.cookie('CSRF-TOKEN', token);
        res.locals.csrftoken = token;
        let folderUpload = req.body.folderUpload;
        folder = req.body.folder;
        let getMonthYear = helpers.time.getMonthYear();
        let getDate = helpers.time.getDate();
        getMonthYear = getMonthYear + '/' + getDate;
        if (!folderUpload) {
            folderUpload = "media/uploads/" + getMonthYear + '/';
        } else {
            if (folder == 1) {
                folderUpload = "media/uploads/" + folderUpload + '/' + getMonthYear + '/';
            } else {
                folderUpload = "media/uploads/" + folderUpload + '/';
            }

        }
        let typeUpload = req.body.typeUpload;
        // let appearanceImage = helpers.photo.appearanceImage(typeUpload);

        if (fs.existsSync(folderUpload) == false) {
            fs.mkdirSync(folderUpload, { recursive: true });
        }
        var total = req.body.resumableTotalChunks;
        var num = req.body.resumableChunkNumber;
        resumable.post(req, async function (status, filename, original_filename, identifier, numberOfChunks) {
            // console.log('POST', status, filename, original_filename, identifier);
            if ('done' == status && total == num) {

                var concat = require('concat-files');
                var chunknames = [];
                for (var i = 1; i <= numberOfChunks; i++) {
                    var uploadname = './media/uploads/resum/resumable-' + identifier + '.' + i;
                    chunknames.push(uploadname);
                }
                var ext = filename.split('.').pop().toLowerCase();
                // filename = helpers.hash.md5(filename.replace(/[^0-9a-zA-Z_-]/img, ''));
                filename = slugify(filename.split('.').shift(), {
                    replacement: '_',  // replace spaces with replacement character, defaults to `-`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: false,      // convert to lower case, defaults to `false`
                    strict: false,     // strip special characters except replacement, defaults to `false`
                    locale: 'vi'       // language code of the locale to use
                });
                filename = filename + '_' + helpers.time.fullTime();
                concat(chunknames, './' + folderUpload + filename + '.' + ext, async function (err) {
                    if (err) {
                        console.log(err)
                    }
                    resumable.clean(identifier);
                    var photo_url = folderUpload + filename + '.' + ext;
                    var photo_url_thumb = folderUpload + filename + '_resize.' + ext;
                    var ext_images = ["jpeg", "jpg", "png"];
                    // console.log(ext, 'ext')
                    // console.log(ext_images.indexOf(ext), 'ext_images.indexOf(ext)')
                    if (ext_images.indexOf(ext) >= 0) {
                        helpers.photo.resizeCustom(photo_url, photo_url_thumb, typeUpload);
                    }
                });
            }
            res.send({ status: status, filename: './' + folderUpload + filename + '.' + ext });
        });
    } catch (error) {
        console.log(error)
    }
});

// Handle status checks on chunks through Resumable.js
// upload.get('/upload', function(req, res){
//     console.log('okoo');
//     resumable.get(req, function(status, filename, original_filename, identifier){
//         console.log('GET', status);
//         res.send((status == 'found' ? 200 : 404), status);
//     });
// });

upload.get('/resumable.js', function (req, res) {
    var fs = require('fs');
    res.setHeader("content-type", "application/javascript");
    // var resumablejs = require('resumablejs');
    fs.createReadStream('../2019_clearmen_seagames/node_modules/resumablejs/resumable.js').pipe(res);
});

module.exports = upload;