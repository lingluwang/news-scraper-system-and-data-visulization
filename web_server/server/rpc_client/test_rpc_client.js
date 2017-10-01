var testClient = require('./rpc_client');

//invoke add method
testClient.add(3,4, function(response) {
    console.assert(response == 7);
})

testClient.getNewsSummariesForUser('test_user', 1, function(response) {
    console.assert(response != null);
  });

// invoke "logNewsClickForUser"
testClient.logNewsClickForUser('test_user', 'test_news');
