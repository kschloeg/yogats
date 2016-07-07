import async = require('async');
import mongoose = require('mongoose');
import should = require('should');
import sinon = require('sinon');

import User = require('../model/User');
import UserInterface = require('../model/UserInterface');
import UserDocumentManager = require('../model/UserDocumentManager');
import UserStatus = require('../model/UserStatus');
import UserManager = require('../lib/UserManager');

describe('UserManager', () => {
    var sandbox;
    var sampleUser: UserInterface;

    before(() => { });

    after(() => { });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sampleUser = new User();
        sampleUser.first_name = "XYZ";
        sampleUser.create_date = new Date();
        sampleUser.status = UserStatus.ACTIVE;
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('create', () => {
        it('cascades result', done => {
            var repoSpy = sandbox.stub(UserDocumentManager, "create").callsArgWithAsync(1, null, new User({ first_name: "ABC" }));

            UserManager.create(sampleUser, (err, user) => {
                should.not.exist(err);
                should.exist(user);
                user.first_name.should.equal("ABC");

                repoSpy.callCount.should.eql(1);
                repoSpy.args[0][0].should.eql(sampleUser);

                done();
            });
        });

        it('cascades error', done => {
            var repoSpy = sandbox.stub(UserDocumentManager, "create").callsArgWithAsync(1, "error", null);

            UserManager.create(sampleUser, (err, user) => {
                should.exist(err);
                should.not.exist(user);
                err.should.equal("error");

                repoSpy.callCount.should.eql(1);
                done();
            });
        });

        it('survives null user', done => {
            var repoSpy = sandbox.stub(UserDocumentManager, "create").callsArgWithAsync(1, null, "repo result");
            UserManager.create(null, (err, user) => {
                should.exist(err);
                should.not.exist(user);

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
