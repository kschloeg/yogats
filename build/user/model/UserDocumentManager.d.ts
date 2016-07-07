import mongoose = require('mongoose');
import UserDocument = require('./UserDocument');
declare var UserDocumentManager: mongoose.Model<UserDocument>;
export = UserDocumentManager;
