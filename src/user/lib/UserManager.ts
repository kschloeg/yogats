import _ = require('lodash');
import async = require('async');

import UserStatus = require('../model/UserStatus');
import User = require('../model/User');
import UserInterface = require('../model/UserInterface');
import UserDocumentManager = require('../model/UserDocumentManager');
import UserDocument = require('../model/UserDocument');

class UserManager {
    public static create(user: UserInterface, callback: (err, user: UserInterface) => void): void {
        if (!user) return callback(new Error("Cannot create null or undefined Object"), null);

        user.create_date = user.create_date || new Date();
        user.status_change_date = user.status_change_date || new Date();
        user.status = user.status || UserStatus.ACTIVE;

        UserDocumentManager.create(user, (createErr, document: UserDocument) => {
            if (createErr) return callback(createErr, null);
            if (!document) return callback(new Error("Create Error"), null);
            callback(null, new User(document));
        });
    };

    public static findById(user_id: string, options: { include_inactive?: boolean }, callback: (err, user: UserInterface) => void): void {
        if (!user_id) return callback(new Error("Missing ID"), null);

        var criteria = { _id: user_id };
        if (!options || !options.include_inactive) {
            criteria['status'] = UserStatus.ACTIVE;
        }

        UserDocumentManager.findOne(criteria, (findErr, document: UserDocument) => {
            if (findErr) return callback(findErr, null);
            if (!document) return callback(null, null);
            callback(null, new User(document));
        });
    }

    public static removeById(user_id: string, callback): void {
        if (!user_id) return callback(new Error("Missing ID"), null);

        var criteria = { _id: user_id };
        UserDocumentManager.remove(criteria, callback);
    }

    public static update(user: UserInterface, edits: any, callback: (err, user: UserInterface) => void): void {
        if (!user || !edits) return callback(null, null);

        if (edits.status && edits.status !== user.status) {
          edits.status_change_date = new Date();
        }

        var userJson = user.toDocument();
        _.assign(userJson, UserManager.sanitize(edits));

        UserDocumentManager.findByIdAndUpdate(user.id, userJson, (updateErr, document: UserDocument) => {
            if (updateErr) return callback(updateErr, null);
            if (!document) return callback(null, null);
            callback(null, new User(document));
        });
    }

    private static sanitize(user: {}): {} {
        return _.pick(user,
            'last_name',
            'first_name',
            'status_change_date',
            'create_date',
            'status');
    }
}

export = UserManager;
