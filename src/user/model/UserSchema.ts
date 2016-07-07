import mongoose = require('mongoose');

var PriceSchema = new mongoose.Schema({
    value: Number,
    currency_code: String
}, {_id: false, strict: true});

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    status: String,
    status_change_date: Date,
    create_date: Date
}, {collection: 'users', strict: "true"});

export = UserSchema;
