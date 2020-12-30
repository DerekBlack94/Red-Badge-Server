const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const Roles = (() => {
    ac.grant('user')
        .createOwn('userbike')
        .readOwn('userbike')
        .updateOwn('userbike')
        .deleteOwn('userbike')
        .createOwn('appointments')
        .readOwn('appointments')
        .updateOwn('appointments')
        .deleteOwn('appointments')

    ac.grant('admin')
        .extend('basic')
        .deleteAny('userbike')
        .updateAny('userbike')
        .deleteAny('appointments')
        .updateAny('appointments')

});

module.exports = Roles;