import ProductInterface = require('../model/ProductInterface');
declare class ProductManager {
    static create(product: ProductInterface, callback: (err, product: ProductInterface) => void): void;
    static findById(product_id: string, options: {
        include_inactive?: boolean;
    }, callback: (err, product: ProductInterface) => void): void;
    static removeById(product_id: string, callback: any): void;
    static update(product: ProductInterface, edits: {}, callback: (err, product: ProductInterface) => void): void;
    private static sanitize(product);
}
export = ProductManager;
