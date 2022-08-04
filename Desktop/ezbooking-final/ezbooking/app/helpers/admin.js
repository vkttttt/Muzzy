var request = require('request');
var moment = require('moment');
var md5 = require('md5');
var querystring = require('querystring');
var pagination = require('pagination');
var fs = require('fs');
var adminModel = require('../modules/admin/models');
var ezbookingModel = require('../modules/ezbooking/models');

var helper = {};

helper.authAdmin = async function (req, res, next) {
    var admin_userdata = req.session.admin_userdata;
    if (typeof admin_userdata === 'undefined' || admin_userdata === null) {
        return helpers.base.redirect(res, 'admin/login');
    }

    if (!appConfig.role_systems) {
        //get role in db and set variable global
        appConfig.role_systems = [];
        var roles = await adminModel.findAll('adminRoles', { role: { $ne: 'root' } });
        roles.forEach(function (field) {
            appConfig.role_systems.push(field.role);
        });
    }

    if (admin_userdata.role == 'root') {
        if (req.body._csrf !== undefined) delete req.body._csrf;
        //helpers.log.tracking(req);
        return next();
    }

    var originalUrl = req.originalUrl;
    var resources = helpers.base.parse_resource(originalUrl);
    var list_perms = req.session.admin_userdata.list_perms;
    var perms = [];
    list_perms.forEach(function (per) {
        if (resources.module == per.module && resources.resource == per.resource) {
            perms = per.permissions;
        }
    });

    //set perms for resource using display button add,edit,delete ...
    req.session.admin_userdata.perms = perms;

    if (perms) {
        if (perms.indexOf(resources.method) != -1) {
            if (req.body._csrf !== undefined) delete req.body._csrf;
            //helpers.log.tracking(req);
            return next();
        } else {
            return req.method == 'POST' ? res.status(200).send('No Permission') : helpers.base.redirect(res, 'admin/no_permission');
        }
    } else {
        return req.method == 'POST' ? res.status(200).send('No Permission') : helpers.base.redirect(res, 'admin/no_permission');
    }
};

/* Check perm by module,resource
 *
 * @param String module
 * @param String resource
 * @param String perm
 * @param Object admin_userdata (is req.session.admin_userdata)
 *
 * @return Boolean
 */
helper.checkPermByResource = function (module, resource, perm, admin_userdata) {
    if (admin_userdata.role == 'root') return true;
    return admin_userdata.list_perms.some((item) => {
        return item.module == module && item.resource == resource && item.permissions.indexOf(perm) > -1;
    });
};

/* Check perm of resource current
 *
 * @param String perm
 * @param Object admin_userdata (is req.session.admin_userdata)
 *
 * @return Boolean
 */
helper.checkPerm = function (perm, admin_userdata) {
    if (admin_userdata.role == 'root') return true;
    var perms = admin_userdata.perms;
    return perms && perms.indexOf(perm) != -1;
};

helper.get_data_view_admin = function (req, mod_config = null) {
    return {
        title: 'Dashboard Admin',
        fullname: req.session.admin_userdata ? req.session.admin_userdata.fullname : '',
        avatar: req.session.admin_userdata ? req.session.admin_userdata.avatar : '',
        username: req.session.admin_userdata ? req.session.admin_userdata.username : '',
        role: req.session.admin_userdata ? req.session.admin_userdata.role : '',
        user_id: req.session.admin_userdata ? req.session.admin_userdata.user_id : '',
        msg_success: req.flash('msg_success'),
        msg_warning: req.flash('msg_warning'),
        msg_error: req.flash('msg_error'),
        valid_errors: req.flash('valid_errors'),
        post_data: req.flash('post_data'),
        mod_module: mod_config ? mod_config.module : '',
        mod_route: mod_config ? mod_config.route : '',
        mod_resource: mod_config ? mod_config.resource : '',
        mod_alias: mod_config ? mod_config.alias : '',
        mod_url: mod_config ? _baseUrl + mod_config.route : '',
        branch: req.session.admin_userdata ? req.session.admin_userdata.branch ? req.session.admin_userdata.branch : '' : '',
    };
};

/* Get custom fields by role or default fields
 *
 * @param String module
 * @param String resource
 * @param String role
 *
 * @return Object | null
 */
