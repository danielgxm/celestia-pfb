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

@app.route('/')
def index():
    """ Home page
    """
    return render_template('index.html', gas_limit=DEFAULT_GAS_LIMIT, fee=DEFAULT_FEE, node_url=DEFAULT_NODE_URL)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug = False)
