""" cloudAMQP_client"""
import json
import pika


class CloudAMQPClient:
    """CloudAMQP Client Class"""

    def __init__(self, cloud_amqp_url, queue_name):
        """init a connection with channel and queue"""
        self.cloud_amqp_url = cloud_amqp_url
        self.queue_name = queue_name
        self.params = pika.URLParameters(cloud_amqp_url)
        self.params.socket_timeout = 5

        # connect to CloudAMQP
        self.connection = pika.BlockingConnection(self.params)
        # start a channel
        self.channel = self.connection.channel()
        # declare a queue
        self.channel.queue_declare(queue=queue_name)

    def send_message(self, msg):
        """ send a message """
        self.channel.basic_publish(exchange='',
                                   routing_key=self.queue_name,
                                   body=json.dumps(msg))
        print "-------------Msg sent to the queue %s : %s" % (self.queue_name, msg)

    def receive_message(self):
        """receive a msg from queue"""
        method_frame, header_frame, body = self.channel.basic_get(
            self.queue_name)
        if method_frame:
            # print method_frame, header_frame, body
            # print "----------Received mesg from %s : %s" % (self.queue_name, body)
            self.channel.basic_ack(method_frame.delivery_tag)
            return json.loads(body)
        else:
            print 'No Msg Returned'
            return None

    def sleep(self, seconds):
        """sleep"""
        self.connection.sleep(seconds)
