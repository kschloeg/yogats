import _ = require('lodash');
import async = require('async');

import ProductStatus = require('../model/ProductStatus');
import Product = require('../model/Product');
import ProductInterface = require('../model/ProductInterface');
import ProductDocumentManager = require('../model/ProductDocumentManager');
import ProductDocument = require('../model/ProductDocument');

class ProductManager {
    public static create(product: ProductInterface, callback: (err, product: ProductInterface) => void): void {
        if (!product) return callback(new Error("Cannot create null or undefined Object"), null);

        product.create_date = product.create_date || new Date();
        product.status = product.status || ProductStatus.ACTIVE;

        ProductDocumentManager.create(product, (createErr, document: ProductDocument) => {
            if (createErr) return callback(createErr, null);
            if (!document) return callback(new Error("Create Error"), null);
            callback(null, new Product(document));
        });
    };

    public static findById(product_id: string, options: { include_inactive?: boolean }, callback: (err, product: ProductInterface) => void): void {
        if (!product_id) return callback(new Error("Missing ID"), null);

        var criteria = { gid: product_id };
        if (!options || !options.include_inactive) {
            criteria['status'] = ProductStatus.ACTIVE;
        }

        ProductDocumentManager.findOne(criteria, (findErr, document: ProductDocument) => {
            if (findErr) return callback(findErr, null);
            if (!document) return callback(null, null);
            callback(null, new Product(document));
        });
    }

    public static removeById(product_id: string, callback): void {
        if (!product_id) return callback(new Error("Missing ID"), null);

        var criteria = { gid: product_id };
        ProductDocumentManager.remove(criteria, callback);
    }

    public static update(product: ProductInterface, edits: {}, callback: (err, product: ProductInterface) => void): void {
        if (!product || !edits) return callback(null, null);

        var mongo_id = product.id;
        var productJson = product.toDocument();
        _.assign(productJson, ProductManager.sanitize(edits));

        ProductDocumentManager.findByIdAndUpdate(mongo_id, productJson, (updateErr, document: ProductDocument) => {
            if (updateErr) return callback(updateErr, null);
            if (!document) return callback(null, null);
            callback(null, new Product(document));
        });
    }

    private static sanitize(product: {}): {} {
        return _.pick(product,
            'name',
            'gid',
            'current_price',
            'create_date',
            'status');
    }
}

export = ProductManager;
