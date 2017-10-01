from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = 'amqp://hnexjiff:1fFcLCGRumdB-RYHMqTIAFJJPX9W9c8B@crane.rmq.cloudamqp.com/hnexjiff'
TEST_QUEUE_NAME = 'popular-news-scrape-news-task-queue'

DEDUP_CLOUDAMQP_URL = 'amqp://lpequvgj:trpy1m4Zk8DyidIybk0PcYwjkVoEu8xw@fish.rmq.cloudamqp.com/lpequvgj'
DEDUP_QUEUE_NAME = 'news-deduplicate-queue'

def test_basic():
    client = CloudAMQPClient(DEDUP_CLOUDAMQP_URL, DEDUP_QUEUE_NAME)
    
    sentMsg = {'test' : 'test'}
    # try:
    #     client.send_message(sentMsg)
    # except Exception as e:
    #     print "send message wrong"
    receivedMSG = client.receive_message()

    print receivedMSG

    assert sentMsg == receivedMSG
    print "test_basic passed"

if __name__ == "__main__":
    test_basic()

