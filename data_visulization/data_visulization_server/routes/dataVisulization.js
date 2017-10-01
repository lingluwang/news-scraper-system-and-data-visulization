var express = require('express');
var router = express.Router();

//*****node js */

/*GET User Total Num, New User, Active User and Average Reading Info */
router.get('/statistic', function(req,res,next){
    console.log("Send user_data from data visulization server");

    const headers = new Headers({'content-type': 'application/json'})
    


    // const user_data = [
    //     {
    //         'title': 'Total Users',
    //         'num':1300
    //     },
    //     {
    //         'title': 'New Users (Today)',
    //         'num':23
    //     },
    //     {
    //         'title': 'Active Users (Today)',
    //         'num':67
    //     },
    //     {
    //         'title': 'Average Usage Time',
    //         'num':12
    //     }
    // ];
    
    res.json(user_data);  
});

/*GET User Trend Data */
router.get('/usertrend', function(req,res,next){
    const userTrend = [
        {
            name: 'New User',
            data: [20, 50, 34, 20, 90,74, 110]
        },
        {
            name: 'Active User',
            data: [74, 110,50, 34, 20, 90,74]
        }
    ];
    
    res.json(userTrend);  
});

/*GET User Device Data */
router.get('/userdevice', function(req,res,next){
    console.log("Send user_trend_data from data visulization server");
    const deviceData = [
        {
            name: 'IOS',
            y: 56.33,
        }, {
            name: 'Android',
            y: 24.03,
        }, {
            name: 'MAC',
            y: 10.38,
        }, {
            name: 'Windows',
            y: 4.77,
        }, {
            name: 'Pad',
            y: 0.91,
        }, {
            name: 'other',
            y: 2
        }
    ];
    
    res.json(deviceData);  
});

/*GET User news category Data */
router.get('/newscategory', function(req,res,next){
    const newCategory = [
        {
            name: 'technology',
            y: 50
        },
        {
            name: 'music',
            y: 150
        },
        {
            name: 'education',
            y: 30
        },
        {
            name: 'sports',
            y: 50
        },
        {
            name: 'weather',
            y: 50
        },
    ];
    
    res.json(newCategory);  
});

/*GET User active time Data */
router.get('/activetime', function(req,res,next){
    const activeTime = [
            {
                name: 'Operation Number',
                data: [20, 50, 34, 20, 90,74, 110,20, 50, 34, 20, 90,74, 110,20, 50, 34, 20, 90,74, 110,67,79,46]
            }
        ];
    
    res.json(activeTime);  
});

module.exports = router;