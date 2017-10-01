import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

from cloudAMQP_client import CloudAMQPClient

TASK_CLOUDAMQP_URL = 'amqp://hnexjiff:1fFcLCGRumdB-RYHMqTIAFJJPX9W9c8B@crane.rmq.cloudamqp.com/hnexjiff'
TASK_QUEUE_NAME = 'popular-news-scrape-news-task-queue'

DEDUP_CLOUDAMQP_URL = 'amqp://lpequvgj:trpy1m4Zk8DyidIybk0PcYwjkVoEu8xw@fish.rmq.cloudamqp.com/lpequvgj'
DEDUP_QUEUE_NAME = 'news-deduplicate-queue'

def clearQueue(queue_url, queue_name):
    MQ_CLIENT = CloudAMQPClient(queue_url, queue_name)
    num_of_msg = 0

    while True:
        msg = MQ_CLIENT.receive_message()
        if msg is None:
            print "%s messages have beed popped up" % num_of_msg
            return
        num_of_msg = num_of_msg + 1

if __name__ == "__main__":
    print "clear task queue``````````````"
    clearQueue(TASK_CLOUDAMQP_URL, TASK_QUEUE_NAME)
    print "clear dedup queue``````````````"
    clearQueue(DEDUP_CLOUDAMQP_URL, DEDUP_QUEUE_NAME)
