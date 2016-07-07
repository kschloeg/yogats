import mongoose = require('mongoose');
import UserInterface = require('./UserInterface');
interface UserDocument extends mongoose.Document, UserInterface {
}
export = UserDocument;
