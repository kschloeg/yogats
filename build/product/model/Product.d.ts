import ProductStatus = require('./ProductStatus');
import ProductInterface = require('./ProductInterface');
declare class Product implements ProductInterface {
    id: string;
    gid: number;
    name: string;
    current_price: {
        value: number;
        currency_code: string;
    };
    create_date: Date;
    status: ProductStatus;
    constructor(product?: any);
    toDocument(): {
        id: string;
        gid: number;
        name: string;
        current_price: {
            value: number;
            currency_code: string;
        };
        create_date: Date;
        status: ProductStatus;
    };
}
export = Product;
