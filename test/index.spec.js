const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { newDb } = require('pg-mem');

describe('Client::query', function () {

    const logger = sinon.spy();

    const { Client } = proxyquire('../src/index', {
        'pg': newDb().adapters.createPg(),
    })(logger);

    this.afterEach(() => {
        logger.resetHistory();
    });

    it('returns the expected result', async function () {

        const client = new Client();
        const result = await client.query('SELECT NOW()');

        expect(result.rows).to.have.length(1);
        expect(result.rows[0]).to.have.property('now');

    });

    it('calls the callback with the correct params', async function () {

        const client = new Client();
        const params = [1, 1.2345, 'some string'];
        await client.query('SELECT NOW()', params);

        const args = logger.getCall(0).firstArg;
        console.log(args);

        expect(args).to.have.property('text').equal('SELECT NOW()');
        expect(args).to.have.property('params').eql([1, 1.2345, 'some string']);

    });

});

