import mongoose = require('mongoose');

import UserDocument = require('./UserDocument');
import UserSchema = require('./UserSchema');

var UserDocumentManager = mongoose.model<UserDocument>("UserModel", UserSchema);

export = UserDocumentManager;
