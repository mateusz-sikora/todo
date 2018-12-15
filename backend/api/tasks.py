from flask import request, abort

from flask_restplus import Namespace, Resource, fields, reqparse

from pymongo import MongoClient
from pymongo import ReturnDocument
from bson.objectid import ObjectId
from api.utils import TimeAgo

api = Namespace('tasks')

client = MongoClient('mongodb://db:27017/')
tasks_collection = client.trllodb.task_collection

TaskModel = api.model('Task', {
    'id': fields.String(
        attribute=lambda x: str(x['_id'])
    ),
    'task': fields.String,
    'done': fields.Boolean,
    'create_date': TimeAgo(
        attribute=lambda x: x['_id'].generation_time,
    ),
})


@api.route('/<string:task_id>/')
class TaskDetails(Resource):

    @api.marshal_with(TaskModel)
    def get(self, task_id):
        document = tasks_collection.find_one({u'_id': ObjectId(task_id)})
        if not document:
            abort(404)
        return document

    def delete(self, task_id):
        tasks_collection.find_one_and_delete({u'_id': ObjectId(task_id)})
        return '', 204

    @api.marshal_with(TaskModel)
    def patch(self, task_id):
        parser = reqparse.RequestParser()

        if 'task' in request.json:
            parser.add_argument('task', location='json')
        if 'done' in request.json:
            parser.add_argument('done', location='json', type=bool)
        args = parser.parse_args()

        document = tasks_collection.find_one_and_update(
            {u'_id': ObjectId(task_id)},
            {'$set': args},
            return_document=ReturnDocument.AFTER
        )
        if not document:
            abort(404)
        return document


@api.route('/')
class TaskList(Resource):

    @api.marshal_list_with(TaskModel)
    def get(self):
        cursor = tasks_collection.find()
        return list(cursor)

    @api.marshal_with(TaskModel)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('task', required=True)
        parser.add_argument('done', type=bool, default=False)
        args = parser.parse_args()

        result = tasks_collection.insert_one(args)

        # retrieve inserted task
        document = tasks_collection.find_one({
            u'_id': ObjectId(result.inserted_id)
        })
        return document
