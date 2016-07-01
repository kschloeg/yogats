import mongoose = require('mongoose');
import ProductInterface = require('./ProductInterface');
interface ProductDocument extends mongoose.Document, ProductInterface {
}
export = ProductDocument;
