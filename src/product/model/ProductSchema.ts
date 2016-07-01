import mongoose = require('mongoose');

var PriceSchema = new mongoose.Schema({
    value: Number,
    currency_code: String
}, {_id: false, strict: true});

var ProductSchema = new mongoose.Schema({
    name: String,
    gid: Number,
    current_price: PriceSchema,
    status: String,
    create_date: String
}, {collection: 'products', strict: "true"});

export = ProductSchema;
