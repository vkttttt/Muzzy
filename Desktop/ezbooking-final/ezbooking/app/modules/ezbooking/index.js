var express = require("express");

var adminModel = require('../admin/models');

var ezbooking = express();

ezbooking.set('views',_basepath+'app/views');

//============================= LOAD RESOURCES ================================//
adminModel.findAll('adminResources',{module:'ezbooking'}, 'name', {},function(result){
    result.forEach(function(resource){
        ezbooking.use('/'+resource.name,helpers.admin.authAdmin, require('./routes/'+resource.name));
    });
});
//============================= END RESOURCES =================================//

ezbooking.get('/',function (req, res) {
    res.send('ezbooking INDEX');
});

module.exports = ezbooking;
