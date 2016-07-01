"use strict";
var should = require('should');
var sinon = require('sinon');
var Product = require('../model/Product');
var ProductDocumentManager = require('../model/ProductDocumentManager');
var ProductStatus = require('../model/ProductStatus');
var ProductManager = require('../lib/ProductManager');
describe('ProductManager', function () {
    var sandbox;
    var sampleProduct;
    before(function () { });
    after(function () { });
    beforeEach(function () {
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
    afterEach(function () {
        sandbox.restore();
    });
    describe('create', function () {
        it('cascades result', function (done) {
            var repoSpy = sandbox.stub(ProductDocumentManager, "create").callsArgWithAsync(1, null, new Product({ name: "ABC" }));
            ProductManager.create(sampleProduct, function (err, product) {
                should.not.exist(err);
                should.exist(product);
                product.name.should.equal("ABC");
                repoSpy.callCount.should.eql(1);
                repoSpy.args[0][0].should.eql(sampleProduct);
                done();
            });
        });
        it('cascades error', function (done) {
            var repoSpy = sandbox.stub(ProductDocumentManager, "create").callsArgWithAsync(1, "error", null);
            ProductManager.create(sampleProduct, function (err, product) {
                should.exist(err);
                should.not.exist(product);
                err.should.equal("error");
                repoSpy.callCount.should.eql(1);
                done();
            });
        });
        it('survives null product', function (done) {
            var repoSpy = sandbox.stub(ProductDocumentManager, "create").callsArgWithAsync(1, null, "repo result");
            ProductManager.create(null, function (err, product) {
                should.exist(err);
                should.not.exist(product);
                repoSpy.callCount.should.eql(0);
                done();
            });
        });
    });
    describe('findById', function () {
        it('Tests not yet implemented', function (done) {
            done();
        });
    });
    describe('removeById', function () {
        it('Tests not yet implemented', function (done) {
            done();
        });
    });
    describe('update', function () {
        it('Tests not yet implemented', function (done) {
            done();
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2R1Y3QvbGliL1Byb2R1Y3RNYW5hZ2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLElBQU8sTUFBTSxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLElBQU8sS0FBSyxXQUFXLE9BQU8sQ0FBQyxDQUFDO0FBRWhDLElBQU8sT0FBTyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFN0MsSUFBTyxzQkFBc0IsV0FBVyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQzNFLElBQU8sYUFBYSxXQUFXLHdCQUF3QixDQUFDLENBQUM7QUFDekQsSUFBTyxjQUFjLFdBQVcsdUJBQXVCLENBQUMsQ0FBQztBQUV6RCxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDdkIsSUFBSSxPQUFPLENBQUM7SUFDWixJQUFJLGFBQStCLENBQUM7SUFFcEMsTUFBTSxDQUFDLGNBQVEsQ0FBQyxDQUFDLENBQUM7SUFFbEIsS0FBSyxDQUFDLGNBQVEsQ0FBQyxDQUFDLENBQUM7SUFFakIsVUFBVSxDQUFDO1FBQ1AsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFakMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDM0IsYUFBYSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQzNCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxhQUFhLENBQUMsYUFBYSxHQUFHO1lBQzFCLEtBQUssRUFBRSxDQUFDO1lBQ1IsYUFBYSxFQUFFLEtBQUs7U0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDO1FBQ04sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFB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SUFFSCxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2YsRUFBRSxDQUFDLDJCQUEyQixFQUFFLFVBQUEsSUFBSTtZQUNoQyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwcm9kdWN0L2xpYi9Qcm9kdWN0TWFuYWdlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcbmltcG9ydCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XG5pbXBvcnQgc2hvdWxkID0gcmVxdWlyZSgnc2hvdWxkJyk7XG5pbXBvcnQgc2lub24gPSByZXF1aXJlKCdzaW5vbicpO1xuXG5pbXBvcnQgUHJvZHVjdCA9IHJlcXVpcmUoJy4uL21vZGVsL1Byb2R1Y3QnKTtcbmltcG9ydCBQcm9kdWN0SW50ZXJmYWNlID0gcmVxdWlyZSgnLi4vbW9kZWwvUHJvZHVjdEludGVyZmFjZScpO1xuaW1wb3J0IFByb2R1Y3REb2N1bWVudE1hbmFnZXIgPSByZXF1aXJlKCcuLi9tb2RlbC9Qcm9kdWN0RG9jdW1lbnRNYW5hZ2VyJyk7XG5pbXBvcnQgUHJvZHVjdFN0YXR1cyA9IHJlcXVpcmUoJy4uL21vZGVsL1Byb2R1Y3RTdGF0dXMnKTtcbmltcG9ydCBQcm9kdWN0TWFuYWdlciA9IHJlcXVpcmUoJy4uL2xpYi9Qcm9kdWN0TWFuYWdlcicpO1xuXG5kZXNjcmliZSgnUHJvZHVjdE1hbmFnZXInLCAoKSA9PiB7XG4gICAgdmFyIHNhbmRib3g7XG4gICAgdmFyIHNhbXBsZVByb2R1Y3Q6IFByb2R1Y3RJbnRlcmZhY2U7XG5cbiAgICBiZWZvcmUoKCkgPT4geyB9KTtcblxuICAgIGFmdGVyKCgpID0+IHsgfSk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgc2FuZGJveCA9IHNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG5cbiAgICAgICAgc2FtcGxlUHJvZHVjdCA9IG5ldyBQcm9kdWN0KCk7XG4gICAgICAgIHNhbXBsZVByb2R1Y3QubmFtZSA9IFwiWFlaXCI7XG4gICAgICAgIHNhbXBsZVByb2R1Y3QuY3JlYXRlX2RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBzYW1wbGVQcm9kdWN0LmdpZCA9IDEyMzQ1NjtcbiAgICAgICAgc2FtcGxlUHJvZHVjdC5zdGF0dXMgPSBQcm9kdWN0U3RhdHVzLkFDVElWRTtcbiAgICAgICAgc2FtcGxlUHJvZHVjdC5jdXJyZW50X3ByaWNlID0ge1xuICAgICAgICAgICAgdmFsdWU6IDUsXG4gICAgICAgICAgICBjdXJyZW5jeV9jb2RlOiBcIlVTRFwiXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjcmVhdGUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdjYXNjYWRlcyByZXN1bHQnLCBkb25lID0+IHtcbiAgICAgICAgICAgIHZhciByZXBvU3B5ID0gc2FuZGJveC5zdHViKFByb2R1Y3REb2N1bWVudE1hbmFnZXIsIFwiY3JlYXRlXCIpLmNhbGxzQXJnV2l0aEFzeW5jKDEsIG51bGwsIG5ldyBQcm9kdWN0KHsgbmFtZTogXCJBQkNcIiB9KSk7XG5cbiAgICAgICAgICAgIFByb2R1Y3RNYW5hZ2VyLmNyZWF0ZShzYW1wbGVQcm9kdWN0LCAoZXJyLCBwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc2hvdWxkLm5vdC5leGlzdChlcnIpO1xuICAgICAgICAgICAgICAgIHNob3VsZC5leGlzdChwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICBwcm9kdWN0Lm5hbWUuc2hvdWxkLmVxdWFsKFwiQUJDXCIpO1xuXG4gICAgICAgICAgICAgICAgcmVwb1NweS5jYWxsQ291bnQuc2hvdWxkLmVxbCgxKTtcbiAgICAgICAgICAgICAgICByZXBvU3B5LmFyZ3NbMF1bMF0uc2hvdWxkLmVxbChzYW1wbGVQcm9kdWN0KTtcblxuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FzY2FkZXMgZXJyb3InLCBkb25lID0+IHtcbiAgICAgICAgICAgIHZhciByZXBvU3B5ID0gc2FuZGJveC5zdHViKFByb2R1Y3REb2N1bWVudE1hbmFnZXIsIFwiY3JlYXRlXCIpLmNhbGxzQXJnV2l0aEFzeW5jKDEsIFwiZXJyb3JcIiwgbnVsbCk7XG5cbiAgICAgICAgICAgIFByb2R1Y3RNYW5hZ2VyLmNyZWF0ZShzYW1wbGVQcm9kdWN0LCAoZXJyLCBwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc2hvdWxkLmV4aXN0KGVycik7XG4gICAgICAgICAgICAgICAgc2hvdWxkLm5vdC5leGlzdChwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICBlcnIuc2hvdWxkLmVxdWFsKFwiZXJyb3JcIik7XG5cbiAgICAgICAgICAgICAgICByZXBvU3B5LmNhbGxDb3VudC5zaG91bGQuZXFsKDEpO1xuICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc3Vydml2ZXMgbnVsbCBwcm9kdWN0JywgZG9uZSA9PiB7XG4gICAgICAgICAgICB2YXIgcmVwb1NweSA9IHNhbmRib3guc3R1YihQcm9kdWN0RG9jdW1lbnRNYW5hZ2VyLCBcImNyZWF0ZVwiKS5jYWxsc0FyZ1dpdGhBc3luYygxLCBudWxsLCBcInJlcG8gcmVzdWx0XCIpO1xuICAgICAgICAgICAgUHJvZHVjdE1hbmFnZXIuY3JlYXRlKG51bGwsIChlcnIsIHByb2R1Y3QpID0+IHtcbiAgICAgICAgICAgICAgICBzaG91bGQuZXhpc3QoZXJyKTtcbiAgICAgICAgICAgICAgICBzaG91bGQubm90LmV4aXN0KHByb2R1Y3QpO1xuXG4gICAgICAgICAgICAgICAgcmVwb1NweS5jYWxsQ291bnQuc2hvdWxkLmVxbCgwKTtcbiAgICAgICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZmluZEJ5SWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdUZXN0cyBub3QgeWV0IGltcGxlbWVudGVkJywgZG9uZSA9PiB7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlbW92ZUJ5SWQnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdUZXN0cyBub3QgeWV0IGltcGxlbWVudGVkJywgZG9uZSA9PiB7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3VwZGF0ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Rlc3RzIG5vdCB5ZXQgaW1wbGVtZW50ZWQnLCBkb25lID0+IHtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
