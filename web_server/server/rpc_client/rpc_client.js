var jayson = require('jayson');

SERVER_HOST = 'localhost';
SERVER_PORT = 4040;

//Client
var client = jayson.client.http({
    port: SERVER_PORT,
    hostname: SERVER_HOST
});

// invoke "add"
var add = function(a, b, callback) {
    client.request('add', [a, b], function(err, error, response) {
        if(err) throw err;
        if(error) throw error;
        console.log(response);
        callback(response);
    });
}


var add = function(a, b, callback) {
    client.request('add', [a, b], function(err, error, response) {
        if(err) throw err;
        if(error) throw error;
        console.log(response);
        callback(response);
    })
}

// Get news summaries for a user
function getNewsSummariesForUser(user_id, page_num, callback) {
    client.request('getNewsSummariesForUser', [user_id, page_num], function(err, error, response) {
      if (err) throw err;
      console.log(response);
      callback(response);
    });
  }

// Log a news click event for a user
function logNewsClickForUser(user_id, news_id) {
    client.request('logNewsClickForUser', [user_id, news_id], function(err, error, response) {
      if (err) throw err;
      console.log(response);
    });
  }

module.exports = {
    add:add,
    getNewsSummariesForUser : getNewsSummariesForUser,
    logNewsClickForUser : logNewsClickForUser
    
}