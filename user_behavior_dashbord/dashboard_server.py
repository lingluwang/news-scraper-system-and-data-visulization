from flask import Flask
import json
app = Flask(__name__)

@app.route('/userdata')
def hello_world():
    user_data = [
        {
            'title': 'Total Users',
            'num':1300
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

if __name__ == "__main__":
    app.run()