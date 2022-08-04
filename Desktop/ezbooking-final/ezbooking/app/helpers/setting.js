var express = require('express');
const appConfig = require('../configs/config_dev');
var AdminModel = require('../modules/admin/models');

var setting = {};

var prefix_setting = appConfig.redis.prefix + 'setting_';

setting.set_value_setting = async (key, value) => {
    let key_setting = prefix_setting + key;
    libs.redis.set(key_setting, value, 8400);
    return true;
};

setting.get_value_setting = async key => {
    let key_setting = prefix_setting + key;
    let value = await libs.redis.get(key_setting);
    if (value) {
        return value;
    } else {
        let valueSetting = await AdminModel.findOne('adminSettings', {
            status: true,
            key: key
        });
        if (valueSetting) {
            libs.redis.set(key_setting, valueSetting.value, 8400);
            return valueSetting.value;
        }
        return null;
    }
};

module.exports = setting;
