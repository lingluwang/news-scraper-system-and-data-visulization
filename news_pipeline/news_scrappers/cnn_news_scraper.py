""""cnn news scrapper"""

from lxml import html
from json import loads

import os
import sys
import random
import requests
import json

DEFAULT_CNN_XPATH = '//p[contains(@class,\'zn-body__paragraph\')]//text() | //div[contains(@class,\'zn-body__paragraph\')]//text()'

# read User_agents.txt into a list
UA_FILE_NAME = os.path.join(os.path.dirname(__file__),'user_agents.txt')
USER_AGENTS = []
with open(UA_FILE_NAME) as file:
    lines = file.readlines()
    for line in lines:
        if line is not None:
            USER_AGENTS.append(line.strip()[1:-1])
random.shuffle(USER_AGENTS)

def getHeader():
    """ get Headers"""
    user_agent = random.choice(USER_AGENTS)
    headers = {
        'Connection': 'close',
        'User_Agent': user_agent
    }
    return headers


def extract_news_text(news_url):
    """ extract news text based on given url"""
    session = requests.session()
    response = session.get(news_url, headers=getHeader()) #response is type of String, content is HTML
    #print response.content

    try:
        news_DOM = html.fromstring(response.content)
        news = news_DOM.xpath(DEFAULT_CNN_XPATH)
        news = ''.join(news) #join responsed multiple paragraphs
        print news
    except Exception, e:
        return

    return news

if __name__ == '__main__':
    extract_news_text('http://money.cnn.com/2017/08/24/news/companies/amazon-whole-foods/index.html')