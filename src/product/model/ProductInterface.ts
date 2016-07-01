import ProductStatus = require('./ProductStatus');

interface ProductInterface {
    id?: string;
    gid: number;
    name: string;
    current_price: {
        value: number,
        currency_code: string
    };
    create_date: Date;
    status: ProductStatus;

    toDocument(): Object;
}

export = ProductInterface;