helper.get_custom_fields = async function (module, resource, role) {
    try {
        //find custom fields
        var where = {
            module: module,
            resource: resource,
            role: role,
        };
        var items = await adminModel.findOne('adminCustomFields', where, '-_id custom_fields');
        if (items && items.custom_fields != undefined && items.custom_fields.length > 0) {
            return items.custom_fields;
        }
        //find default fields
        where = {
            module: module,
            name: resource,
        };
        items = await adminModel.findOne('adminResources', where, '-_id default_fields');

        return items && items.default_fields != undefined && items.default_fields.length > 0 ? items.default_fields : null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

helper.menus = async function (role) {
    var menus = await adminModel.findAll('adminMenus', { status: true }, '', { weight: 1 });
    var adminPermissions = await adminModel.findAll('adminPermissions', { role: role }, '-_id role module resource permissions');
    var ppp = [];
    var tmp = [];
    menus.forEach(function (item, index) {
        if (item.parent_id) {
            let per = module.exports.get_permission(item.link, adminPermissions, role);
            if (per) {
                tmp.push(item);
            }
        } else {
            let n_data = {
                _id: item._id,
                name: item.name,
                link: item.link,
                weight: item.weight,
                icon: item.icon,
                parent_id: item.parent_id,
                is_dashboard: item.is_dashboard,
                childs: [],
            };
            if (item.link != '#') {
                let per = module.exports.get_permission(item.link, adminPermissions, role);
                if (per) {
                    ppp.push(n_data);
                }
            } else {
                ppp.push(n_data);
            }
        }
    });

    //get child
    ppp.forEach(function (item, index) {
        var childs = module.exports.get_menu_childs(item._id, tmp);
        if (childs.length > 0) {
            childs.sort(function (a, b) {
                return a.weight - b.weight;
            });
            ppp[index].childs = childs;
        }
    });

    //remove menu hasn't childs
    ppp.forEach(function (item, index) {
        if (item.link == '#' && item.childs.length == 0) {
            delete ppp[index];
        }
    });
    return ppp;
};

helper.get_menu_childs = function (id, arr) {
    var tmp = [];
    arr.forEach(function (item) {
        if (item.parent_id == id) {
            tmp.push(item);
            delete item;
        }
    });
    return tmp;
};
helper.get_permission = function (link, perm, role) {
    if (role == 'root') {
        return true;
    }
    var flag_per = false;
    link = link.split('/');
    if (link.length < 2) {
        return flag_per;
    }
    perm.forEach(function (item) {
        if (item.role == role && link[0] == item.module && link[1] == item.resource && item.permissions.indexOf('view') !== -1) {
            flag_per = true;
        }
    });
    return flag_per;
};

/*
 * Get field format
 *
 */
helper.get_field_value = function (field, value, type) {
    try {
        if (value === null || value === undefined) return '';
        value = this.filterXSS(value);
        switch (type) {
            case 'Date':
                value = moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss');
                break;
            case 'Mixed':
                value = Object.keys(value)
                    .map(function (key) {
                        return key + ' : ' + value[key] + '<br>';
                    })
                    .join(' ');
                break;
            case 'Array':
                if(field == 'table_list'){
                    let str = "<table class='table_list'><tr class='table_list'><th class='table_list'>Hàng</th><th class='table_list'>Cột</th><th class='table_list'>Loại</th></tr>"
                    for (var item of value){ 
                        var table = item.replace(/&quot;/g, '"')
                        table = JSON.parse(table);
                        str += "<tr class='table_list'><td class='table_list'>"+table.position_x+"</td><td class='table_list'>"+table.position_y+"</td><td class='table_list'>"+table.slot+" chỗ</td></tr>"
                    }
                    str += "</table>";
                    value = str;
                }
                else value = JSON.stringify(value);
                break;
            case 'String':
                let ext = value.split('.').pop();
                if (['jpg', 'JPG', 'png', 'PNG', 'jpeg', 'JPEG'].indexOf(ext) != -1) {
                    if (value.indexOf('http') == 0) {
                        value = '<img class="avatar" style="width: 200px" src="' + value + '">';
                    } else {
                        value = '<img class="avatar" style="width: 200px" src="' + _staticUrl + value + '">';
                    }
                } else if (value.indexOf('http') == 0 && value.indexOf('graph.facebook') > 0) {
                    //photo facebook
                    value = '<img class="avatar" src="' + value + '">';
                } else if (value.indexOf('http') == 0) {
                    //value = '<a href="'+value+'" alt="'+value+'" target="_blank"><span data-toggle="tooltip" data-original-title="'+value+'">Open link</span></a>';
                }
                break;
            case 'Link':
                value = '<a href="' + value + '">' + value + '</a>';
                break;
            default:
                value = typeof value != 'undefined' ? value : '';
        }
        return value;
    } catch (e) {
        return '';
    }
};

/* Render status
 * return status label
 */
helper.render_status = function (status, label) {
    try {
        label = label || [
            { color: 'red', text: 'Disable' },
            { color: 'green', text: 'Active' },
            { color: 'yellow', text: 'Waiting' },
        ];
        var html = '';
        var color = '';
        var text = '';
        switch (status) {
            case 0:
            case false:
                color = label[0].color;
                text = label[0].text;
                break;
            case 1:
            case true:
                color = label[1].color;
                text = label[1].text;
                break;
            case 2:
                color = label[2].color;
                text = label[2].text;
                break;
            default:
                html = status;
        }
        html = '<small class="label bg-' + color + '">' + text + '</small>';
        return html;
    } catch (e) {
        return '';
    }
};

/*
 * Get body data
 *
 * return field value
 */
helper.get_query_data = function (data, field) {
    var value = '';
    if (data === null || typeof data != 'object' || !field) {
        return value;
    }
    try {
        if (data[field] !== undefined) {
            value = data[field];
        } else if (typeof data[0] !== 'undefined') {
            value = data[0][field];
        }
        return this.filterXSS(value);
    } catch (e) {
        console.log(e);
        return this.filterXSS(value);
    }
};

/* Render menu button default view,edit,delete
 * return multiple buttons
 */
helper.render_menu_buttons = function (mod_module, mod_resource, admin_userdata) {
    try {
        var html = '';
        var default_perms = ['add', 'delete', 'import', 'export'];
        var perms = admin_userdata.role == 'root' ? default_perms : admin_userdata.perms;
        perms.forEach(function (perm) {
            href = _baseUrl + mod_module + '/' + mod_resource + '/' + perm;
            switch (perm) {
                case 'add':
                    html += '<a href="' + href + '"><button type="button" class="btn btn-primary">Add</button></a> ';
                    break;
                case 'delete':
                    html += '<a role="button"><button type="button" class="btn btn-primary JsDeleteItem">Delete</button></a> ';
                    break;
                case 'import':
                    html += '<a href="' + href + '"><button type="button" class="btn btn-primary">Import</button></a> ';
                    break;
                case 'export':
                    html += '<a href="' + href + '"><button type="button" class="btn btn-primary">Export</button></a> ';
                    break;
                default:
            }
        });
        return html;
    } catch (e) {
        return '';
    }
};

/* Render menu button custom
 * return one buttons
 */
helper.render_menu_button = function (url, perm, admin_userdata, label = '') {
    try {
        var html = '';
        if (admin_userdata.role != 'root') {
            var perms = admin_userdata.perms;
            if (perms.indexOf(perm) == -1) {
                return html;
            }
        }
        if (label == '') label = perm;
        var href = _baseUrl + url;
        html += '<a href="' + href + '"><button type="button" class="btn btn-primary">' + label + '</button></a>';
        return html;
    } catch (e) {
        return '';
    }
};

/* Render default action buttons
 *
 * @param String _id : id of record
 * @param String module
 * @param String resource
 * @param Object admin_userdata
 *
 * @return html | ''
 */
helper.render_action_buttons = function (_id, module, resource, admin_userdata) {
    try {
        var html = '';
        var default_perms = ['detail', 'edit', 'delete'];
        var perms = admin_userdata.role == 'root' ? default_perms : admin_userdata.perms;
    
        if (resource == 'floors'){
            default_perms.push('table_plan');
        }
        perms.forEach(function (perm) {
            var href = _baseUrl + module + '/' + resource + '/' + perm + '/' + _id;
            switch (perm) {
                case 'detail':
                    html += '<a title="Detail" href="' + href + '" class="btn action"><i class="fa fa-info-circle"></i></a>';
                    break;
                case 'edit':
                    html += '<a title="Edit" href="' + href + '" class="btn action"><i class="fa fa-edit"></i></a>';
                    break;
                case 'table_plan':
                    html += '<a title="Table plan" href="' + href + '" class="btn action"><i class="fa fa-table"></i></a>';
                    break;
                case 'delete':
                    html +=
                        '<a title="Delete" data-id="' +
                        _id +
                        '" data-url="' +
                        _baseUrl +
                        module +
                        '/' +
                        resource +
                        '/' +
                        perm +
                        '" role="button" class="btn action JsDeleteItemRow"><i class="fa fa-trash"></i></a>';
                    break;
                default:
            }
        });
        return html;
    } catch (e) {
        return '';
    }
};

/* Render custom action button
 *
 * @param String url : url action
 * @param String perm
 * @param Object admin_userdata
 * @param String icon : html | text
 * @param Stirng des
 *
 * @return html | ''
 */
helper.render_action_button = function (url, perm, admin_userdata, icon = '', des = '') {
    try {
        var html = '';
        if (admin_userdata.role != 'root') {
            var perms = admin_userdata.perms;
            if (perms.indexOf(perm) == -1) {
                return html;
            }
        }

        if (icon == '') icon = perm;
        if (des == '') des = perm;
        var href = _baseUrl + url;
        html += '<a title="' + des + '" href="' + href + '" class="btn action">' + icon + '</a>';
        return html;
    } catch (e) {
        return '';
    }
};

/*
 *Hhash password
 *
 * return field value
 */
helper.hash_password = function (string) {
    var hash_pass = string + appConfig.secret.password;
    return md5(md5(hash_pass));
};

/*
 *Format password
 * Password must be 8 characters or longer, at least 1 lowercase, at least 1 uppercase, at least 1 numeric and 1 special character
 * return boolean
 */
helper.format_password = function (string) {
    var regexPassword = new RegExp('^(?=.*[A-z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$');
    return regexPassword.test(string);
};

/*
 *Format username
 * Username must be 4 characters or longer, at least 1 lowercase, at least 1 uppercase, at least 1 numeric and 1 special character
 * return boolean
 */
helper.format_username = function (string) {
    var regex = new RegExp('^[A-Za-z_0-9@.]{4,20}$');
    return regex.test(string);
};

/*
 *Format username
 * Username must be 4 characters or longer, at least 1 lowercase, at least 1 uppercase, at least 1 numeric and 1 special character
 * return boolean
 */
helper.format_email = function (string) {
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|xyz|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return re.test(string);
};

helper.htmlEscape = function (text) {
    if (typeof text != 'string') return text;

    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;') // it's not neccessary to escape >
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

helper.filterXSS = function (data) {
    try {
        if (typeof data === 'object') {
            for (const prop1 in data) {
                if (typeof data[prop1] === 'object') {
                    for (const prop2 in data[prop1]) {
                        data[prop1][prop2] = this.htmlEscape(data[prop1][prop2]);
                    }
                } else {
                    data[prop1] = this.htmlEscape(data[prop1]);
                    //console.log(`obj.${prop} = ${obj[prop]}`);
                }
            }
        } else {
            data = this.htmlEscape(data);
        }
        return data;
    } catch (e) {
        return {};
    }
};

helper.build_query = function (obj, temp_key) {
    var output_string = [];
    Object.keys(obj).forEach(function (val) {
        var key = val;
        if (key != 'page') {
            //num_prefix && !isNaN(key) ? key = num_prefix + key : '';
            var key = querystring.escape(key.replace(/[!'()*]/g, escape));
            temp_key ? (key = temp_key + '[' + key + ']') : '';
            if (typeof obj[val] === 'object') {
                var query = module.exports.build_query(obj[val], key);
                output_string.push(query);
            } else {
                obj[val] = String(obj[val]);
                var value = querystring.escape(obj[val].replace(/[!'()*]/g, escape));
                output_string.push(key + '=' + value);
            }
        }
    });
    return output_string.join('&');
};

helper.filterQuery = function (query, fields) {
    var conditions = {};
    try {
        var queryFields = Object.keys(query);
        if (queryFields.length > 0) {
            queryFields.forEach(function (field) {
                if (field == 'from_date' || field == 'to_date') {
                    var parseDateForm = Date.parse(query.from_date);
                    var parseDateTo = Date.parse(query.to_date);
                    if (!isNaN(parseDateForm) && !isNaN(parseDateTo)) {
                        var to_date = new Date(query.to_date);
                        to_date.setDate(to_date.getDate() + 1);
                        var from_date = new Date(query.from_date) - 25200000;
                        to_date = to_date - 25200000;
                        conditions.createdAt = { $gte: from_date, $lt: to_date };
                    } else if (!isNaN(parseDateForm)) {
                        conditions.createdAt = { $gte: new Date(query.from_date) - 25200000 };
                    } else if (!isNaN(parseDateTo)) {
                        conditions.createdAt = { $lt: new Date(query.to_date) - 25200000 };
                    }
                } else {
                    switch (fields[field]) {
                        case 'String':
                            var escape_advanced_search = helpers.base.escapeFunc(query[field]);
                            var regex_advanced_search = new RegExp(escape_advanced_search, 'i');
                            conditions[field] = { $regex: regex_advanced_search, $options: 'i' };
                            break;
                        case 'Number':
                            if (!isNaN(query[field]) && query[field]) {
                                conditions[field] = { $eq: query[field] };
                            } else {
                                conditions[field] = null;
                            }
                            break;
                        case 'Date':
                            //code here
                            var parseDate = Date.parse(query[field]);
                            if (!isNaN(parseDate)) {
                                var end_date = new Date(query[field]);
                                end_date.setDate(end_date.getDate() + 1);
                                conditions[field] = { $gte: new Date(query[field]), $lt: end_date };
                            }
                            break;
                        case 'ObjectID':
                            //validate ObjectID
                            var validator = new helpers.validate();
                            var valid_error = validator.isObjectId(query[field]).hasErrors();
                            if (valid_error === null) {
                                conditions[field] = query[field];
                            } else {
                                conditions[field] = null;
                            }
                            break;
                        case 'Boolean':
                            //code here
                            var str = query[field].toLowerCase();
                            if (str === 'true' || str == 'on' || str == 'active' || str === '1') {
                                conditions[field] = true;
                            } else if (str === 'false' || str == 'off' || str == 'inactive' || str === '0') {
                                conditions[field] = false;
                            } else {
                                conditions[field] = null;
                            }
                            break;
                        case 'Array':
                            //code here
                            conditions[field] = { $all: query[field] };
                            break;
                        case 'Buffer':
                            //code here
                            break;
                        case 'Mixed':
                            //code here
                            break;
                    }
                }
            });
        }

        return conditions;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

helper.buildQuery = function (data, fields) {
    try {
        var keys = Object.keys(data);
        var conditions = {};
        keys.forEach(function (field) {
            var field_type = fields[field];
            switch (field_type) {
                case 'ObjectID':
                    //validate ObjectID
                    var validator = new helpers.validate();
                    var valid_error = validator.isObjectId(data[field]).hasErrors();
                    if (valid_error === null) {
                        conditions[field] = data[field].value;
                    }
                    break;
                case 'String':
                    if (data[field].search == 'like') {
                        var escape_advanced_search = helpers.base.escapeFunc(data[field].value);
                        var regex_advanced_search = new RegExp(escape_advanced_search, 'i');
                        conditions[field] = { $regex: regex_advanced_search, $options: 'i' };
                    } else if (data[field].search == 'equal') {
                        conditions[field] = { $eq: data[field].value };
                    }
                    break;
                case 'Boolean':
                    var str = data[field].value.toLowerCase();
                    if (str === 'true' || str == 'on' || str == 'active' || str === '1') {
                        conditions[field] = true;
                    } else if (str === 'false' || str == 'off' || str == 'inactive' || str === '0') {
                        conditions[field] = false;
                    }
                    break;
                case 'Number':
                    if (!isNaN(data[field].value) && data[field].value) {
                        conditions[field] = data[field].value;
                    }
                    break;
                case 'Date':
                    var parseDateForm = Date.parse(data[field].from);
                    var parseDateTo = Date.parse(data[field].to);
                    if (!isNaN(parseDateForm) && !isNaN(parseDateTo)) {
                        var to_date = new Date(data[field].to);
                        to_date.setDate(to_date.getDate() + 1);
                        conditions[field] = { $gte: new Date(data[field].from), $lt: to_date };
                    } else if (!isNaN(parseDateForm)) {
                        conditions[field] = { $gte: new Date(data[field].from) };
                    } else if (!isNaN(parseDateTo)) {
                        conditions[field] = { $lt: new Date(data[field].to) };
                    }
                    break;
                case 'Mixed':
                    break;
                default:
                    conditions[field] = data[field].value;
            }
        });
        return conditions;
    } catch (e) {
        return {};
    }
};

helper.pagination = function (link, p_current, totals, limit) {
    return new pagination.TemplatePaginator({
        prelink: link,
        current: p_current,
        rowsPerPage: limit,
        totalResult: totals,
        template: function (result) {
            var i, len, prelink;
            var html = '<div><ul class="pagination">';
            if (result.pageCount < 2) {
                html += '</ul></div>';
                return html;
            }
            prelink = this.preparePreLink(result.prelink);
            if (result.previous) {
                html += '<li><a href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
            }
            if (result.range.length) {
                for (i = 0, len = result.range.length; i < len; i++) {
                    if (result.range[i] === result.current) {
                        html += '<li class="active"><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    } else {
                        html += '<li><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                    }
                }
            }
            if (result.next) {
                html += '<li><a href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
            }
            html += '</ul></div>';
            return html;
        },
    });
};

helper.get_update_by = function (req) {
    return req.session.hasOwnProperty('admin_userdata') ? req.session.admin_userdata.username : '';
};

helper.check_recaptcha = function (g_response) {
    return new Promise(function (resolve, reject) {
        let url = 'https://www.google.com/recaptcha/api/siteverify?secret=' + appConfig.recaptcha.secret_key + '&response=' + g_response;
        let options = {
            url: url,
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-type': 'application/json; charset=utf-8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; pl; rv:1.9.2.13) Gecko/20101203 Firefox/3.5.13',
                Cookie: 'sagree=true; JSESSIONID=9EC7D24A64808F532B1287FFDDCDEC44',
                'X-Requested-With': 'XMLHttpRequest',
            },
        };

        if (appConfig.http_proxy != '') {
            options.proxy = appConfig.http_proxy;
        }

        request(options, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                resolve({ success: false });
            }
        });
    });
};

/** Scan folder module
 *
 */
helper.updateModule = function () {
    var path = _basepath + 'app/modules';
    var ignore = ['frontend', 'api'];
    fs.readdirSync(path)
        .filter(function (file) {
            return file.indexOf('.js') !== 0 && file !== 'index.js' && ignore.indexOf(file) === -1;
        })
        .forEach(function (module_name) {
            helpers.admin.updateResource(module_name);
        });
};

/** Update resource to db
 *
 */
helper.updateResource = async function (module_name) {
    try {
        var check_module = await adminModel.count('adminModules', { name: module_name });
        if (check_module == 0) {
            var dataAdd = {
                name: module_name,
                route: '/' + module_name,
                status: 1,
            };
            await adminModel.create('adminModules', dataAdd);
        }

        var pathR = _basepath + 'app/modules' + '/' + module_name + '/routes';
        var dataMenu = [];
        var dataResource = [];
        fs.readdirSync(pathR)
            .filter(function (file) {
                return file !== 'index.js' && file != 'upload';
            })
            .forEach(async function (resource) {
                //create data resources
                resource = resource.substring(0, resource.lastIndexOf('.'));
                var itemResource = {
                    name: resource,
                    module: module_name,
                    collection_name: '',
                    custom_fields: [],
                    permissions: appConfig.perm_default,
                };
                dataResource.push(itemResource);

                //create data menus ignore dashboard
                if (resource != 'dashboard') {
                    var itemMenu = {
                        name: module_name + '_' + resource,
                        link: module_name + '/' + resource,
                        parent_id: '',
                        weight: 1,
                        icon: 'fa-circle-o',
                        status: true,
                        is_dashboard: false,
                    };
                    dataMenu.push(itemMenu);
                }
            });

        dataMenu.forEach(async function (item) {
            //check exists
            let c_item = await adminModel.count('adminMenus', { link: item.link });
            if (c_item == 0) {
                await adminModel.create('adminMenus', item);
            }
        });

        dataResource.forEach(async function (item) {
            //check exists
            let c_item = await adminModel.count('adminResources', { module: item.module, name: item.name });
            if (c_item == 0) {
                await adminModel.create('adminResources', item);
            }
        });
    } catch (e) {
        console.log(e);
        return false;
    }
};

helper.write_base64 = function (base64Data) {
    return new Promise(function (resolve, reject) {
        try {
            if (base64Data.indexOf('data:image') === -1) {
                resolve(false);
            }

            base64Data = base64Data
                .replace(/^data:image\/png;base64,/, '')
                .replace(/^data:image\/jpg;base64,/, '')
                .replace(/^data:image\/jpeg;base64,/, '');
            var ttt = new Date();
            var file_name = 'media/avatar/' + md5(ttt.getTime()) + '.jpg';
            fs.writeFile(_basepath + file_name, base64Data, 'base64', function (err) {
                if (err) {
                    console.log(err);
                    resolve(false);
                } else {
                    resolve(file_name);
                }
            });
        } catch (e) {
            console.log(e);
            resolve(false);
        }
    });
};

helper.sort_field = (field, urlLink = null) => {
    let icon = '';
    let default_sort = 1;

    let linkUrl = urlLink;

    //urlLink = helpers.base.parse_resource(urlLink);
    //let linkUrl = _baseUrl+urlLink.module+'/'+urlLink.resource+'';

    let pre_key = '?';
    if (linkUrl.indexOf(pre_key) != -1) {
        pre_key = '&';
    }

    //search vi tri sort on url
    if (linkUrl.indexOf('s[' + field + ']') != -1) {
        if (linkUrl.indexOf('s[' + field + ']=1') != -1) {
            default_sort = -1;
            icon = '<i class="fa fa-long-arrow-down"></i>';
            // cut url
            linkUrl = linkUrl.replace('s[' + field + ']=1', 's[' + field + ']=' + default_sort);
        } else {
            icon = '<i class="fa fa-long-arrow-up"></i>';
            linkUrl = linkUrl.replace('s[' + field + ']=-1', 's[' + field + ']=' + default_sort);
        }
    } else {
        linkUrl = linkUrl + pre_key + 's[' + field + ']=' + default_sort;
    }

    linkUrl = linkUrl.replace(appConfig.prefix + '/', '');
    return '<a class="sort" href="' + _baseUrl + linkUrl + '">' + icon + field + '</a>';
};

helper.sortQuery = function (query) {
    data_sort = query.s;
    if (data_sort && typeof data_sort == 'object') {
        //var f = true;
        for (const prop in data_sort) {
            if (data_sort[prop] != 1 && data_sort[prop] != -1) {
                //f = false;
                data_sort[prop] = -1;
            }
            //console.log(`data_sort.${prop} = ${data_sort[prop]}`);
        }
        return data_sort;
    } else {
        return { createdAt: -1 };
    }
};

helper.convertDataExport = function (data, type) {
    if (data == undefined) return '';
    switch (type) {
        case 'String':
            break;
        case 'Date':
            data = moment(data).format('YYYY-MM-DD HH:mm:ss');
            break;
        case 'Number':
            break;
        case 'ObjectID':
            data = String(data);
            break;
        case 'Boolean':
            break;
        case 'Array':
            data = data.join(',');
            break;
    }

    return data;
};

function convertDataImport(data, type) {
    switch (type) {
        case 'String':
            if (data == undefined) {
                data = '';
            }
            break;
        case 'Date':
            break;
        case 'Number':
            data = parseInt(data);
            if (isNaN(data)) {
                data = 0;
            }
            break;
        case 'ObjectID':
            break;
        case 'Boolean':
            data = String(data);
            var str = data.toLowerCase();
            if (str === 'true' || str == 'on' || str == 'active' || str === '1') {
                data = true;
            } else if (str === 'false' || str == 'off' || str == 'inactive' || str === '0') {
                data = false;
            } else {
                data = null;
            }
            break;
        case 'Array':
            if (data == undefined || data == '') {
                data = [];
            } else {
                data = data.split(',');
            }
            break;
        case 'Mixed':
            if (data == undefined || data == '') {
                data = {};
            } else {
                data = JSON.parse(data);
                // console.log(data);
            }
            break;
    }

    return data ? data : null;
}

helper.import_data = function (file_path, mod_config, clusterImport = 500) {
    return new Promise(async function (resolve, reject) {
        const XlsxStreamReader = require('xlsx-stream-reader');
        var result = { error: '' };
        try {
            var model = require('../modules/' + mod_config.module + '/models');
            var fields = await model.get_fields(mod_config, '__v', false);
            var datas = [];
            var header = [];
            var invalidFields = [];
            var data_result = [];
            var workBookReader = new XlsxStreamReader({ formatting: false });
            workBookReader.on('error', function (error) {
                console.log('error', error);
                result.error = 'Error WorkBook';
                return resolve(result);
            });
            var totalRow = 0;
            workBookReader.on('worksheet', function (workSheetReader) {
                // if we do not listen for rows we will only get end event
                // and have infor about the sheet like row count
                workSheetReader.on('row', function (row) {
                    try {
                        totalRow++;
                        if (invalidFields.length > 0) {
                            result.error = 'Invalid fields ' + invalidFields;
                            workSheetReader.abort();
                            workSheetReader.skip();
                            return resolve(result);
                        }

                        var rowNumber = row.attributes.r;
                        if (rowNumber == 1) {
                            // do something with first row, find schema name
                            header = row.values;
                            header.forEach(function (val) {
                                if (Object.keys(fields).indexOf(val) == -1) {
                                    invalidFields.push(val);
                                }
                            });
                        } else {
                            var tmp = {};
                            header.forEach(function (val, i) {
                                var value = convertDataImport(row.values[i], fields[val]);
                                if (value) {
                                    tmp[val] = value;
                                }
                            });

                            datas.push(tmp);
                            if (datas.length == clusterImport) {
                                let dataTmp = datas;
                                datas = [];
                                model.insertMany(mod_config.collection, dataTmp, function (inst) {
                                    let from = rowNumber - clusterImport + 1;
                                    let str = 'Row ' + from + '-' + rowNumber + ' : ' + (inst.status ? 'success' : inst.msg);
                                    data_result.push(str);
                                });
                            }
                        }
                    } catch (e) {
                        result.error = e.message;
                        return resolve(result);
                    }
                });

                workSheetReader.on('end', function () {
                    console.log('workSheetReaderEND');
                });

                workSheetReader.process();
            });

            workBookReader.on('end', function () {
                // end of workbook reached
                if (datas.length > 0) {
                    model.insertMany(mod_config.collection, datas, function (inst) {
                        let from = 2;
                        if (totalRow > clusterImport) {
                            from = totalRow - clusterImport + 1;
                        }
                        let str = 'Row ' + from + '-' + totalRow + ' : ' + (inst.status ? 'success' : inst.msg);
                        data_result.push(str);
                        result.result = data_result;
                        return resolve(result);
                    });
                } else {
                    result.result = data_result;
                    return resolve(result);
                }
            });

            fs.createReadStream(file_path).pipe(workBookReader);
        } catch (e) {
            result.error = e.message;
            return resolve(result);
        }
    });
};

helper.import_csv_data = function (file_path, mod_config, clusterImport = 500, fields_import) {
    return new Promise(async function (resolve, reject) {
        const csv = require('fast-csv');
     
        var result = { error: '' };
        try {
            var model = require('../modules/' + mod_config.module + '/models');

            var datas = [];

            var data_result = [];
            var totalRow = 0;
            var data_field = fields_import;
            // console.log(file_path);
            fs.createReadStream(file_path)
                .pipe(csv.parse({ headers: true }))
                .on('error', (error) => {
                    console.error('error', error);
                    result.error = 'Error CSV';
                    return resolve(result);
                })
                .on('data', (row) => {
                    totalRow++;
                    // console.log('row', row);
                    var tmp = {};
                    Object.keys(data_field).forEach(function (val, i) {
                        tmp[val] = row[data_field[val]];
                    });
                    // console.log(tmp);
                    datas.push(tmp);
                    if (datas.length == clusterImport) {
                        let dataTmp = datas;
                        datas = [];
                        model.insertMany(mod_config.collection, dataTmp, function (inst) {
                            let from = totalRow - clusterImport;
                            let str = 'Row ' + from + '-' + totalRow + ' : ' + (inst.status ? 'success' : inst.msg);
                            data_result.push(str);
                        });
                    }
                })
                .on('end', (rowCount) => {
                    console.log(`Parsed ${rowCount} rows`);
                    if (datas.length > 0) {
                        model.insertMany(mod_config.collection, datas, function (inst) {
                            let from = 2;
                            if (totalRow > clusterImport) {
                                from = totalRow - clusterImport + 1;
                            }
                            let str = 'Row ' + from + '-' + totalRow + ' : ' + (inst.status ? 'success' : inst.msg);
                            data_result.push(str);
                            result.result = data_result;
                            return resolve(result);
                        });
                    } else {
                        result.result = data_result;
                        return resolve(result);
                    }
                });
            return resolve(result);
        } catch (e) {
            result.error = e.message;
            return resolve(result);
        }
    });
};

helper.getStatus = function (status){
    var status_obj = {0: "Pending", 1: "Active", 2: "Disable", 3: "Block"}
    return status_obj[status];
};

module.exports = helper;
