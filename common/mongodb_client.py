""" mongoDB_client """
import pymongo #pylint: disable=unused-import
from pymongo import MongoClient

# get config
import config_client
config = config_client.get_config('../config/config_common.yaml')
MONGO_DB_HOST = config['mongodb_client']['MONGO_DB_HOST']
MONGO_DB_PORT = config['mongodb_client']['MONGO_DB_PORT']
DB_NAME = config['mongodb_client']['DB_NAME']

# MONGO_DB_HOST = 'localhost'
# MONGO_DB_PORT = 27017
# DB_NAME = 'popular_news'

#Get the sampleDB database
CLIENT = MongoClient("%s:%s" % (MONGO_DB_HOST, MONGO_DB_PORT))

def get_db(db=DB_NAME):
    """get db method"""
    return CLIENT[db]