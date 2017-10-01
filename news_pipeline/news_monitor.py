"""news monitor"""
from datetime import datetime
import hashlib
import redis
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
# dir_name = os.path.join(os.path.dirname(__file__), '..', 'common')
# print dir_name
import news_api_client
from cloudAMQP_client import CloudAMQPClient

#get config
import config_client
config = config_client.get_config('../config/config_news_pipe_line.yaml')
REDIS_HOST = config['news_monitor']['REDIS_HOST']
REDIS_PORT = config['news_monitor']['REDIS_PORT']
CLOUDAMQP_URL = config['news_monitor']['SCRAPE_NEWS_TASK_QUEUE_URL']
QUEUE_NAME = config['news_monitor']['SCRAPE_NEWS_TASK_QUEUE_NAME']
NEWS_SOURCE = config['news_monitor']['NEWS_SOURCES']
SORT_BY = config['news_monitor']['SORT_BY']
SLEEP_SECONDS = config['news_monitor']['SLEEP_SECONDS']
EXPIRE_TIME = config['news_monitor']['EXPIRE_TIME']


# News API source parameters
# NEWS_SOURCE = ['cnn']
# ABC_NEWS = 'abc-news-au'
# BBC_SPORT = 'bbc-sport'
# CNN = 'cnn'
# FOCUS = 'focus'
# MIRROR = 'mirror'
# THE_TIMES_OF_INDIA = 'the-times-of-india'
# THE_WASHINGTON_POST = 'the-washington-post'
# TIME = 'time'
# USA_TODAY = 'usa-today'

# NEWS_SOURCE = [ABC_NEWS, 
#                BBC_SPORT, 
#                CNN, 
#                FOCUS, 
#                MIRROR,
#                THE_TIMES_OF_INDIA, 
#                THE_WASHINGTON_POST, 
#                TIME, USA_TODAY]
# SORT_BY = 'top'

# SLEEP_SECONDS = 5
# EXPIRE_TIME = 3600 * 24 * 3

NUMBER_OF_NEWS = 0

# Message Queue Client
# CLOUDAMQP_URL = 'amqp://hnexjiff:1fFcLCGRumdB-RYHMqTIAFJJPX9W9c8B@crane.rmq.cloudamqp.com/hnexjiff'
# QUEUE_NAME = 'popular-news-scrape-news-task-queue'
MQ_CLIENT = CloudAMQPClient(CLOUDAMQP_URL, QUEUE_NAME)

#Redis Client
# REDIS_HOST = 'localhost'
# REDIS_PORT = 6379
REDIS_CLIENT = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT,db=0)

while True:
    news_list = news_api_client.get_news_from_url(NEWS_SOURCE, SORT_BY)

    for news in news_list:
        news_digest = hashlib.md5(news['title'].encode('utf-8')).digest().encode('base64')

        if REDIS_CLIENT.get(news_digest) is None:
            print 'we have new news incoming~~~~~~~~~~~'
            news['digest'] = news_digest #1.populate the news['digest'] by news_digest
            NUMBER_OF_NEWS = NUMBER_OF_NEWS + 1 # 2. #news++

            if news['publishedAt'] is None:  #3. populate news['publishAt'] 
                news['publishedAt'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')

            #4. put the news_digest into redis for later duplidated removal
            REDIS_CLIENT.set(news_digest, 'True')
            REDIS_CLIENT.expire(news_digest, EXPIRE_TIME)

            MQ_CLIENT.send_message(news)
        else:
            print 'no new news for now~~~~~~~~~~~~~~'

    print "Till now, Fetched %d news" % NUMBER_OF_NEWS
    MQ_CLIENT.sleep(SLEEP_SECONDS)

