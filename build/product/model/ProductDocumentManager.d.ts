import mongoose = require('mongoose');
import ProductDocument = require('./ProductDocument');
declare var ProductDocumentManager: mongoose.Model<ProductDocument>;
export = ProductDocumentManager;
