""" test news api client"""
import news_api_client as apiCli 

def test_basic():
    """ test basic """
    news = apiCli.get_news_from_url(['cnn'], 'top')
    #print news
    assert len(news) > 0
   # news = apiCli.get_news_from_url()
    #print news
   # assert len(news) > 0
    for new in news:
        print new
    print "test basic passed"

if __name__ == "__main__":
    test_basic()