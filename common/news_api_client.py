""" news_api_client """
from json import loads

import requests

# get config
import config_client
config = config_client.get_config('../config/config_common.yaml');
NEWS_API_ENDPOINTS = config['news_api_client']['NEWS_API_ENDPOINT']
NEWS_API_APIKEY = config['news_api_client']['NEWS_API_KEY']
NEWS_API_NAME = config['news_api_client']['ARTICLES_API']
DEFAULT_SORT_BY = config['news_api_client']['SORT_BY_TOP']
DEFAULT_SOURCE_LIST = config['news_api_client']['DEFAULT_SOURCES']

# NEWS_API_ENDPOINTS = 'https://newsapi.org/v1/'
# NEWS_API_NAME = 'articles'
# NEWS_API_APIKEY = '1c5132ec2e9f4646b62d89ac92e32903'

# ABC_NEWS = 'abc-news-au'
# BBC_SPORT = 'bbc-sport'
# CNN = 'cnn'
# FOCUS = 'focus'
# MIRROR = 'mirror'
# THE_TIMES_OF_INDIA = 'the-times-of-india'
# THE_WASHINGTON_POST = 'the-washington-post'
# TIME = 'time'
# USA_TODAY = 'usa-today'

# DEFAULT_SOURCE_LIST = [ABC_NEWS, BBC_SPORT, CNN, FOCUS, MIRROR,
#                        THE_TIMES_OF_INDIA, THE_WASHINGTON_POST, TIME, USA_TODAY]
# DEFAULT_SORT_BY = 'top'


def build_url():
    """ build url helper """
    return NEWS_API_ENDPOINTS + NEWS_API_NAME

def get_news_from_url(source_list=DEFAULT_SOURCE_LIST, sort_by=DEFAULT_SORT_BY):
    """ get news from given URL """
    articles = []

    for source in source_list:
        payload = {'source': source,
                   'sortBy': sort_by,
                   'apiKey': NEWS_API_APIKEY}

        response = requests.get(build_url(), params=payload)
        res_json = loads(response.content) #JSONfied the response which is string

        #Extract source from each of the source and populate the source into articles element
        if res_json is not None and res_json['status'] == 'ok'and res_json['source'] is not None:
            for article in res_json['articles']:
                article['source'] = res_json['source']

            articles.extend(res_json['articles'])

    return articles
