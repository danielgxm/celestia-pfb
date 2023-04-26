from flask import *
from config import *
import datetime
import requests
import logging
import os

app = Flask(__name__)

logger = logging.basicConfig(
    filename='run.log',
    level=logging.DEBUG
)

@app.route('/node_status', methods=['GET'])
def node_status():
    """ Get status node
    """
    try:
        node = requests.get(DEFAULT_NODE_URL + f'/balance')
        node_data = node.json()

        if not node_data['amount']:
            raise Exception('Not data')

        return jsonify(node_data)

    except Exception as e:
        logging.error(e)
        return jsonify({'error': 500, 'message': str(e)}), 500

@app.route('/')
def index():
    """ Home page
    """
    return render_template('index.html', gas_limit=DEFAULT_GAS_LIMIT, fee=DEFAULT_FEE, node_url=DEFAULT_NODE_URL)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug = False)
