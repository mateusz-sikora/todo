from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

from api.tasks import api as tasks_api

app = Flask(__name__)
# cors = CORS(app, resources={r"*": {"origins": [
#     "0.0.0.0:3000",
#     "localhost:3000",
# ]}})

cors = CORS(app, resources={r"/tasks/*": {"origins": r"*"}})

api = Api(
    app,
    title='ToDo API',
    version='1.0'
)

api.add_namespace(tasks_api)
