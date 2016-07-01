import async = require('async');
import mongoose = require('mongoose');
import should = require('should');
import sinon = require('sinon');

import Product = require('../model/Product');
import ProductInterface = require('../model/ProductInterface');
import ProductDocumentManager = require('../model/ProductDocumentManager');
import ProductStatus = require('../model/ProductStatus');
import ProductManager = require('../lib/ProductManager');

describe('ProductManager', () => {
    var sandbox;
    var sampleProduct: ProductInterface;

    before(() => { });

    after(() => { });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sampleProduct = new Product();
        sampleProduct.name = "XYZ";
        sampleProduct.create_date = new Date();
        sampleProduct.gid = 123456;
        sampleProduct.status = ProductStatus.ACTIVE;
        sampleProduct.current_price = {
            value: 5,
            currency_code: "USD"
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('create', () => {
        it('cascades result', done => {
            var repoSpy = sandbox.stub(ProductDocumentManager, "create").callsArgWithAsync(1, null, new Product({ name: "ABC" }));

            ProductManager.create(sampleProduct, (err, product) => {
                should.not.exist(err);
                should.exist(product);
                product.name.should.equal("ABC");

                repoSpy.callCount.should.eql(1);
                repoSpy.args[0][0].should.eql(sampleProduct);

                done();
            });
        });

        it('cascades error', done => {
            var repoSpy = sandbox.stub(ProductDocumentManager, "create").callsArgWithAsync(1, "error", null);

            ProductManager.create(sampleProduct, (err, product) => {
                should.exist(err);
                should.not.exist(product);
                err.should.equal("error");

                repoSpy.callCount.should.eql(1);
                done();
            });
        });

        it('survives null product', done => {
            var repoSpy = sandbox.stub(ProductDocumentManager, "create").callsArgWithAsync(1, null, "repo result");
            ProductManager.create(null, (err, product) => {
                should.exist(err);
                should.not.exist(product);

                repoSpy.callCount.should.eql(0);
                done();
            });
        });
    });

    describe('findById', () => {
        it('Tests not yet implemented', done => {
            done();
        });
    });

    describe('removeById', () => {
        it('Tests not yet implemented', done => {
            done();
        });
    });

    describe('update', () => {
        it('Tests not yet implemented', done => {
            done();
        });
    });
});
