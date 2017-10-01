""" config client """

import config_client as client

PATH = '../config/config_news_pipe_line.yaml'

def test_basic():
    """ test basic """
    config = client.get_config(PATH)
    assert len(config) > 0
    print 'test_basic passed.'
    print config

if __name__ == "__main__":
    test_basic()