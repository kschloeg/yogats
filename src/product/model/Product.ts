import ProductStatus = require('./ProductStatus');
import ProductInterface = require('./ProductInterface');

class Product implements ProductInterface {
    public id: string;
    public gid: number;
    public name: string;
    public current_price: {
        value: number,
        currency_code: string
    };
    public create_date: Date;
    public status: ProductStatus;

    constructor(product?: any) {
        if (product) {
            this.id = product.id;
            this.gid = product.gid;
            this.name = product.name;
            this.current_price = product.current_price;
            this.create_date = product.create_date;
            this.status = product.status;
        }
    }

    public toDocument() {
        return {
            id: this.id,
            gid: this.gid,
            name: this.name,
            current_price: this.current_price,
            create_date: this.create_date,
            status: this.status
        };
    }
}

export = Product;
