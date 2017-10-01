"""news fetcher"""
import json
import os
import sys

from newspaper import Article

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
from cloudAMQP_client import CloudAMQPClient

# sys.path.append(os.path.join(os.path.dirname(__file__), 'news_scrappers'))
# import cnn_news_scraper as CNN

#get config
import config_client
config = config_client.get_config('../config/config_news_pipe_line.yaml')
TASK_CLOUDAMQP_URL = config['news_fetcher']['SCRAPE_NEWS_TASK_QUEUE_URL']
TASK_QUEUE_NAME = config['news_fetcher']['SCRAPE_NEWS_TASK_QUEUE_NAME']
DEDUP_CLOUDAMQP_URL = config['news_fetcher']['DEDUPE_NEWS_TASK_QUEUE_URL']
DEDUP_QUEUE_NAME = config['news_fetcher']['DEDUPE_NEWS_TASK_QUEUE_NAME']
SLEEP_SECONDS = config['news_fetcher']['SLEEP_SECONDS']

# Message Queue Client 
# 1. News Tasks Queue
# TASK_CLOUDAMQP_URL = 'amqp://hnexjiff:1fFcLCGRumdB-RYHMqTIAFJJPX9W9c8B@crane.rmq.cloudamqp.com/hnexjiff'
# TASK_QUEUE_NAME = 'popular-news-scrape-news-task-queue'
NEWS_TASK_MQ_CLIENT = CloudAMQPClient(TASK_CLOUDAMQP_URL, TASK_QUEUE_NAME)

# 2. Deduplicate Queue
# DEDUP_CLOUDAMQP_URL = 'amqp://lpequvgj:trpy1m4Zk8DyidIybk0PcYwjkVoEu8xw@fish.rmq.cloudamqp.com/lpequvgj'
# DEDUP_QUEUE_NAME = 'news-deduplicate-queue'
DEDEUPER_MQ_CLIENT = CloudAMQPClient(DEDUP_CLOUDAMQP_URL, DEDUP_QUEUE_NAME)

# SLEEP_SECONDS = 5

# news_text = {}
# news_text['text'] = 'Bella is a princess'
# text = json.dumps(news_text)
# if news_text is None or not isinstance(news_text, dict):
#     print "None or not Json"
# print news_text


def newsHanlder(news):
    """news handler: call news scrapper to get news content text"""
    if news is None or not isinstance(news, dict):
        print "Error --- Message is broken!"
        return

    news_task = news
    text = None

    # Replace XPATH based scraper as newspaper package (which is suitable for multiple website)
    # if news['source'] != 'cnn':
    #     print "News Source is not CNN, cannot handle!"
    # else:
    #     print 'scrape cnn news'
    #     text = CNN.extract_news_text(news['url'])

    # scraper news via newspaper API
    article = Article(news['url'])
    article.download()  # == request.get
    article.parse() 

    text = article.text.encode('utf-8')
    news_task['text'] = text

    DEDEUPER_MQ_CLIENT.send_message(news_task)
    print "[x] Sent msg to %s : %s" % (DEDUP_QUEUE_NAME, text)
    print news['url']


while True:
    if NEWS_TASK_MQ_CLIENT is not None:
        news = NEWS_TASK_MQ_CLIENT.receive_message()

        if news is not None:
            try:
                newsHanlder(news)
            except Exception as e:
                print "newsHanlder wrong"#coding=utf-8
                pass
    NEWS_TASK_MQ_CLIENT.sleep(SLEEP_SECONDS)