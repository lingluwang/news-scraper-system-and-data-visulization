""" backend Service """
import operations
import pyjsonrpc

#get config
import config_client
config = config_client.get_config('../config/config_backend_server.yaml')
SERVER_HOST = config['service']['SERVER_HOST']
SERVER_PORT = config['service']['SERVER_PORT']

# SERVER_HOST = 'localhost'
# SERVER_PORT = 4040

class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """ Test RequestHandler """
    @pyjsonrpc.rpcmethod
    def add(self, num1, num2): #pylint: disable=no-self-use
        """Test Method"""
        return num1 + num2

    """ Get news summaries for a user """
    @pyjsonrpc.rpcmethod
    def getNewsSummariesForUser(self, user_id, page_num):
        return operations.getNewsSummariesForUser(user_id, page_num)
    
    """ Log user news clicks """
    @pyjsonrpc.rpcmethod
    def logNewsClickForUser(self, user_id, news_id):
        return operations.logNewsClickForUser(user_id, news_id)

# Threading HTTP server
HTTP_SERVER = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHandler
)

print "Starting HTTP server...."
print "URL: http://%s:%s" % (SERVER_HOST, SERVER_PORT)
HTTP_SERVER.serve_forever()
