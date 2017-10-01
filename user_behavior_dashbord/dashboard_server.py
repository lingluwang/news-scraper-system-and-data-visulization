from flask import Flask
import json
app = Flask(__name__)

@app.route('/userStatisticsData')
def user_statistic_data():
    user_data = [
        {   
            'title': 'Total Users',
            'num':1300,
            
        },
        {
            'title': 'New Users (Today)',
            'num':23
        },
        {
            'title': 'Active Users (Today)',
            'num':67
        },
        {
            'title': 'Average Usage Time',
            'num':12
        }
    ]

    response = app.response_class (
        response = json.dumps(user_data),
        status = 200,
        mimetype = 'application/json'
    )
    return response

# API userTrend
@app.route("/userTrend")
def userTrend():
    data = [
        {
            'name': 'New User',
            'data': [20, 50, 34, 20, 90,74, 110]
        },
        {
            'name': 'Active User',
            'data': [20, 50, 34, 20, 90,74, 110]
        }
    ]
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# API userDevice
# Done
@app.route("/userDevice")
def userDevice():
    data = [
        {
            'name': 'IOS',
            'y': 56.33,
        }, {
            'name': 'Android',
            'y': 24.03,
        }, {
            'name': 'MAC',
            'y': 10.38,
        }, {
            'name': 'Windows',
            'y': 4.77,
        }, {
            'name': 'Pad',
            'y': 0.91,
        }, {
            'name': 'other',
            'y': 2
        }
    ]
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# API newsCategory
# TODO
@app.route("/newsCategory")
def newsCategory():
    data = [
        {
            'name': 'technology',
            'y': 2
        },
        {
            'name': 'world',
            'y': 10
        },
        {
            'name': 'education',
            'y': 15
        },
        {
            'name': 'sports',
            'y': 17
        },
        {
            'name': 'weather',
            'y': 38
        },
    ]
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# API User Active Time Distribution(24 hours)
# Done
@app.route("/userActiveTimeDistribution")
def userActiveTimeDistribution():
    data = [
            {
                'name': 'Operation Number',
                'data': [20, 50, 34, 20, 90,74, 110,20, 50, 34, 20, 90,74, 110,20, 50, 34, 20, 90,74, 110,67,79,46]
            }
    ]
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

if __name__ == "__main__":
    app.run()