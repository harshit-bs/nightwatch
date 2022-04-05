const assert = require('assert');
const MockServer  = require('../../../lib/mockserver.js');
const CommandGlobals = require('../../../lib/globals/commands.js');

describe('updateValue', function() {

  before(function(done) {
    CommandGlobals.beforeEach.call(this, done);
  });

  after(function(done) {
    CommandGlobals.afterEach.call(this, done);
  });

  it('client.frame()', function(done) {
    MockServer.addMock({
      url: '/wd/hub/session/1352110219202/element',
      method: 'POST',
      postdata: {
        using: 'css selector',
        value: '*[id="frameid"]'
      },
      response: {
        value: {
          'element-6066-11e4-a52e-4f735466cecf': '5cc459b8-36a8-3042-8b4a-258883ea642b'
        }
      }
    });

    MockServer.addMock({
      url: '/wd/hub/session/1352110219202/element',
      method: 'POST',
      postdata: {
        using: 'css selector',
        value: '*[name="framename"]'
      },
      response: {
        value: {
          'element-6066-11e4-a52e-4f735466cecf': '5cc459b8-36a8-3042-8b4a-258883ea642b'
        }
      }
    });

    MockServer.addMock({
      url: '/wd/hub/session/1352110219202/frame',
      method: 'POST',
      response: {
        value: null,
        status: 0
      }
    });

    MockServer.addMock({
      url: '/wd/hub/session/1352110219202/element',
      method: 'POST',
      postdata: {
        using: 'id',
        value: 'frameElement'
      },
      response: {
        value: {
          'element-6066-11e4-a52e-4f735466cecf': '5cc459b8-36a8-3042-8b4a-258883ea642b'
        }
      }
    });

    const client = this.client;

    client.api.element('id', 'frameid', function callback(res){
      const frameId = res.value

      client.api
        .frame('frameid', function callback(result) {
          assert.strictEqual(result.status, 0);
          assert.strictEqual(result.value, null);
        })
        .frame('framename', function callback(result) {
          assert.strictEqual(result.status, 0);
          assert.strictEqual(result.value, null);
        })
        .frame(undefined, function callback(result) {
          assert.strictEqual(result.status, 0);
          assert.strictEqual(result.value, null);
        })
        .frame(frameId, function callback(result) {
          assert.strictEqual(result.status, 0);
          assert.strictEqual(result.value, null);
        })
        .frame(null, function callback(result) {
          assert.strictEqual(result.status, 0);
          assert.strictEqual(result.value, null);
        })
    })

    this.client.start(done);
  });
});
