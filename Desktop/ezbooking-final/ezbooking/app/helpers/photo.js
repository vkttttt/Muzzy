var fs = require("fs");
var md5 = require('md5');
var path = require('path');
var moment = require('moment');
var sharp = require('sharp');

var photo = {};

photo.resize = function (data, des, w, h) {
    return new Promise(function (resolve, reject) {
        sharp(_basepath + data).resize(w).toFile(_basepath + des).then(data => {
            return resolve(data);
        }).catch(err => {
            console.log('err', err);
            return resolve(false);
        });
    });
};

photo.resizeCustom = function (data, des, typeUpload) {
    let appearanceImage = this.appearanceImage(typeUpload);
    return new Promise(function (resolve, reject) {
        const image = sharp(_basepath + data);
        image
            .metadata()
            .then(function (metadata) {
                // console.log(metadata)
                let w = appearanceImage.width;
                if (metadata.width < w) {
                    w = Math.round(metadata.width / 2);
                }
                if (appearanceImage.watermark) {
                    if (appearanceImage.resize) {
                        if (appearanceImage.resize_all) {
                            return image
                                .resize(w, appearanceImage.height)
                                .composite([{ input: _basepath + 'public/admin/images/avatar/default.jpg', gravity: 'southeast' }])
                                .toFile(_basepath + des)
                                .then(data => {
                                    // console.log(data)
                                    return resolve(data);
                                }).catch(err => {
                                    console.log('err', err);
                                    return resolve(false);
                                });
                        } else {
                            return image
                                .resize(w)
                                .composite([{ input: _basepath + 'public/admin/images/avatar/logo11_1.png', gravity: 'southeast' }])
                                .toFile(_basepath + des)
                                .then(data => {
                                    // console.log(data)
                                    return resolve(data);
                                }).catch(err => {
                                    console.log('err', err);
                                    return resolve(false);
                                });
                        }

                    } else {
                        return image
                            // .resize(w)
                            .composite([{ input: _basepath + 'public/admin/images/avatar/logo11_1.png', gravity: 'southeast' }])
                            .toFile(_basepath + des)
                            .then(data => {
                                // console.log(data)
                                return resolve(data);
                            }).catch(err => {
                                console.log('err', err);
                                return resolve(false);
                            });
                    }

                } else {
                    if (appearanceImage.resize) {
                        if (appearanceImage.resize_all) {
                            return image
                                .resize(w, appearanceImage.height)
                                .toFile(_basepath + des)
                                .then(data => {
                                    // console.log(data)
                                    return resolve(data);
                                }).catch(err => {
                                    console.log('err', err);
                                    return resolve(false);
                                });
                        } else {
                            return image
                                .resize(w)
                                .toFile(_basepath + des)
                                .then(data => {
                                    // console.log(data)
                                    return resolve(data);
                                }).catch(err => {
                                    console.log('err', err);
                                    return resolve(false);
                                });
                        }

                    } else {
                        return image
                            // .resize(w)
                            .toFile(_basepath + des)
                            .then(data => {
                                // console.log(data)
                                return resolve(data);
                            }).catch(err => {
                                console.log('err', err);
                                return resolve(false);
                            });
                    }

                }

            });
    })
}

photo.appearanceImage = function (type) {
    let appearance = {};
    switch (type) {
        case 'slider':
            appearance = {
                resize: false,
                width: 1920,
                height: 1000,
                watermark: false,
                resize_all: false,
            }
            break;

        case 'partner':
            appearance = {
                resize: true,
                width: 183,
                height: 132,
                watermark: false,
                resize_all: false,
            }
            break;

        case 'project':
            appearance = {
                resize: true,
                width: 1000,
                height: 667,
                watermark: false,
                resize_all: false,
            }
            break;
        case 'testimonial':
            appearance = {
                resize: true,
                width: 160,
                height: 160,
                watermark: false,
                resize_all: false,
            }
            break;
        case 'image':
            appearance = {
                resize: true,
                width: 1000,
                height: 667,
                watermark: false,
                resize_all: false,
            }
            break;

        case 'team':
            appearance = {
                resize: true,
                width: 370,
                height: 370,
                watermark: false,
                resize_all: false,
            }
            break;

        default:
            appearance = {
                resize: true,
                width: 1920,
                height: 1000,
                watermark: false,
                resize_all: false,
            }
            break;
    }
    return appearance;
};


photo.readImage = function (image, type) {
    try {
        // console.log(image);
        if (image) {
            var ext = image.split('.').pop().toLowerCase();

            var name = image.split('.').shift();
            if (type && name && ext) {
                return _baseUrl + name + '_' + type + '.' + ext + '?v=' + _versionCache;
            } else {
                return _baseUrl + image + '?v=' + _versionCache;
            }
        }
        return _baseUrl + image + '?v=' + _versionCache;
    } catch (error) {
        console.log(error)
        return _baseUrl + image + '?v=' + _versionCache;
    }
};

module.exports = photo;