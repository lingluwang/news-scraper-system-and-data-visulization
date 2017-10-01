"""news deduper"""

import datetime
import json
import os
import sys
import pymongo

from dateutil import parser
from sklearn.feature_extraction.text import TfidfVectorizer

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
from cloudAMQP_client import CloudAMQPClient
import mongodb_client 

#get config
import config_client
config = config_client.get_config('../config/config_news_pipe_line.yaml')
DEDUP_CLOUDAMQP_URL = config['news_deduper']['DEDUPE_NEWS_TASK_QUEUE_URL']
DEDUP_QUEUE_NAME = config['news_deduper']['DEDUPE_NEWS_TASK_QUEUE_NAME']
SLEEP_SECONDS = config['news_deduper']['SLEEP_SECONDS']
NEWS_TABLE_NAME = config['news_deduper']['NEWS_TABLE_NAME']
SAME_NEWS_SIMILARITY_THRESHOLD = config['news_deduper']['SAME_NEWS_SIMILARITY_THRESHOLD']

# Deduplicate Queue
# DEDUP_CLOUDAMQP_URL = 'amqp://lpequvgj:trpy1m4Zk8DyidIybk0PcYwjkVoEu8xw@fish.rmq.cloudamqp.com/lpequvgj'
# DEDUP_QUEUE_NAME = 'news-deduplicate-queue'
DEDEUPER_MQ_CLIENT = CloudAMQPClient(DEDUP_CLOUDAMQP_URL, DEDUP_QUEUE_NAME)

# SLEEP_SECONDS = 5

#MongoDB Collection
# NEWS_TABLE_NAME = 'NEWS'
# SAME_NEWS_SIMILARITY_THRESHOLD = 0.9


def msgHandler(msg):
    if msg is None or not isinstance(msg, dict):
        print 'Error ------- Msg is broken!'
        return
    
    #check if it is duplicated in the MongoDB
    msg_task = msg
    print msg_task
    text = msg_task['text']
    print text
    if text is None:
        print '~~~~~~ MSG received in msgHanlder is NONE~~~~~~~~, return!'
        return 
    
    # only check recent two days news -- set check date duration
    published_at = parser.parse(msg_task['publishedAt'])
    print published_at
    published_at_begin = datetime.datetime(published_at.year, published_at.month, published_at.day, 0, 0, 0, 0)
    print published_at_begin
    published_at_end = published_at_begin + datetime.timedelta(days=2)
    print published_at_end

    #connect DB and find all news within the given start - end duration, return a list
    db = mongodb_client.get_db('popular_news')
    print 'DB get sucess~~~~~~~~~~~'
    same_day_news_list = list(db[NEWS_TABLE_NAME].find(
        {'publishedAt': {'$gte':published_at_begin,
                         '$lt': published_at_end}}))
    print same_day_news_list
    
    print "~~~~~~~~~~~~~~ list same day news sucess"

    if same_day_news_list is not None and len(same_day_news_list) > 0:
        documents = [news['text'] for news in same_day_news_list] #add all news in DB into a list
        documents.insert(0, text) # add current news into the 1st item in the list
        print "~~~~~~~~~~~~~~ text -> documents success"

        #calculate the tfidf values
        tfidf = TfidfVectorizer().fit_transform(documents)
        pairwise_sim = tfidf * tfidf.T
        print pairwise_sim.A

        rows, cols = pairwise_sim.shape
        for row in range(1,rows):
            if pairwise_sim[row, 0] > SAME_NEWS_SIMILARITY_THRESHOLD:
                print 'Warning~~~~~~ duplicated news'
                return

    msg_task['publishedAt'] = parser.parse(msg_task['publishedAt'])
    db[NEWS_TABLE_NAME].replace_one({'digest': msg_task['digest']}, msg_task, upsert=True)


while True:
    if DEDEUPER_MQ_CLIENT is not None:
        msg = DEDEUPER_MQ_CLIENT.receive_message()

        if msg is not None:
            try:
                msgHandler(msg)
            except Exception as e:
                print "msgHanlder wrong"#coding=utf-8
                pass
    DEDEUPER_MQ_CLIENT.sleep(SLEEP_SECONDS)