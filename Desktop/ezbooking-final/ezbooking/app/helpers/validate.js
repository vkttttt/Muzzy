var express = require('express');
var validator = require('validator');

class my_validate {
    constructor() {
        this.errors = [];
    };

    checkBody(field,type,req,mess){
        try {
            switch (type){
                case 'notEmpty' :
                    mess = (mess) ? mess : field+ ' is required';
                    this.notEmpty(req.body[field],mess);
                    break;
                case 'isNumeric' :
                    mess = (mess) ? mess : field+ ' must be Number';
                    this.isNumeric(req.body[field],mess);
                    break;
                case 'isBoolean' :
                    mess = (mess) ? mess : field+ ' must be Boolean (0 1 true false)';
                    this.isBoolean(req.body[field],mess);
                    break;
                case 'isFormatUsername' :
                    mess = (mess) ? mess : field+ ' 4 to 20 characters, doesn\'t contain special character';
                    this.isFormatUsername(req.body[field],mess);
                    break;
                case 'isFormatEmail' :
                    mess = (mess) ? mess : 'Email incorrect';
                    this.isFormatEmail(req.body[field],mess);
                    break;
                case 'isFormatPhone' :
                    mess = (mess) ? mess : 'Phone incorrect';
                    this.isFormatPhone(req.body[field],mess);
                    break;
            }
        }catch(e){
            this.errors.push(e.message);
        }
        return this;
    };

    notEmpty(value,mess){
        mess = (mess) ? mess : 'Value is required';
        if(value == undefined || validator.isEmpty(value,{ignore_whitespace:true})){
            this.errors.push(mess);
        }
        return this;
    };

    equals(value,value2,mess) {
        mess = (mess) ? mess : 'Value is not equal';
        if(!validator.equals(value,value2)){
            this.errors.push(mess);
        }
        return this;
    };

    isFormatEmail(value,mess){
        mess = (mess) ? mess : 'Email incorrect';
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|xyz|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if(typeof value === 'undefined' || !re.test(value)){
            this.errors.push(mess);
        }
        return this;
    };

    isFormatPhone(value,mess){
        mess = (mess) ? mess : 'Phone incorrect';
        var re = /^((01|02|03|05|07|08|09)+([0-9]{8})\b)|((02)+([0-9]{9})\b)+$/;
        if(typeof value === 'undefined' || !re.test(value)){
            this.errors.push(mess);
        }
        return this;
    };
    /**
     * 6-50 chars, at least 1 lowercase, at least 1 uppercase and at least 1 numeric
     */
    isFormatPassword(value,mess,key) {
        mess = (mess) ? mess : 'Password incorrect';
        var re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,30}$/;
        if(typeof value === 'undefined' || !re.test(value)){
            if(key){
                this.errors.push({key:key,mess:mess});
            }else{
                this.errors.push(mess);
            }
        }
        return this;
    };
    isNumeric (value,mess){
        mess = (mess) ? mess : 'Value must be Number';
        if(value == undefined || !validator.isNumeric(value,{no_symbols:true})){
            this.errors.push(mess);
        }
        return this;
    };

    isBoolean (value,mess){
        mess = (mess) ? mess : 'Value must be Boolean (0 1 true false)';
        if(value == undefined || !validator.isBoolean(value,{no_symbols:true})){
            this.errors.push(mess);
        }
        return this;
    };

    isObjectId(value,mess){
        mess = (mess) ? mess : 'Value must be ObjectId';
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if(!checkForHexRegExp.test(value)){
            this.errors.push(mess);
        }
        return this;
    };

    isArray(value,mess){
        try{
            mess = (mess) ? mess : 'Value must be Array';
            if(value === null || typeof value !== 'object' || value.constructor !== Array){
                this.errors.push(mess);
            }
            return this;
        }catch(e){
            return this;
        }

    };

    isObject(value,mess){
        try{
            mess = (mess) ? mess : 'Value must be Object';
            if(value === null || typeof value !== 'object' || value.constructor !== Object){
                this.errors.push(mess);
            }
            return this;
        }catch(e){
            return this;
        }
    };

    isFormatUsername(value,mess){
        mess = (mess) ? mess : 'Username must be 4 to 20 characters, doesn\'t contain special character';
        var regex = new RegExp("^[A-Za-z_0-9]{4,20}$");
        if(typeof value === 'undefined' || !regex.test(value)){
            this.errors.push(mess);
        }

        return this;
    };

    //check some format
    isFormat(value, type, mess){
        mess = (mess) ? mess : 'Value incorrect format';
        var regex = null;
        switch (type){
            case 1 :
                //letters, number, and  [_]
                regex = new RegExp("^[A-Za-z0-9_]{3,30}$");
                if(typeof value === 'undefined' || !regex.test(value)) this.errors.push(mess);
                break;
            case 2 :
                //letters, and  [-_]
                regex = new RegExp("^[A-Za-z_]{3,30}$");
                if(typeof value === 'undefined' || !regex.test(value)) this.errors.push(mess);
                break;
            case 3 :
                //letters, and  [-_]
                regex = new RegExp("^[A-Za-z0-9_,]{3,}$");
                if(typeof value === 'undefined' || !regex.test(value)) this.errors.push(mess);
                break;
        }
        return this;
    };

    isPattern(value,pattern,mess){
        mess = (mess) ? mess : 'value incorrect format';
        var regex = new RegExp(pattern);
        if(typeof value === 'undefined' || !regex.test(value)) this.errors.push(mess);
        return this;
    };

    //check if the string contains only letters (a-zA-Z).
    isAlpha(value , mess, locale = 'en-US'){
        mess = (mess) ? mess : 'The string must be contains only letters (a-zA-Z)';
        if(!validator.isAlpha(value,locale)){
            this.errors.push(mess);
        }
        return this;
    };

    //check if the string contains only letters and numbers.
    isAlphanumeric(value , mess, locale = 'en-US'){
        mess = (mess) ? mess : 'The string must be contains only letters (a-zA-Z)';
        if(!validator.isAlphanumeric(value,locale)){
            this.errors.push(mess);
        }
        return this;
    };

    /** check file type
     *
     * @param file_upload
     * @param mimetype []
     * @param mess
     * @returns {my_validate}
     */
    checkFileType(file_upload , mimetype, mess){
        if(mimetype.indexOf(file_upload.mimetype) == -1){
            mess = (mess) ? mess : 'Chỉ chấp nhận dạng file: ' + mimetype;
            this.errors.push(mess);
        }
        return this;
    };

    /** check file size
     *
     * @param file_upload
     * @param size
     * @param mess
     * @returns {my_validate}
     */
    checkFileSize(file_upload , size, mess){
        if(file_upload.size > size){
            mess = (mess) ? mess : 'Dung lượng tối đa ' + Math.floor(size / 1048576) + 'MB';
            this.errors.push(mess);
        }
        return this;
    };
    /** Check has error
     *
     * @returns {*}
     */
    hasErrors(){
        if(this.errors.length > 0){
            var err = this.errors;
            this.errors = [];
            return err;
        }
        return null;
    }
}

module.exports = my_validate;