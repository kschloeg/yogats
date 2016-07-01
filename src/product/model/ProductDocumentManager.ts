import mongoose = require('mongoose');

import ProductDocument = require('./ProductDocument');
import ProductSchema = require('./ProductSchema');

var ProductDocumentManager = mongoose.model<ProductDocument>("ProductModel", ProductSchema);

export = ProductDocumentManager;
