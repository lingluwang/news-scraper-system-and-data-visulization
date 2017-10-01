var express = require('express');
var router = express.Router();
var path = require('path');
var rpc_client = require('../rpc_client/rpc_client');

//GET news summary list
router.get('/userId/:userId/pageNum/:pageNum', function(req, res, next) {
    console.log('Fetching news...');
    user_id = req.params['userId'];
    page_num = req.params['pageNum'];

    rpc_client.getNewsSummariesForUser(user_id, page_num, function(response) {
        console.log("get news summary");
        console.log(response);
        res.json(response);
      });

    /*
    news = [
        {
            'url': 'http://www.bbc.com/news/world-us-canada-40901746',
            'title': 'Trump warns N Korea that US military is \'locked and loaded\'',
            'description': 'President Donald Trump says the US military is "locked and loaded" to deal with North Korea, ramping up the rhetorical brinkmanship',
            'source': 'BBC',
            'urlToImage': 'https://ichef.bbci.co.uk/news/1536/cpsprodpb/A5EF/production/_97297424_hi041031199.jpg',
            'reason': 'recommend',
            'digest': '123456789',
            'time': '2017.5.18'
        },
        {
            'url': 'http://www.bbc.com/sport/football/40881489',
            'title': 'Premier League season starts: New signings, new kits, new rules',
            'description': 'The wait for the 2017-18 Premier League season is almost over as Arsenal prepare to host Leicester City at Emirates Stadium at 19:45 BST - the first time the campaign has started on a Friday',
            'source': 'BBC Sport',
            'urlToImage': 'http://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/8A81/production/_97275453_pl-signings-prices2-1.jpg',
            'reason': 'hot',
            'digest': '987654321',
            'time': '2017.5.18'
        },
        {
            'url': 'http://www.bbc.com/sport/football/40881489',
            'title': '1Premier League season starts: New signings, new kits, new rules',
            'description': 'The wait for the 2017-18 Premier League season is almost over as Arsenal prepare to host Leicester City at Emirates Stadium at 19:45 BST - the first time the campaign has started on a Friday',
            'source': 'BBC Sport',
            'urlToImage': 'http://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/8A81/production/_97275453_pl-signings-prices2-1.jpg',
            'reason': 'hot',
            'digest': '9876543211',
            'time': '2017.5.18'
        },
        {
            'url': 'http://www.bbc.com/sport/football/40881489',
            'title': '2Premier League season starts: New signings, new kits, new rules',
            'description': 'The wait for the 2017-18 Premier League season is almost over as Arsenal prepare to host Leicester City at Emirates Stadium at 19:45 BST - the first time the campaign has started on a Friday',
            'source': 'BBC Sport',
            'urlToImage': 'http://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/8A81/production/_97275453_pl-signings-prices2-1.jpg',
            'reason': 'hot',
            'digest': '9876543212',
            'time': '2017.8.10'
        }
        
    ];
    */
    //res.json(news);
})

/* Log news click. */
router.post('/userId/:userId/newsId/:newsId', function(req,res, next) {
    console.log('Logging news click...');
    user_id = req.params['userId'];
    news_id = req.params['newsId']; //newsId is news digest
  
    rpc_client.logNewsClickForUser(user_id, news_id);
    res.status(200);
  });

module.exports = router;