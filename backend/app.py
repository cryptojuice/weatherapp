from flask import Flask, jsonify, redirect, request, current_app
from functools import wraps
import simplejson as json
import requests

app = Flask(__name__)

testData = {"coord":{"lon":-74.007102966309,"lat":40.714599609375},"sys":{"country":"United States of America","sunrise":1377858117,"sunset":1377905447},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"gdps stations","main":{"temp":294.19,"humidity":86,"pressure":980.9,"temp_min":292.59,"temp_max":295.93},"wind":{"speed":1.6,"deg":128.001},"rain":{"3h":0},"clouds":{"all":48},"dt":1377828463,"id":5128581,"name":"New York","cod":200}

def jsonp(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            content = str(callback) + '(' + str(f(*args,**kwargs).data) + ')'
            return current_app.response_class(content, mimetype='application/javascript')
        else:
            return f(*args, **kwargs)
    return decorated_function

@app.route("/<location>")
@jsonp
def hello(location):
    r = requests.get('http://api.openweathermap.org/data/2.5/weather?q=%s' % location)
    return jsonify(r.json())

if __name__ == "__main__":
    app.run(debug = True)
